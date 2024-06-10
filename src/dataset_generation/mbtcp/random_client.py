import random
from typing import Any, Callable, List

from dataset_generation.mbtcp.client import MbtcpClient, retrieve_args
from dataset_generation.utils import value_generator
from finetune.model.finetuner_model import RangeModel

MAX_ADDRESS = 65535
MAX_REG_VALUE = 65535


class RandomClient(MbtcpClient):

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
                address = value_generator.generate_random_value(self._addresses)
                coil_functions.extend([
                    (self.read_coils, [address, 1], []),
                    (self.write_coil, [address, True], []),
                    (self.write_coil, [address, False], []),
                ])

            register_functions: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 3 in self._codes and 6 in self._codes:
                address = value_generator.generate_random_value(self._addresses)
                data = value_generator.generate_random_value(self._values)
                register_functions.extend([
                    (self.read_holding_registers, [address, 1], []),
                    (self.write_register, [address, data], []),
                ])

            register_functions_multiple: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 3 in self._codes and 16 in self._codes:
                for elements in range(1, self._max_elements):
                    address = value_generator.generate_random_value(self._addresses, elements)
                    combinations = value_generator.generate_combinations(self._values, elements)
                    for combination in combinations.values():
                        register_functions_multiple.extend([
                            (self.read_holding_registers, [address, elements], []),
                            (self.write_registers, [address, combination], [])
                        ])

            coils_functions_multiple: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 1 in self._codes and 15 in self._codes:
                for elements in range(1, self._max_elements):
                    address = value_generator.generate_random_value(self._addresses, elements)
                    coils_combinations = value_generator.generate_multiple_coil_requests(elements)
                    for coil_values in coils_combinations:
                        coils_functions_multiple.extend([
                            (self.read_coils, [address, elements], []),
                            (self.write_coils, [address, coil_values], [])
                        ])

            functions.extend(coil_functions)
            functions.extend(coils_functions_multiple)
            functions.extend(register_functions)
            functions.extend(register_functions_multiple)
            print(len(functions))

        random.shuffle(functions)
        functions = functions[:(2 * self._samples_num) + 100]
        self._functions = functions


def main():
    client = RandomClient(*retrieve_args(), RangeModel(low=0, high=1), RangeModel(low=0, high=10), 2)
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
