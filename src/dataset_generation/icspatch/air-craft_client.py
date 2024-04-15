import random
import time
import random
import math 

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
class P1Client(MbtcpClient):
    def start_client(self):
        functions = []
        while len(functions) < self._samples_num:
            ss_method_type = random.choice([True, False])
            input_0 = random.randrange(0, 50)
            input_1,input_2, input_3, input_4 =generate_nested_affine_transformations(input_0)
            functions = [(self.write_register, [0, input_1]),
                         (self.write_register, [1, input_2]),
                         (self.write_register, [2, input_3]),
                         (self.write_register, [3, input_4]),
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
            exceptions = [(function, [*args])]
            functions.extend(exceptions)

            functions = functions[:self._samples_num]
            for function, args in functions:
                response = function(*args)
                print(response)
                if function.__name__ == self.write_register.__name__:
                    time.sleep(0.05)


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
