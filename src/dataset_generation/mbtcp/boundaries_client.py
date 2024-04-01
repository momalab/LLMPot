import itertools
import random
from typing import List, Callable, Any

from dataset_generation.mbtcp.client import MbtcpClient, retrieve_args
from finetune.model.finetuner_model import RangeModel

MAX_ADDRESS = 65535
MAX_REG_VALUE = 65535


class BoundariesClient(MbtcpClient):

    def __init__(self, ip: str, port: int, samples_num: int, codes: List[int], addresses: RangeModel, values: RangeModel, max_elements: int):
        super().__init__(ip, port, samples_num, codes)
        self._addresses = addresses
        self._values = values
        self._max_elements = max_elements

    @staticmethod
    def generate_single_request(values: RangeModel):
        single_data_to_write = [values.low, random.randrange(values.low, values.high - 2), values.high - 1]

        return single_data_to_write

    @staticmethod
    def generate_multiple_coil_requests(elements):
        return itertools.product(range(2), repeat=elements + 1)

    @staticmethod
    def generate_combinations(values: RangeModel, elements):
        nums = [values.low, random.randrange(values.low + 1, values.high - 2), values.high - 1]

        combinations = itertools.product(nums, repeat=elements + 1)
        return {i: list(t) for i, t in enumerate(combinations)}

    def start_client(self):
        functions = []
        while len(functions) < (2 * self._samples_num) + 100:

            coil_functions: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 1 in self._codes and 5 in self._codes:
                for address in range(self._addresses.low, self._addresses.high):
                    coil_functions.extend([
                        (self.read_coils, [address, 1], []),
                        (self.write_coil, [address, True], []),
                        (self.read_coils, [address, 1], []),
                        (self.write_coil, [address, False], [])
                    ])

            coil_functions_exceptions: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 1 in self._codes and 5 in self._codes:
                exception_range = [self._addresses.high, random.randrange(self._addresses.high + 1, MAX_ADDRESS - 2), MAX_ADDRESS - 1]
                for address in exception_range:
                    coil_functions_exceptions.extend([
                        (self.read_coils, [address, 1], []),
                        (self.write_coil, [address, True], []),
                        (self.write_coil, [address, False], [])
                    ])

            register_functions: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 3 in self._codes and 6 in self._codes:
                for address in range(self._addresses.low, self._addresses.high):
                    single_data_to_write = self.generate_single_request(self._values)
                    for data in single_data_to_write:
                        register_functions.extend([
                            (self.read_holding_registers, [address, 1], []),
                            (self.write_register, [address, data], []),
                        ])

            register_functions_exceptions: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 3 in self._codes and 6 in self._codes:
                exception_range = [self._addresses.high, random.randrange(self._addresses.low + 1, MAX_ADDRESS - 2), MAX_ADDRESS - 1]
                for address in exception_range:
                    random_value = random.randrange(0, MAX_REG_VALUE)
                    register_functions_exceptions.extend([
                        (self.read_holding_registers, [address, 1], []),
                        (self.write_register, [address, random_value], []),
                    ])

            register_functions_multiple: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 3 in self._codes and 16 in self._codes:
                for elements in range(1, self._max_elements):
                    for address in range(self._addresses.low, self._addresses.high):
                        combinations = self.generate_combinations(self._values, elements)
                        for combination in combinations.values():
                            register_functions_multiple.extend([
                                (self.read_holding_registers, [address, elements], []),
                                (self.write_registers, [address, combination], [])
                            ])

            register_functions_multiple_exceptions: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 3 in self._codes and 16 in self._codes:
                for elements in range(1, self._max_elements):
                    exception_range = [self._addresses.high, random.randrange(self._addresses.low + 1, MAX_ADDRESS - elements - 1), MAX_ADDRESS - elements]
                    combinations = self.generate_combinations(self._values, self._max_elements)
                    for combination in combinations.values():
                        for address in exception_range:
                            register_functions_multiple_exceptions.extend([
                                (self.read_holding_registers, [address, elements], []),
                                (self.write_registers, [address, combination], [])
                            ])

            coils_functions_multiple: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 1 in self._codes and 15 in self._codes:
                for elements in range(self._max_elements):
                    for address in range(self._addresses.low, self._addresses.high - elements):
                        coils_combinations = self.generate_multiple_coil_requests(elements)
                        for coil_values in coils_combinations:
                            coils_functions_multiple.extend([
                                (self.read_coils, [address, 1], []),
                                (self.write_coils, [address, coil_values], [])
                            ])
                        coils_functions_multiple.append((self.read_coils, [address, 1], []))

            coils_functions_multiple_exceptions: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 1 in self._codes and 15 in self._codes:
                for elements in range(1, self._max_elements):
                    exception_range = [self._addresses.high, random.randrange(self._addresses.low + 1, MAX_ADDRESS - elements - 1), MAX_ADDRESS - elements]
                    coils_combinations = self.generate_multiple_coil_requests(self._max_elements)
                    for coil_values in coils_combinations:
                        for address in exception_range:
                            coils_functions_multiple_exceptions.extend([
                                (self.read_coils, [address, elements], []),
                                (self.write_coil, [address, coil_values], [])
                            ])

            functions.extend(coil_functions)
            functions.extend(coils_functions_multiple)
            functions.extend(register_functions)
            functions.extend(register_functions_multiple)
            functions.extend(coil_functions_exceptions)
            functions.extend(coils_functions_multiple_exceptions)
            functions.extend(register_functions_exceptions)
            functions.extend(register_functions_multiple_exceptions)

        random.shuffle(functions)
        functions = functions[:(2 * self._samples_num) + 100]
        self._functions = functions


def main():
    ip, port, samples_num = retrieve_args()

    client = BoundariesClient(ip, port, samples_num, RangeModel(low=0, high=1), RangeModel(low=0, high=10), 3)
    client.start_client()
    client.execute_functions()
    try:
        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()


if __name__ == '__main__':
    main()
