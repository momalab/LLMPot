import random
import time
import random
from typing import List, Callable, Any

from client import MbtcpClient, retrieve_args

def generate_nested_affine_transformations(x1):
    """
    Generate nested affine transformations where each output depends on the previous ones.

    Args:
    - x1 (int): Input variable.

    Returns:
    - x2, x3, x4, x5 (int): Output variables.
    """
    # Generate random coefficients and biases for each transformation
    coef1, bias1 = random.uniform(-2, 2), random.uniform(-2, 2)
    coef2, bias2 = random.uniform(-2, 2), random.uniform(-2, 2)
    coef3, bias3 = random.uniform(-2, 2), random.uniform(-2, 2)
    coef4, bias4 =random.uniform(-2, 2), random.uniform(-2, 2)

    # Apply nested affine transformations
    x2 = coef1 * x1 + bias1
    x3 = coef2 * x2 + coef1 * x1 + bias2
    x4 = coef3 * x3 + coef2 * x2 + coef1 * x1 + bias3
    x5 = coef4 * x4 + coef3 * x3 + coef2 * x2 + coef1 * x1 + bias4
    return abs(int(x2)), abs(int(x3)), abs(int(x4)), abs(int(x5))


def generate_exception_ranges(invalid_address: int, max_address: int):
    return [invalid_address, random.randrange(invalid_address + 1, max_address - 1), max_address]

class ProcessClient(MbtcpClient):
    def start_client(self):
        functions = []
        while len(functions) < self._samples_num:
            MAX_ADDRESS = 65535
            MAX_REG_VALUE = 65535
            input_1, input_2, input_3, input_4 = generate_nested_affine_transformations(random.randrange(0, MAX_REG_VALUE))
            inputs = [input_1, input_2, input_3, input_4]
            functions.extend([
                (self.write_registers, [0, inputs]),
                (self.read_input_registers, [0, 4])])

            hr_ir_addresses = 4
            coil_di_addresses = 0
            register_functions_exceptions: List[tuple[Callable[..., Any], List[Any]]] = []
            exception_range = generate_exception_ranges(hr_ir_addresses, MAX_ADDRESS)
            for address in exception_range:
                register_functions_exceptions.extend([
                    (self.write_registers, [address, random.randrange(0, MAX_REG_VALUE)]),
                    (self.read_input_registers, [address, 1])])

            exception_range = generate_exception_ranges(coil_di_addresses, MAX_ADDRESS)
            for address in exception_range:
                register_functions_exceptions.extend([
                    (self.write_coil, [address, random.choice([True, False])]),
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
    client = ProcessClient(ip, port, samples_num)
    try:
        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()


if __name__ == '__main__':
    main()
