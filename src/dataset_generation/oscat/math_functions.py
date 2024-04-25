import time
from client import MbtcpClient, retrieve_args
from pymodbus.constants import Endian
from pymodbus.payload import BinaryPayloadBuilder
from dataset_generation.math import func


class MathClient(MbtcpClient):
    def start_client(self):
        functions = []
        builder = BinaryPayloadBuilder(byteorder=Endian.BIG, wordorder=Endian.LITTLE)
        if self._function_name == "sigmoid":
            x, y = func.func_values(-100, 30, self._samples_num)
        if self._function_name == "sgn":
            x, y = func.func_values(-10, 10, self._samples_num)
        if self._function_name == "expo10":
            x, y = func.func_values(-4.816, 4.816, self._samples_num)
        if self._function_name == "cosh":
            x, y = func.func_values(-10, 10, self._samples_num) # NOTE NEEDS UPDATING ON CODESYS "OSCAT.COSH()"

        input_x, input_y = func.func_values_sampled(x, self._samples_num)

        for input in input_x:
            if self._function_name == "sgn":
                builder.add_32bit_int(input)
            else:
                builder.add_32bit_float(float(input))

            inputs = builder.build()
            functions.extend([
                (self.write_registers, [0, inputs], {"skip_encode": True}),
                (self.read_input_registers, [0, 2], {})])

        functions = functions[:self._samples_num]
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
