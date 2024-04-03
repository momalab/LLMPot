import random
import time
from client import MbtcpClient, retrieve_args
from pymodbus.constants import Endian
from pymodbus.payload import BinaryPayloadBuilder

class P3Client(MbtcpClient):
    def start_client(self):
        for _ in range(int(self._samples_num / 5)):
            builder = BinaryPayloadBuilder(byteorder=Endian.BIG, wordorder=Endian.LITTLE)
            input_1 = random.randint(0, 50)
            builder.add_32bit_float(float(input_1))
            inputs = builder.build()
            functions = [
                (self.read_holding_registers, [0, 2], {}),  # read_IN (array of 2 elements)
                (self.write_registers, [0, inputs], {"skip_encode": True}),  # write_IN
                (self.read_input_registers, [0, 2], {})  # read_returned_x
            ]

            builder = BinaryPayloadBuilder(byteorder=Endian.BIG, wordorder=Endian.LITTLE)

            coil_value = random.choice([True, False])
            coil_values = random.choices([True, False],k=4)
            input_value = random.randint(0, 50)
            builder.add_32bit_float(float(input_value))
            inputs_value = builder.build()

            coil_addresses = random.randint(0, 50)
            hr_addresses = random.randint(2, 50)
            ir_addresses = random.randint(2, 50)
            di_addresses = random.randint(0, 50)
            exception_function = [
                (self.read_holding_registers, [hr_addresses], {}),
                 (self.write_registers, [hr_addresses, inputs_value], {"skip_encode": True}),
                (self.read_input_registers, [ir_addresses], {}),
                (self.read_coils, [coil_addresses], {}),
                (self.read_discrete_inputs, [di_addresses], {}),
                (self.write_coils, [coil_addresses, coil_values], {}),
                (self.write_register, [hr_addresses, input_value], {}),
                (self.write_coil, [coil_addresses, coil_value], {})]

            function, args, kwargs = random.choice(exception_function)
            if kwargs is None:
                kwargs = {}
            exceptions = [(self.illegal_function, [], {}),
                          (function, args, kwargs)]
            functions.extend(exceptions)
            random.shuffle(functions)

            for function, args, kwargs in functions:
                print(function, args, kwargs)
                response = function(*args, **kwargs)
                time.sleep(0.05)
                print(response)
                if function.__name__ == self.write_register.__name__:
                    time.sleep(0.05)

def main():
    ip, port, samples_num = retrieve_args()
    client = P3Client(ip, port, samples_num)
    try:
        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()

if __name__ == '__main__':
    main()
