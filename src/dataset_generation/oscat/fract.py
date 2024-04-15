import random
import numpy as np
import time
from client import MbtcpClient, retrieve_args
from pymodbus.constants import Endian
from pymodbus.payload import BinaryPayloadBuilder

class Fract_Client(MbtcpClient):
    def start_client(self):
        functions = []
        while len(functions) < self._samples_num:
            builder = BinaryPayloadBuilder(byteorder=Endian.BIG, wordorder=Endian.LITTLE)
            input_value = np.random.uniform(0, 65535)
            builder.add_32bit_float(float(input_value))
            inputs_value = builder.build()
            functions.extend([
                (self.write_registers, [0, inputs_value], {"skip_encode": True}),
                (self.read_input_registers, [0, 2], {})])

        functions = functions[:self._samples_num]
        for function, args, kwargs in functions:
            response = function(*args, **kwargs)
            print(response)
            if function.__name__ == self.write_register.__name__:
                time.sleep(0.05)

def main():
    ip, port, samples_num = retrieve_args()
    client = Fract_Client(ip, port, samples_num)
    try:
        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()

if __name__ == '__main__':
    main()
