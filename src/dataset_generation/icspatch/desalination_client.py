import random
import time

from client import MbtcpClient, retrieve_args


class P5Client(MbtcpClient):
    def start_client(self):
        for _ in range(int(self._samples_num/13)):
            ss_method_type = random.choice([True, False])
            setpoint_wd = random.randrange(0, 50)
            initial_setpoint = random.randrange(0, 50)
            wd_input = random.randrange(0, 50)
            tb0_input = random.randrange(0, 50)
            functions = [(self.read_holding_registers, [0]), #read_setpoint_wd
                         (self.read_holding_registers, [1]), #read_initial_setpoint
                         (self.read_holding_registers, [2]), #read_wd_input
                         (self.read_holding_registers, [3]), #read_tb0_input
                         (self.write_register, [0, setpoint_wd]),
                         (self.write_register, [1, initial_setpoint]),
                         (self.write_register, [2, wd_input]),
                         (self.write_register, [3, tb0_input]),
                         (self.read_input_registers, [0, 4]), #read_returned_x
                         (self.read_coils, [0]), #read_ss_method_type
                         (self.write_coil, [0, ss_method_type])]

            ss_method_type = random.choice([True, False])
            inputs_value = random.randrange(0, 50)
            coil_addresses = random.randint(1, 50)
            hr_addresses = random.randint(4, 50)
            ir_addresses = random.randint(4, 50)
            exception_function = [(self.read_holding_registers, [hr_addresses]),
                                  (self.write_register, [hr_addresses, inputs_value]),
                                  (self.read_input_registers, [ir_addresses]),
                                  (self.read_coils, [coil_addresses]),
                                  (self.write_coil, [coil_addresses, ss_method_type])]

            function, args = random.choice(exception_function)
            exceptions = [(self.illegal_function, []), (function, [*args])]
            functions.extend(exceptions)
            random.shuffle(functions)

            for function, args in functions:
                response = function(*args)
                print(response)
                if function.__name__ == self.write_register.__name__:
                    time.sleep(0.05)


def main():
    ip, port, samples_num = retrieve_args()
    client = P5Client(ip, port, samples_num)
    try:
        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()


if __name__ == '__main__':
    main()
