import random
import time
from typing import List, Callable, Any

from client import MbtcpClient, retrieve_args

def generate_exception_ranges(invalid_address: int, max_address: int):
    return [invalid_address, random.randrange(invalid_address + 1, max_address - 1), max_address]

class P4Client(MbtcpClient):
    def start_client(self):
        functions = []
        while len(functions) < self._samples_num:
            MAX_ADDRESS = 65535
            MAX_REG_VALUE = 65535
            input_1 = random.randrange(0, MAX_REG_VALUE)
            functions.extend([
                         (self.write_register, [0, input_1]),
                         (self.read_input_registers, [0, 4])])

            hr_addresses = 1
            ir_addresses = 4
            coil_di_addresses = 0
            register_functions_exceptions: List[tuple[Callable[..., Any], List[Any]]] = []
            exception_range = generate_exception_ranges(hr_addresses, MAX_ADDRESS)
            for address in exception_range:
                register_functions_exceptions.extend([
                    (self.write_register, [address, random.randrange(0, MAX_REG_VALUE)]),
                    (self.read_holding_registers, [address, 1])])

            exception_range = generate_exception_ranges(ir_addresses, MAX_ADDRESS)
            for address in exception_range:
                register_functions_exceptions.extend([
                    (self.read_input_registers, [address, 1])])

            exception_range = generate_exception_ranges(coil_di_addresses, MAX_ADDRESS)
            for address in exception_range:
                register_functions_exceptions.extend([
                    (self.write_coil, [address, random.choice([True, False])]),
                    (self.read_coils, [address, 1]),
                    (self.read_discrete_inputs, [address, 1])])

        functions.extend(register_functions_exceptions)
        functions = functions[:self._samples_num]
        for function, args in functions:
            response = function(*args)
            print(response)
            if function.__name__ == self.write_register.__name__:
                time.sleep(0.05)


def main():
    ip, port, samples_num = retrieve_args()
    client = P4Client(ip, port, samples_num)
    try:
        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()


if __name__ == '__main__':
    main()
