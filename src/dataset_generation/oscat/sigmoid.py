import random
import time
from client import MbtcpClient, retrieve_args
from pymodbus.constants import Endian
from pymodbus.payload import BinaryPayloadBuilder

class Sigmoid_Client(MbtcpClient):
    def start_client(self):
        functions = []
        while len(functions) < self._samples_num:
            builder = BinaryPayloadBuilder(byteorder=Endian.BIG, wordorder=Endian.LITTLE)
            input_1 = random.randint(0, 65535)
            builder.add_32bit_float(float(input_1))
            inputs = builder.build()
            functions = [
                (self.read_holding_registers, [0, 2], {}),
                (self.write_registers, [0, inputs], {"skip_encode": True}),
                (self.read_input_registers, [0, 2], {})]

            functions = functions[:self._samples_num]
            for function, args, kwargs in functions:
                response = function(*args, **kwargs)
                print(response)
                if function.__name__ == self.write_register.__name__:
                    time.sleep(0.05)

def main():
    ip, port, samples_num = retrieve_args()
    client = Sigmoid_Client(ip, port, samples_num)
    try:
        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()

if __name__ == '__main__':
    main()
