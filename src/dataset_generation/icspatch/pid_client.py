import random
import time
import pdb
from client import MbtcpClient, retrieve_args
from pymodbus.constants import Endian
from pymodbus.payload import BinaryPayloadBuilder

class P3Client(MbtcpClient):
    def start_client(self):
        for _ in range(int(self._samples_num / 5)):
            input = random.randint(0, 50)
            functions = [
                (self.read_holding_registers, [0, 1]),  # read_IN (array of 1 elements)
                (self.write_register, [0, input]),  # write_IN
                (self.read_input_registers, [0, 2])  # read_returned_x
            ]

            coil_value = random.choice([True, False])
            coil_values = random.choices([True, False], k=4)
            inputs_value = random.choices(list(range(0, 10)), k=4)
            input_value = random.randint(0, 50)

            coil_addresses = random.randint(0, 50)
            hr_addresses = random.randint(1, 50)
            ir_addresses = random.randint(2, 50)
            di_addresses = random.randint(0, 50)
            exception_function = [
                (self.read_holding_registers, [hr_addresses]),
                (self.write_registers, [hr_addresses, inputs_value]),
                (self.read_input_registers, [ir_addresses]),
                (self.read_coils, [coil_addresses]),
                (self.read_discrete_inputs, [di_addresses]),
                (self.write_coils, [coil_addresses, coil_values]),
                (self.write_register, [hr_addresses, input_value]),
                (self.write_coil, [coil_addresses, coil_value])
            ]

            # Choose a random exception function and add it to functions list
            function, args = random.choice(exception_function)
            exceptions = [
                (self.illegal_function, []),
                (function, args)
            ]
            functions.extend(exceptions)
            random.shuffle(functions)

            # Execute functions with their arguments
            for function, args in functions:
                print(function, args)
                response = function(*args)
                time.sleep(0.05)
                print(function)
                print(response)
                if function.__name__ == self.write_register.__name__:
                    time.sleep(0.05)

def main():
    ip, port, samples_num = retrieve_args()
    client = P3Client(ip, port, samples_num)
    try:
        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()

if __name__ == '__main__':
    main()
