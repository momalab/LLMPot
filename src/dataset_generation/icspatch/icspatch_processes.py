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
            in_1 = np.arange(-2048, 2048, 1)
            in_2 = in_1 + 3
            in_3 = in_1 - 2
            in_4 = in_1 + 1
            all_inputs = [in_1, in_2, in_3, in_4]
        elif self._process_name == "smartgrid":
            in_1 = np.arange(-2048, 2048, 1)
            all_inputs = [in_1]
        elif (self._process_name == "anaerobic"):
            in_1 = np.linspace(-30, 30, 4096)
            all_inputs = [in_1]
        elif self._process_name == "chemical":
            in_1 = np.arange(-2048, 2048, 1)
            in_2 = in_1 + 3
            all_inputs = [in_1, in_2]

        functions = []
        for index in range(len(all_inputs[0])):
            builder = BinaryPayloadBuilder(byteorder=Endian.BIG, wordorder=Endian.LITTLE)
            if (self._process_name == "aircraft") or (self._process_name == "desalination"):
                input_1 = all_inputs[0][index]
                input_2 = all_inputs[1][index]
                input_3 = all_inputs[2][index]
                input_4 = all_inputs[3][index]
                builder.add_32bit_int(input_1)
                builder.add_32bit_int(input_2)
                builder.add_32bit_int(input_3)
                builder.add_32bit_int(input_4)
                inputs = builder.build()

            elif (self._process_name == "anaerobic"):
                input_1 = all_inputs[0][index]
                builder.add_32bit_float(input_1)
                inputs = builder.build()

            elif(self._process_name == "smartgrid"):
                input_1 = all_inputs[0][index]
                builder.add_32bit_int(input_1)
                inputs = builder.build()

            elif self._process_name == "chemical":
                input_1 = all_inputs[0][index]
                input_2 = all_inputs[1][index]
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
