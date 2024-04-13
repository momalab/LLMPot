import random
from typing import List, Callable, Any

from dataset_generation.mbtcp.client import MbtcpClient, retrieve_args
from dataset_generation.utils import value_generator
from finetune.model.finetuner_model import RangeModel


class BoundariesClient(MbtcpClient):

    def __init__(self, ip: str, port: int, samples_num: int, codes: List[int], addresses: RangeModel, values: RangeModel, max_elements: int):
        super().__init__(ip, port, samples_num, codes)
        self._addresses = addresses
        self._values = values
        self._max_elements = max_elements

    def start_client(self):
        functions = []
        while len(functions) < self._samples_num:

            device_functions: List[tuple[Callable[..., Any], List[Any], {}]] = []
            for _ in range(10):
                object_id = random.randint(0, 3)
                device_functions.append((self.read_device_information, [], {"object_id": object_id}))

            coil_functions: List[tuple[Callable[..., Any], List[Any], {}]] = []
            if 1 in self._codes and 5 in self._codes:
                address_range = value_generator.generate_triplet_value(self._addresses)
                for address in address_range:
                    coil_functions.extend([
                        (self.write_coil, [address, True], {}),
                        (self.read_coils, [address, 1], {}),
                        (self.write_coil, [address, False], {}),
                        (self.read_coils, [address, 1], {}),
                    ])

            coil_functions_exceptions: List[tuple[Callable[..., Any], List[Any], {}]] = []
            if 1 in self._codes and 5 in self._codes:
                exception_range = value_generator.generate_exception_ranges(self._addresses, MbtcpClient.MAX_ADDRESS)
                for address in exception_range:
                    coil_functions_exceptions.extend([
                        (self.read_coils, [address, 1], {}),
                        (self.write_coil, [address, True], {}),
                        (self.write_coil, [address, False], {})
                    ])

            register_functions: List[tuple[Callable[..., Any], List[Any], {}]] = []
            if 3 in self._codes and 6 in self._codes:
                address_range = value_generator.generate_triplet_value(self._addresses)
                for address in address_range:
                    register_functions.extend([
                        (self.write_register, [address, value_generator.generate_random_value(self._values)], {}),
                        (self.read_holding_registers, [address, 1], {}),
                    ])

            register_functions_exceptions: List[tuple[Callable[..., Any], List[Any], {}]] = []
            if 3 in self._codes and 6 in self._codes:
                exception_range = value_generator.generate_exception_ranges(self._addresses, MbtcpClient.MAX_ADDRESS)
                for address in exception_range:
                    register_functions_exceptions.extend([
                        (self.write_register, [address, random.randrange(0, MbtcpClient.MAX_REG_VALUE)], {}),
                        (self.read_holding_registers, [address, 1], {}),
                    ])

            register_functions_multiple: List[tuple[Callable[..., Any], List[Any], {}]] = []
            if 3 in self._codes and 16 in self._codes:
                for elements in range(1, self._max_elements):
                    address_range = value_generator.generate_triplet_value(self._addresses, elements)
                    for address in address_range:
                        combinations = value_generator.generate_combinations(self._values, elements)
                        for combination in combinations.values():
                            register_functions_multiple.extend([
                                (self.write_registers, [address, combination], {}),
                                (self.read_holding_registers, [address, elements], {})
                            ])

            register_functions_multiple_exceptions: List[tuple[Callable[..., Any], List[Any], {}]] = []
            if 3 in self._codes and 16 in self._codes:
                for elements in range(1, self._max_elements):
                    exception_range = value_generator.generate_exception_ranges(self._addresses, MbtcpClient.MAX_ADDRESS, elements)
                    combinations = value_generator.generate_combinations(self._values, elements)
                    for combination in combinations.values():
                        for address in exception_range:
                            register_functions_multiple_exceptions.extend([
                                (self.write_registers, [address, combination], {}),
                                (self.read_holding_registers, [address, elements], {})
                            ])

            coils_functions_multiple: List[tuple[Callable[..., Any], List[Any], {}]] = []
            if 1 in self._codes and 15 in self._codes:
                for elements in range(1, self._max_elements):
                    address_range = value_generator.generate_triplet_value(self._addresses, elements)
                    for address in address_range:
                        coils_combinations = value_generator.generate_multiple_requests(elements, [True, False])
                        for coil_values in coils_combinations:
                            coils_functions_multiple.extend([
                                (self.write_coils, [address, coil_values], {}),
                                (self.read_coils, [address, elements], {})
                            ])

            coils_functions_multiple_exceptions: List[tuple[Callable[..., Any], List[Any], {}]] = []
            if 1 in self._codes and 15 in self._codes:
                for elements in range(1, self._max_elements):
                    exception_range = value_generator.generate_exception_ranges(self._addresses, MbtcpClient.MAX_ADDRESS, elements)
                    coils_combinations = value_generator.generate_multiple_requests(self._max_elements, [True, False])
                    for coil_values in coils_combinations:
                        for address in exception_range:
                            coils_functions_multiple_exceptions.extend([
                                (self.write_coil, [address, coil_values], {}),
                                (self.read_coils, [address, elements], {})
                            ])

            functions.extend(device_functions)
            functions.extend(coil_functions)
            functions.extend(coils_functions_multiple)
            functions.extend(register_functions)
            functions.extend(register_functions_multiple)
            functions.extend(coil_functions_exceptions)
            functions.extend(coils_functions_multiple_exceptions)
            functions.extend(register_functions_exceptions)
            functions.extend(register_functions_multiple_exceptions)
            print(len(functions))

        random.shuffle(functions)
        functions = functions[:self._samples_num]
        self._functions = functions


def main():
    ip, port, samples_num = retrieve_args()

    client = BoundariesClient(ip, port, samples_num, [1, 5, 15, 3, 6, 16], RangeModel(low=0, high=10), RangeModel(low=0, high=10), 2)
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
