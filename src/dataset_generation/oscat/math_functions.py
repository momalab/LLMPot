import time

import numpy
from oscat.client import MbtcpClient, retrieve_args
from pymodbus.constants import Endian
from pymodbus.payload import BinaryPayloadBuilder
from dataset_generation.math import func


class MathClient(MbtcpClient):
    def start_client(self):
        functions = []
        if self._function_name == "sgn":
            x = numpy.linspace(-3, 3, self._samples_num)
            x_sampled_input = x
            print(x_sampled_input)
            print(len(x_sampled_input))
        else:
            x, y = func.func_values(-3, 3, self._samples_num) #sigmoid (-30,30)
            x_sampled, y_sampled = func.func_values_sampled(x, self._samples_num)
            x_sampled_input, y_sampled_input = func.remove_decimals(x_sampled, y_sampled)

        for input_x in x_sampled_input:
            builder = BinaryPayloadBuilder(byteorder=Endian.BIG, wordorder=Endian.LITTLE)
            builder.add_32bit_float(float(input_x))
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
    ip, port, samples_num, function_name = retrieve_args()
    client = MathClient(ip, port, samples_num, function_name)
    try:
        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()

if __name__ == '__main__':
    main()
