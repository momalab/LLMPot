import random

from dataset_generation.mbtcp.client import MbtcpClient, retrieve_args


class P1Client(MbtcpClient):
    def start_client(self):
        for _ in range(int(self._samples_num/6)):
            temp = random.randrange(0, 50)
            cool = random.choice([True, False])
            functions = [(self.read_holding_registers, [0]),
                         (self.write_register, [0, temp]),
                         (self.read_discrete_inputs, [0]),
                         (self.write_coil, [0, cool])]

            temp = random.randrange(0, 50)
            cool = random.choice([True, False])
            coil_addresses = random.randint(0, 50)
            di_addresses = random.randint(1, 50)
            hr_addresses = random.randint(2, 50)
            exception_function = [(self.read_holding_registers, [hr_addresses]),
                                  (self.write_register, [hr_addresses, temp]),
                                  (self.read_discrete_inputs, [di_addresses]),
                                  (self.write_coil, [coil_addresses, cool])]

            function, args = random.choice(exception_function)
            exceptions = [(self.illegal_function, []), (function, [*args])]
            functions.extend(exceptions)
            random.shuffle(functions)

            self.execute_functions(functions)


def main():
    ip, port, samples_num = retrieve_args()
    client = P1Client(ip, port, samples_num)
    try:
        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()


if __name__ == '__main__':
    main()
