import time
import random

from dataset_generation.s7comm.client import S7Client, retrieve_args


class P3Client(S7Client):
    def start_client(self):
        for _ in range(self.samples_num):

            functions = [(self.read_area, [self.Areas.DB, 0, 0, 2]),
                         (self.read_area, [self.Areas.DB, 1, 0, 2]),
                         (self.read_area, [self.Areas.DB, 2, 0, 2]),
                         (self.read_area, [self.Areas.DB, 3, 0, 2])]

            db_addresses = random.randint(1, 50)
            db_bytes = random.randint(0, 10)
            exception_function = [(self.read_area, [self.Areas.DB, random.randint(4, 50), 0, 2]), #item not available
                                  (self.read_area, [self.Areas.DB, random.randint(0, 3), db_addresses, 2]), #address out of range
                                  (self.read_area, [self.Areas.DB, random.randint(0, 3), 0, db_bytes])] #address out of range

            function, args = random.choice(exception_function)
            exceptions = [(function, [*args])]
            functions.extend(exceptions)
            random.shuffle(functions)

            for function, args in functions:
                function(*args)
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
