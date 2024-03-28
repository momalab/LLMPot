import argparse
import itertools
import random
from typing import List, Callable, Any

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

    @staticmethod
    def generate_combinations(max_value, elements):
        nums = [0, random.randrange(1, max_value - 2), max_value - 1]

        combinations = itertools.product(nums, repeat=elements + 1)
        return {i: list(t) for i, t in enumerate(combinations)}

    def start_client(self):
        for _ in range(self._samples_num):

            coil_functions: List[tuple[Callable[..., Any], List[Any]]] = []
            for address in range(self._num_addresses):
                # address_range = [self._num_addresses, random.randrange(self._num_addresses + 1, MAX_ADDRESS - 1), MAX_ADDRESS]
                coil_functions.extend([
                    (self.read_coils, [address, 1]),  # address_range[address]
                    (self.write_coil, [address, True]),
                    (self.read_coils, [address, 1]),
                    (self.write_coil, [address, False]),
                    (self.read_coils, [address, 1])
                ])

            coil_functions_exceptions: List[tuple[Callable[..., Any], List[Any]]] = []
            for point in range(3):
                exception_range = [self._num_addresses, random.randrange(self._num_addresses + 1, MAX_ADDRESS - 1), MAX_ADDRESS]
                coil_functions_exceptions.extend([
                    (self.read_coils, [exception_range[point], 1]),
                    (self.write_coil, [exception_range[point], True]),
                    (self.write_coil, [exception_range[point], False])
                ])

            register_functions: List[tuple[Callable[..., Any], List[Any]]] = []
            for address in range(self._num_addresses):
                single_data_to_write = self.generate_single_request(self._max_value)
                for data in single_data_to_write:
                    # address_range = [self._num_addresses, random.randrange(self._num_addresses + 1, MAX_ADDRESS - 1), MAX_ADDRESS]
                    register_functions.extend([
                        (self.read_holding_registers, [address, 1]),  # address_range[address]
                        (self.write_register, [address, data]),
                    ])
                register_functions.append((self.read_holding_registers, [address, 1]))

            register_functions_exceptions: List[tuple[Callable[..., Any], List[Any]]] = []
            for point in range(3):
                exception_range = [self._num_addresses, random.randrange(self._num_addresses + 1, MAX_ADDRESS - 1), MAX_ADDRESS]
                random_value = random.randrange(0, MAX_REG_VALUE)
                register_functions_exceptions.extend([
                    (self.read_holding_registers, [exception_range[point], 1]),
                    (self.write_register, [exception_range[point], random_value]),
                ])

            register_functions_multiple: List[tuple[Callable[..., Any], List[Any]]] = []
            for elements in range(self._max_elements):
                for address in range(self._num_addresses):
                    combinations = self.generate_combinations(self._max_value, elements)
                    for combination in combinations.values():
                        register_functions_multiple.extend([
                            (self.read_holding_registers, [address, elements + 1]),
                            (self.write_registers, [address, combination])
                        ])
                    register_functions_multiple.append((self.read_holding_registers, [address, elements + 1]))

            register_functions_multiple_exceptions: List[tuple[Callable[..., Any], List[Any]]] = []
            for elements in range(self._max_elements):
                for address in range(self._num_addresses):
                    exception_range = [self._num_addresses, random.randrange(self._num_addresses + 1, MAX_ADDRESS - 1), MAX_ADDRESS]
                    combinations = self.generate_combinations(self._max_value, self._max_elements)
                    for combination in combinations.values():
                        register_functions_multiple_exceptions.extend([
                            (self.read_holding_registers, [exception_range[address], elements + 1]),
                            (self.write_registers, [exception_range[address], combination])
                        ])
                    register_functions_multiple_exceptions.append((self.read_holding_registers, [address, elements + 1]))

            coils_functions_multiple: List[tuple[Callable[..., Any], List[Any]]] = []
            for elements in range(self._max_elements):
                for address in range(self._num_addresses):
                    coils_combinations = self.generate_multiple_coil_requests(elements)
                    for coil_values in coils_combinations:
                        coils_functions_multiple.extend([
                            (self.read_coils, [address, 1]),
                            (self.write_coils, [address, coil_values])
                        ])
                    coils_functions_multiple.append((self.read_coils, [address, 1]))

            coils_functions_multiple_exceptions: List[tuple[Callable[..., Any], List[Any]]] = []
            for point in range(3):
                exception_range = [self._num_addresses, random.randrange(self._num_addresses + 1, MAX_ADDRESS - 1), MAX_ADDRESS]
                coils_combinations = self.generate_multiple_coil_requests(self._max_elements)
                for coil_values in coils_combinations:
                    coils_functions_multiple_exceptions.extend([
                        (self.read_coils, [exception_range[point], 1]),
                        (self.write_coil, [exception_range[point], coil_values])
                    ])

            functions = coil_functions + coils_functions_multiple + \
                        register_functions + register_functions_multiple + \
                        coil_functions_exceptions + coils_functions_multiple_exceptions + \
                        register_functions_exceptions + register_functions_multiple_exceptions

            print(f"Executing {len(functions)} functions.")
            if self.dry_run:
                return self.execute_functions(functions)
            else:
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
