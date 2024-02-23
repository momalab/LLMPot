import time
import random
from snap7.util import set_word
from snap7.types import Areas

from dataset_generation.s7comm.client import S7Client, retrieve_args


class P1Client(S7Client):
    def start_client(self):
        for _ in range(self._samples_num):
            temp = random.randrange(0, 50)
            temp_value = set_word(bytearray(2), 0, temp)
            cool = random.choice([bytearray([0b00000001]) , bytearray([0b00000000])])
            functions = [(self.read_area, [Areas.DB, 0, 0, 2]),
                         (self.write_area, [Areas.DB, 0, 0, temp_value]),
                         (self.read_area, [Areas.MK, 0, 0, 2]),
                         (self.write_area, [Areas.MK, 0, 0, cool])]

            temp = random.randrange(0, 50)
            temp_value = set_word(bytearray(2), 0, temp)
            cool = random.choice([bytearray([0b00000001]) , bytearray([0b00000000])])

            data_block = random.randint(1, 50)
            db_addresses = random.randint(1, 50)
            db_bytes = random.randint(0, 10)

            merkers_block = random.randint(1, 50)
            mk_addresses = random.randint(1, 50)
            mk_bytes = random.randint(0, 10)
            exception_function = [(self.read_area, [Areas.DB, data_block, 0, 2]),
                                  (self.read_area, [Areas.DB, random.randint(0, 3), 0, db_bytes]),
                                  (self.read_area, [Areas.DB, random.randint(0, 3), db_addresses, 2]),
                                  (self.write_area, [Areas.DB, data_block, 0, temp_value]),
                                  (self.write_area, [Areas.DB, random.randint(0, 3), db_addresses, temp_value]),

                                  (self.read_area, [Areas.MK, merkers_block, 0, 2]),
                                  (self.read_area, [Areas.MK, random.randint(0, 3), 0, mk_bytes]),
                                  (self.read_area, [Areas.MK, random.randint(0, 3), mk_addresses, 2]),
                                  (self.write_area, [Areas.MK, merkers_block, 0, cool]),
                                  (self.write_area, [Areas.MK, random.randint(0, 3), mk_addresses, cool])]

            function, args = random.choice(exception_function)
            exceptions = [(function, [*args])]
            functions.extend(exceptions)
            random.shuffle(functions)

            for function, args in functions:
                # self.func_wrapper(function(*args))
                self.func_wrapper(function, *args)
                if function.__name__ == self.write_area.__name__:
                    time.sleep(0.3)


def main():
    ip, port, samples_num = retrieve_args()
    client = P1Client(ip, port, samples_num)
    try:
        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.disconnect()


if __name__ == '__main__':
    main()
