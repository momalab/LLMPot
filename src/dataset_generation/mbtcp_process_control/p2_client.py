import time
import random

from dataset_generation.mbtcp_process_control.client import MbtcpClient, retrieve_args


class P2Client(MbtcpClient):
    def start_client(self):
        for i in range(int(self._samples_num/7)):
            water_level = random.randrange(0, 100)
            valve_action = random.choice([True, False])
            functions = [(self.read_holding_registers, [0]),
                         (self.read_discrete_inputs, [0]),
                         (self.read_discrete_inputs, [1]),
                         (self.write_register, [0, water_level]),
                         (self.write_coil, [0, valve_action])]

            water_level = random.randrange(0, 100)
            valve_action = random.choice([True, False])

            coil_addresses = random.randint(0, 50)
            di_addresses = random.randint(2, 50)
            hr_addresses = random.randint(2, 50)
            exception_function = [(self.read_holding_registers, [hr_addresses]),
                                  (self.write_register, [hr_addresses, water_level]),
                                  (self.read_discrete_inputs, [di_addresses]),
                                  (self.write_coil, [coil_addresses, valve_action])]

            function, args = random.choice(exception_function)
            exceptions = [(self.illegal_function, []), (function, [*args])]
            functions.extend(exceptions)

            random.shuffle(functions)

            for function, args in functions:
                function(*args)
                if function.__name__ == self.write_register.__name__:
                    time.sleep(0.3)


def main():
    ip, port, samples_num = retrieve_args()
    client = P2Client(ip, port, samples_num)
    try:
        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()


if __name__ == '__main__':
    main()
