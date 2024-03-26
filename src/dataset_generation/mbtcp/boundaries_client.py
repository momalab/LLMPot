import argparse
import itertools
import random

from tqdm import tqdm

from dataset_generation.mbtcp.client import MbtcpClient, retrieve_args

MAX_ADDRESS = 65535
MAX_REG_VALUE = 65535


class BoundariesClient(MbtcpClient):

    def __init__(self, ip: str, port: int, samples_num: int, num_addresses: int, max_value: int, max_elements: int):
        super().__init__(ip, port, samples_num)
        self._num_addresses = num_addresses
        self._max_value = max_value
        self._max_elements = max_elements

    @staticmethod
    def generate_single_request(max_value):
        random_midpoint = random.randrange(1, max_value - 2)
        single_data_to_write = [0, random_midpoint, max_value - 1]

        return single_data_to_write

    @staticmethod
    def generate_multiple_coil_requests(elements):
        return itertools.product(range(2), repeat=elements + 1)

    def generate_combinations(self, max_value, elements):
        nums = [0, random.randrange(1, max_value - 2), max_value - 1]

        combinations = itertools.product(nums, repeat=elements + 1)
        return {i: list(t) for i, t in enumerate(combinations)}

    def start_client(self):
        for _ in range(int(self._samples_num / ((12 * self._num_addresses) + 9))):

            functions = []
            for address in tqdm(range(self._num_addresses)):
                functions.extend([
                    (self.read_coils, [address, 1]),
                    (self.write_coil, [address, True]),
                    (self.read_coils, [address, 1]),
                    (self.write_coil, [address, False]),
                    (self.read_coils, [address, 1])
                ])

            for address in tqdm(range(3)):
                exception_range = [self._num_addresses, random.randrange(self._num_addresses + 1, MAX_ADDRESS - 1), MAX_ADDRESS]
                functions.extend([
                    (self.read_coils, [exception_range[address], 1]),
                    (self.write_coil, [exception_range[address], True]),
                    (self.write_coil, [exception_range[address], False])
                ])

            for address in tqdm(range(self._num_addresses)):
                single_data_to_write = self.generate_single_request(self._max_value)
                for data in single_data_to_write:
                    functions.extend([
                        (self.read_holding_registers, [address, 1]),
                        (self.write_register, [address, data]),
                    ])
                functions.append((self.read_holding_registers, [address, 1]))

            for address in tqdm(range(3)):
                exception_range = [self._num_addresses, random.randrange(self._num_addresses + 1, MAX_ADDRESS - 1), MAX_ADDRESS]
                random_value = random.randrange(0, MAX_REG_VALUE)
                functions.extend([
                    (self.read_holding_registers, [exception_range[address], 1]),
                    (self.write_register, [exception_range[address], random_value]),
                ])

            for elements in range(self._max_elements):
                for starting_address in tqdm(range(self._num_addresses)):
                    combinations = self.generate_combinations(self._max_value, elements)

                    for combination in combinations.values():
                        functions.extend([
                            (self.read_holding_registers, [starting_address, elements + 1]),
                            (self.write_registers, [starting_address, combination])
                        ])

                    functions.append((self.read_holding_registers, [starting_address, elements + 1]))

            for elements in range(self._max_elements):
                for starting_address in range(self._num_addresses):
                    coils_combinations = self.generate_multiple_coil_requests(elements)
                    for coil_values in coils_combinations:
                        functions.extend([
                            (self.read_coils, [starting_address, 1]),
                            (self.write_coils, [starting_address, coil_values])
                        ])
                    functions.append((self.read_coils, [starting_address, 1]))

            self.execute_functions(functions)


def main():
    ip, port, samples_num = retrieve_args()
    parser = argparse.ArgumentParser()
    parser.add_argument('-addr', default=2, required=False)
    parser.add_argument('-max', default=10, required=False)
    parser.add_argument('-elem', default=2, required=False)
    args = parser.parse_args()

    client = BoundariesClient(ip, port, samples_num, args.addr, args.max, args.elem)
    try:
        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()


if __name__ == '__main__':
    main()
