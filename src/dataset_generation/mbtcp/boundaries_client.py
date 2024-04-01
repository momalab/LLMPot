import random
from typing import List, Callable, Any

from dataset_generation.mbtcp.client import MbtcpClient, retrieve_args
from finetune.model.finetuner_model import RangeModel


class BoundariesClient(MbtcpClient):

    def __init__(self, ip: str, port: int, samples_num: int, codes: List[int], addresses: RangeModel, values: RangeModel, max_elements: int):
        super().__init__(ip, port, samples_num, codes)
        self._addresses = addresses
        self._values = values
        self._max_elements = max_elements

    def start_client(self):
        functions = []
        while len(functions) < (2 * self._samples_num) + 100:

            coil_functions: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 1 in self._codes and 5 in self._codes:
                address_range = self.generate_triplet_value(self._addresses)
                for address in address_range:
                    coil_functions.extend([
                        (self.read_coils, [address, 1], []),
                        (self.write_coil, [address, True], []),
                        (self.read_coils, [address, 1], []),
                        (self.write_coil, [address, False], []),
                    ])
                    coil_functions.append((self.read_coils, [address, 1], []))

            coil_functions_exceptions: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 1 in self._codes and 5 in self._codes:
                exception_range = self.generate_exception_ranges(self._addresses)
                for address in exception_range:
                    coil_functions_exceptions.extend([
                        (self.read_coils, [address, 1], []),
                        (self.write_coil, [address, True], []),
                        (self.write_coil, [address, False], [])
                    ])

            register_functions: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 3 in self._codes and 6 in self._codes:
                address_range = self.generate_triplet_value(self._addresses)
                for address in address_range:
                    single_data_to_write = self.generate_triplet_value(self._values)
                    for data in single_data_to_write:
                        register_functions.extend([
                            (self.read_holding_registers, [address, 1], []),
                            (self.write_register, [address, data], []),
                        ])
                    register_functions.append((self.read_holding_registers, [address, 1], []))

            register_functions_exceptions: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 3 in self._codes and 6 in self._codes:
                exception_range = self.generate_exception_ranges(self._addresses)
                for address in exception_range:
                    random_value = random.randrange(0, MbtcpClient.MAX_REG_VALUE)
                    register_functions_exceptions.extend([
                        (self.read_holding_registers, [address, 1], []),
                        (self.write_register, [address, random_value], []),
                    ])

            register_functions_multiple: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 3 in self._codes and 16 in self._codes:
                for elements in range(1, self._max_elements):
                    address_range = self.generate_triplet_value(self._addresses, elements)
                    for address in address_range:
                        combinations = self.generate_combinations(self._values, elements)
                        for combination in combinations.values():
                            register_functions_multiple.extend([
                                (self.read_holding_registers, [address, elements], []),
                                (self.write_registers, [address, combination], [])
                            ])
                        register_functions_multiple.append((self.read_holding_registers, [address, elements + 1], []))

            register_functions_multiple_exceptions: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 3 in self._codes and 16 in self._codes:
                for elements in range(1, self._max_elements):
                    exception_range = self.generate_exception_ranges(self._addresses, elements)
                    combinations = self.generate_combinations(self._values, elements)
                    for combination in combinations.values():
                        for address in exception_range:
                            register_functions_multiple_exceptions.extend([
                                (self.read_holding_registers, [address, elements], []),
                                (self.write_registers, [address, combination], [])
                            ])
                        register_functions_multiple_exceptions.append((self.read_holding_registers, [exception_range[-1], elements + 1], []))

            coils_functions_multiple: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 1 in self._codes and 15 in self._codes:
                for elements in range(1, self._max_elements):
                    address_range = self.generate_triplet_value(self._addresses, elements)
                    for address in address_range:
                        coils_combinations = self.generate_multiple_coil_requests(elements)
                        for coil_values in coils_combinations:
                            coils_functions_multiple.extend([
                                (self.read_coils, [address, elements], []),
                                (self.write_coils, [address, coil_values], [])
                            ])
                        coils_functions_multiple.append((self.read_coils, [address, 1], []))

            coils_functions_multiple_exceptions: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 1 in self._codes and 15 in self._codes:
                for elements in range(1, self._max_elements):
                    exception_range = self.generate_exception_ranges(self._addresses, elements)
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
            print(len(functions))

        # random.shuffle(functions)
        functions = functions[:(2 * self._samples_num) + 100]
        self._functions = functions


def main():
    ip, port, samples_num = retrieve_args()

    client = BoundariesClient(ip, port, samples_num, [1, 5, 15, 3, 6, 16], RangeModel(low=0, high=1), RangeModel(low=0, high=10), 2)
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
