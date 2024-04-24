import itertools
import random
import time
import numpy as np
from pymodbus.constants import Endian
from typing import List, Callable, Any
from pymodbus.payload import BinaryPayloadBuilder

from client import MbtcpClient, retrieve_args

in_1 = np.arange(-15249, 15251, 4100) #(-49, 51, 14) // test: (-50, 52, 14)
in_2 = in_1 + 3
in_3 = in_1 - 2
in_4 = in_1 + 1
in_1.tolist()
in_2.tolist()
in_3.tolist()
in_4.tolist()
all_inputs = [in_1, in_2, in_3, in_4]
all_combinations = list(itertools.product(*all_inputs))
all_comb = {i: list(t) for i, t in enumerate(all_combinations)}
total_combinations = len(all_combinations)

def generate_exception_ranges(invalid_address: int, max_address: int):
    return [invalid_address, random.randrange(invalid_address + 1, max_address - 1), max_address]

class ProcessClient(MbtcpClient):
    MAX_ADDRESS = 65535
    MAX_REG_VALUE = 65535
    def start_client(self):
        functions = []
        while len(functions) < self._samples_num:
            for index, combination in all_comb.items():
                builder = BinaryPayloadBuilder(byteorder=Endian.BIG, wordorder=Endian.LITTLE)
                input_1 = combination[0]
                input_2 = combination[1]
                input_3 = combination[2]
                input_4 = combination[3]
                builder.add_32bit_int(input_1)
                builder.add_32bit_int(input_2)
                builder.add_32bit_int(input_3)
                builder.add_32bit_int(input_4)
                inputs = builder.build()
                functions.extend([
                    (self.write_registers, [0, inputs], {"skip_encode": True}),
                    (self.read_input_registers, [0, 4], {})])

                register_functions_exceptions: List[tuple[Callable[..., Any], List[Any]]] = []
                exception_range = generate_exception_ranges(8, self.MAX_ADDRESS) # hr_addresses = 8
                for address in exception_range:
                    register_functions_exceptions.extend([
                        (self.write_registers, [address, random.randrange(0, self.MAX_REG_VALUE)], {})])

                exception_range = generate_exception_ranges(4, self.MAX_ADDRESS) # ir_addresses = 4
                for address in exception_range:
                    register_functions_exceptions.extend([
                        (self.read_input_registers, [address, 1], {})])

                exception_range = generate_exception_ranges(0, self.MAX_ADDRESS) # coil_di_addresses= 0
                for address in exception_range:
                    register_functions_exceptions.extend([
                        (self.write_coil, [address, random.choice([True, False])], {}),
                        (self.read_discrete_inputs, [address, 1]), {}])

        functions.extend(register_functions_exceptions)
        functions = functions[:self._samples_num]
        for function, args, kwargs in functions:
            response = function(*args, **kwargs)
            print(response)
            if function.__name__ == self.write_registers.__name__:
                time.sleep(0.05)


def main():
    ip, port, samples_num = retrieve_args()
    samples_num = total_combinations
    print(samples_num)
    client = ProcessClient(ip, port, samples_num)
    try:
        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()


if __name__ == '__main__':
    main()
