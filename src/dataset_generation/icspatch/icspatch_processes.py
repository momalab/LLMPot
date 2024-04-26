import random
import time
import itertools
import numpy as np
from pymodbus.constants import Endian
from pymodbus.payload import BinaryPayloadBuilder

from client import MbtcpClient, retrieve_args

def generate_exception_ranges(invalid_address: int, max_address: int):
    return [invalid_address, random.randrange(invalid_address + 1, max_address - 1), max_address]

class ProcessClient(MbtcpClient):
    MAX_ADDRESS = 65535
    MAX_REG_VALUE = 65535
    def start_client(self):
        if (self._process_name == "aircraft") or (self._process_name == "desalination"):
            in_1 = np.arange(-49, 51, 14) #test: (-50, 52, 14)
            in_2 = in_1 + 3
            in_3 = in_1 - 2
            in_4 = in_1 + 1
            in_1.tolist()
            in_2.tolist()
            in_3.tolist()
            in_4.tolist()
            all_inputs = [in_1, in_2, in_3, in_4]
        if (self._process_name == "anaerobic") or (self._process_name == "smartgrid"):
            in_1 = np.arange(-4096, 4096, 2) #test: (-4095, 4095, 2)
            in_1.tolist()
            all_inputs = [in_1]
        if self._process_name == "chemical":
            in_1 = np.arange(-49, 15, 1) #test: (-50, 16, 1)
            in_2 = in_1 + 3
            in_1.tolist()
            in_2.tolist()
            all_inputs = [in_1, in_2]

        all_combinations = list(itertools.product(*all_inputs))
        all_comb = {i: list(t) for i, t in enumerate(all_combinations)}
        functions = []
        for index, combination in all_comb.items():
            builder = BinaryPayloadBuilder(byteorder=Endian.BIG, wordorder=Endian.LITTLE)
            if (self._process_name == "aircraft") or (self._process_name == "desalination"):
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

            if (self._process_name == "anaerobic") or (self._process_name == "smartgrid"):
                input_1 = combination[0]
                builder.add_32bit_int(input_1)
                inputs = builder.build()
                functions.extend([
                    (self.write_registers, [0, inputs], {"skip_encode": True}),
                    (self.read_input_registers, [0, 2], {})])

            if self._process_name == "chemical":
                input_1 = combination[0]
                input_2 = combination[1]
                builder.add_32bit_int(input_1)
                builder.add_32bit_int(input_2)
                inputs = builder.build()
                functions.extend([
                    (self.write_registers, [0, inputs], {"skip_encode": True}),
                    (self.read_input_registers, [0, 4], {})])

        for function, args, kwargs in functions:
            response = function(*args, **kwargs)
            print(response)
            if function.__name__ == self.write_registers.__name__:
                time.sleep(0.05)


def main():
    ip, port, process_name = retrieve_args()
    client = ProcessClient(ip, port, process_name)
    try:
        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()


if __name__ == '__main__':
    main()
