import random
import argparse
import itertools
from tqdm import tqdm
from pymodbus.client import ModbusTcpClient

class MbtcpClient:
    def __init__(self, server_address: str, server_port: int, deterministic: bool = False):
        self.client = ModbusTcpClient(server_address, port=server_port)
        self._deterministic = deterministic
        self.client.connect()

    def generate_single_request(self, max_value):
        if self._deterministic is True:
            return list(range(0, max_value - 1))

        random_midpoint = random.randrange(1, max_value - 2)
        single_data_to_write = [0, random_midpoint, max_value - 1]

        return single_data_to_write

    @staticmethod
    def generate_multiple_coil_requests(elements):
        return itertools.product(range(2), repeat=elements + 1)

    def generate_combinations(self, max_value, elements):
        if self._deterministic is True:
            nums = list(range(0, max_value))
        else:
            nums = [0, random.randrange(1, max_value - 2), max_value - 1]

        combinations = itertools.product(nums, repeat=elements + 1)
        return {i: list(t) for i, t in enumerate(combinations)}

    def start_client(self, num_addresses: int, max_value: int, max_elements: int, function_code: str):
        try:
            for function in function_code:

                if (function == '1') or (function == '5'):
                    for starting_address in tqdm(range(num_addresses)):
                        self.client.read_coils(starting_address, num_elements=1, unit=0x01)
                        self.client.write_coil(starting_address, True, unit=0x01)

                        self.client.read_coils(starting_address, num_elements=1, unit=0x01)
                        self.client.write_coil(starting_address, False, unit=0x01)

                        self.client.read_coils(starting_address, num_elements=1, unit=0x01)

                if (function == '3') or (function == '6'):
                    for starting_address in range(num_addresses):
                        single_data_to_write = self.generate_single_request(max_value)
                        for data in single_data_to_write:
                            self.client.read_holding_registers(starting_address, 1, unit=0x01)
                            self.client.write_register(starting_address, data, unit=0x01)
                        self.client.read_holding_registers(starting_address, 1, unit=0x01)

                if function == '16':
                    for elements in range(max_elements):
                        for starting_address in tqdm(range(num_addresses)):
                            combinations = self.generate_combinations(max_value, elements)

                            for combination in combinations.values():
                                self.client.read_holding_registers(starting_address, elements + 1, unit=0x01)
                                self.client.write_registers(starting_address, combination, unit=0x01)

                            self.client.read_holding_registers(starting_address, elements + 1, unit=0x01)

                if function == '15':
                    for elements in range(max_elements):
                        for starting_address in range(num_addresses):
                            coils_combinations = self.generate_multiple_coil_requests(elements)
                            for coil_values in coils_combinations:
                                self.client.read_coils(starting_address, num_elements=1, unit=0x01)
                                self.client.write_coils(starting_address, coil_values, unit=0x01)
                            self.client.read_coils(starting_address, num_elements=1, unit=0x01)

        except KeyboardInterrupt:
            print("Client stopped by user.")
        finally:
            self.client.close()


def main():
    def list_of_strings(arg):
        return arg.split(',')
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="localhost", required=False)
    parser.add_argument('-p', default=502, required=False)
    parser.add_argument('-addr', default=10, required=False)
    parser.add_argument('-max', default=10, required=False)
    parser.add_argument('-elem', default=3, required=False)
    parser.add_argument('-deterministic', default=False, required=False)
    parser.add_argument('-fun', type=list_of_strings, required=True)
    args = parser.parse_args()

    ip = args.ip
    port = int(args.p)
    num_addresses = int(args.addr)
    max_value = int(args.max)
    max_elements = int(args.elem)
    function_code = args.fun

    mbtcp_client = MbtcpClient(ip, port, args.deterministic)
    mbtcp_client.start_client(num_addresses, max_value, max_elements, function_code)


if __name__ == '__main__':
    main()
