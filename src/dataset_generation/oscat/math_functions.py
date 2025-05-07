import time

from pymodbus.constants import Endian
from pymodbus.payload import BinaryPayloadBuilder

from dataset_generation.math.func import Function
from dataset_generation.oscat.client import MbtcpClient, retrieve_args


class MathClient(MbtcpClient):
    def start_client(self):
        functions = []
        x = []

        func = Function(self._function_name)

        if self.sampling:
            x, y, _, _, _, _ = func.func_values_sampled(x, self._samples_num)
        else:
            x, y = func.func_values(self.range_low, self.range_high, self._samples_num)
        x, y = func.remove_decimals(x, y)

        for input_x in x:
            builder = BinaryPayloadBuilder(byteorder=Endian.BIG, wordorder=Endian.LITTLE)
            builder.add_32bit_float(input_x)
            inputs = builder.build()
            functions.extend([
                (self.write_registers, [0, inputs], {"skip_encode": True}),
                (self.read_input_registers, [0, 2], {})])

        for function, args, kwargs in functions:
            response = function(*args, **kwargs)
            print(response)
            if function.__name__ == self.write_register.__name__:
                time.sleep(0.05)

def main():
    ip, port, samples_num, function_name, sampling, range_low, range_high = retrieve_args()
    client = MathClient(ip, port, samples_num, function_name, sampling, range_low, range_high)
    try:
        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()

if __name__ == '__main__':
    main()
