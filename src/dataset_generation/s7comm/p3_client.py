import time
import random
from tqdm import tqdm
from snap7.types import Areas

from dataset_generation.s7comm.client import S7Client, retrieve_args


class P3Client(S7Client):
    def start_client(self):
        for _ in tqdm(range(self._samples_num)):

            functions = [(self.read_area, [Areas.DB, 0, 0, 2]),
                         (self.read_area, [Areas.DB, 1, 0, 2]),
                         (self.read_area, [Areas.DB, 2, 0, 2]),
                         (self.read_area, [Areas.DB, 3, 0, 2])]

            data_block = random.randint(4, 50)
            db_addresses = random.randint(1, 50)
            db_bytes = random.randint(0, 10)
            exception_function = [(self.read_area, [Areas.DB, data_block, 0, 2]),
                                  (self.read_area, [Areas.DB, random.randint(0, 3), 0, db_bytes]),
                                  (self.read_area, [Areas.DB, random.randint(0, 3), db_addresses, 2])]

            function, args = random.choice(exception_function)
            exceptions = [(function, [*args])]
            functions.extend(exceptions)
            random.shuffle(functions)

            for function, args in functions:
                self.func_wrapper(function, *args)
                time.sleep(0.05)


def main():
    ip, port, samples_num = retrieve_args()
    client = P3Client(ip, port, samples_num)
    try:
        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.disconnect()


if __name__ == '__main__':
    main()
