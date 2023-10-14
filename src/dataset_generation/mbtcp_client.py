import argparse
import random

from pymodbus.client import ModbusTcpClient


class MbtcpClient:

    def __init__(self, server_address: str, server_port: int):
        self._client = ModbusTcpClient(server_address, port=server_port)

    @staticmethod
    def generate_random_request():
        address = random.randint(0, 99)
        num_elements = random.randint(1, 10)
        data_to_write = [random.randint(0, 65535) for _ in range(num_elements)]
        single_data_to_write = [random.randint(0, 65535)]
        return address, num_elements, data_to_write, single_data_to_write

    def read_data(self, data_type, address, a, num_elements=1):
        if a == 1:
            result = self._client.read_coils(address, num_elements, unit=0x01)
            if result.isError():
                print(f"Failed to read {data_type}. Error: {result}")
            else:
                print(f"{data_type} at address {address}: {result}")
        if a == 3:
            result = self._client.read_holding_registers(address, num_elements, unit=0x01)
            if result.isError():
                print(f"Failed to read {data_type}. Error: {result}")
            else:
                print(f"{data_type} at address {address}: {result.registers}")

    def write_single_data(self, data_type, address, single_data_to_write, a):
        if a == 5:
            result = self._client.write_coil(address, single_data_to_write, unit=0x01)
        if a == 6:
            result = self._client.write_register(address, single_data_to_write, unit=0x01)
        if result.isError():
            print(f"Failed to write {data_type}. Error: {result}")
        else:
            print(f"{data_type} to address {address}: {single_data_to_write}")

    def write_multiple_data(self, data_type, address, data_to_write, a):
        if a == 15:
            result = self._client.write_coils(address, data_to_write, unit=0x01)
        if a == 16:
            result = self._client.write_registers(address, data_to_write, unit=0x01)
        if result.isError():
            print(f"Failed to write {data_type}. Error: {result}")
        else:
            print(f"{data_type} to address {address}: {data_to_write}")

    def start_client(self, samples_num: int, has_context: bool, function_code: int = None):
        self._client.connect()

        try:
            for _ in range(samples_num):

                if not has_context:
                    address, num_elements, data_to_write, single_data_to_write = self.generate_random_request()
                    if function_code is None:
                        function_code = random.choice([1, 3, 5, 15, 16])

                    if function_code == 1:  # Read Coils (FC 01)
                        self.read_data("Coils", address, 1, num_elements)

                    elif function_code == 3:  # Read Holding Registers (FC 03)
                        self.read_data("Holding Registers", address, 3, num_elements)

                    elif function_code == 5:  # Write Single Coil (FC 5)
                        self.write_single_data("Write Single Coil", address, single_data_to_write, 5)

                    elif function_code == 6:  # Write Single Register (FC 6)
                        self.write_single_data("Write Single Register", address, single_data_to_write, 6)

                    elif function_code == 15:  # Write Multiple Coils (FC 15)
                        self.write_multiple_data("Write Multiple Coils", address, data_to_write, 15)

                    elif function_code == 16:  # Write Multiple Registers (FC 16)
                        self.write_multiple_data("Write Multiple Registers", address, data_to_write, 16)

                else:
                    address = random.randint(0, 64)
                    num_elements = random.randint(1, 10)
                    data_to_write = [random.randint(0, 65535) for _ in range(num_elements)]

                    self.read_data("Read holding Registers", address, 3, num_elements)
                    self.write_multiple_data("Write Multiple Registers", address, data_to_write, 16)
                    self.read_data("Read holding Registers", address, 3, num_elements)

        except KeyboardInterrupt:
            print("Client stopped by user.")
        finally:
            self._client.close()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', required=True)
    parser.add_argument('-p', required=True)
    parser.add_argument('-num', required=True)
    parser.add_argument('-c', default=True, required=False)
    parser.add_argument('-fun', default=None, required=False)
    args = parser.parse_args()

    server_address = args.ip
    server_port = int(args.p)
    samples_num = int(args.num) * 1000
    has_context = eval(args.c)
    function_code = int(args.fun)

    mbtcp_client = MbtcpClient(server_address, server_port)
    mbtcp_client.start_client(samples_num, has_context, function_code)


if __name__ == '__main__':
    main()
