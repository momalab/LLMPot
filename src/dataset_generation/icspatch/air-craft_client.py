import itertools
import random
import time
import numpy as np
from typing import List, Callable, Any

from client import MbtcpClient, retrieve_args

input_1 = np.arange(-49, 51, 14)
inputs = [input_1, input_1 + 3, input_1 - 2, input_1 + 1]
all_combinations = itertools.product(*inputs)
total_combinations = len(list(all_combinations))
print(total_combinations)

def generate_exception_ranges(invalid_address: int, max_address: int):
    return [invalid_address, random.randrange(invalid_address + 1, max_address - 1), max_address]

class ProcessClient(MbtcpClient):
    MAX_ADDRESS = 65535
    MAX_REG_VALUE = 65535
    def start_client(self):
        functions = []
        print(len(functions))
        print(self._samples_num)
        while len(functions) < self._samples_num:
            for combination in all_combinations:
                print(combination)
                functions.extend([
                    (self.write_registers, [0, combination]),
                    (self.read_input_registers, [0, 4])])

                register_functions_exceptions: List[tuple[Callable[..., Any], List[Any]]] = []
                exception_range = generate_exception_ranges(4, self.MAX_ADDRESS) # hr_ir_addresses = 4
                for address in exception_range:
                    register_functions_exceptions.extend([
                        (self.write_registers, [address, random.randrange(0, self.MAX_REG_VALUE)]),
                        (self.read_input_registers, [address, 1])])

                exception_range = generate_exception_ranges(0, self.MAX_ADDRESS) # coil_di_addresses= 0
                for address in exception_range:
                    register_functions_exceptions.extend([
                        (self.write_coil, [address, random.choice([True, False])]),
                        (self.read_discrete_inputs, [address, 1])])

        functions.extend(register_functions_exceptions)
        functions = functions[:self._samples_num]
        for function, args in functions:
            response = function(*args)
            print(response)
            if function.__name__ == self.write_registers.__name__:
                time.sleep(0.05)


def main():
    ip, port, samples_num = retrieve_args()
    samples_num = total_combinations
    client = ProcessClient(ip, port, samples_num)
    try:
        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()


if __name__ == '__main__':
    main()
