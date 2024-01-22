import argparse
import itertools
import random

from pymodbus.client import ModbusTcpClient
from tqdm import tqdm

from mbtcp_requests import Mbtcp_Requests


class MbtcpClient:
    def __init__(self, server_address: str, server_port: int):
        self.client = ModbusTcpClient(server_address, port=server_port)
        self.client.connect()

    @staticmethod
    def generate_single_request(number_of_values):
        random_midpoint = random.randrange(1, number_of_values - 2)
        single_data_to_write = [0, random_midpoint, number_of_values - 1]

        return single_data_to_write

    @staticmethod
    def generate_multiple_register_requests(elements, number_of_values):
        boundaries = []
        for i in range(elements + 1):
            random_midpoint = random.randrange(1, number_of_values - 2)
            boundaries.append([0, random_midpoint, number_of_values - 1])

        return boundaries

    @staticmethod
    def generate_multiple_coil_requests(elements):
        return itertools.product(range(2), repeat=elements + 1)

    @staticmethod
    def generate_combinations(single_data_value, elements):
        nums = [0, random.randrange(1, single_data_value - 2), 9]
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
    parser.add_argument('-num', default=100, required=False)
    parser.add_argument('-dat', default=10, required=False)
    parser.add_argument('-elem', default=3, required=False)
    parser.add_argument('-fun', type=list_of_strings, required=True)
    args = parser.parse_args()

    server_address = args.ip
    server_port = int(args.p)
    num_addresses = int(args.num)
    max_value = int(args.dat)
    max_elements = int(args.elem)
    function_code = args.fun
    
    mbtcp_client = MbtcpClient(server_address, server_port)
    mbtcp_client.start_client(num_addresses, max_value, max_elements, function_code)


if __name__ == '__main__':
    main()
