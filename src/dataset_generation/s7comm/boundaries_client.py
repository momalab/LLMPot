import random
from typing import List, Callable, Any
from snap7.util import set_word
from snap7.types import Areas
from dataset_generation.s7comm.client import S7Client, retrieve_args
from finetune.model.finetuner_model import RangeModel


class BoundariesClient(S7Client):

    def __init__(self, ip: str, port: int, samples_num: int, codes: List[int], addresses: RangeModel, values: RangeModel, max_elements: int):
        super().__init__(samples_num, codes)
        self._addresses = addresses
        self._values = values
        self._max_elements = max_elements

    def start_client(self):
        functions = []
        while len(functions) < (2 * self._samples_num) + 100:

            mk_functions: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 1 in self._codes and 5 in self._codes:
                address_range = self.generate_triplet_value(self._addresses)
                for address in address_range:
                    mk_functions.extend([
                        (self.read_area, [Areas.MK, 0, address, 1], []),
                        (self.write_area, [Areas.MK, 0, address, bytearray([0b00000001])], []),
                        (self.read_area, [Areas.MK, 0, address, 1], []),
                        (self.write_area, [Areas.MK, 0, address, bytearray([0b00000000])], []),
                    ])
                    mk_functions.append((self.read_area, [Areas.MK, 0, address, 1], []))

            mk_functions_exceptions: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 1 in self._codes and 5 in self._codes:
                exception_range = self.generate_exception_ranges(self._addresses, "MK")
                markers_block = random.randint(1, 1024)
                for address in exception_range:
                    mk_functions_exceptions.extend([
                        (self.read_area, [Areas.MK, markers_block, address, 1], []),
                        (self.write_area, [Areas.MK, markers_block, address, bytearray([0b00000001])], []),
                        (self.write_area, [Areas.MK, markers_block, address, bytearray([0b00000000])], [])
                    ])

            db_functions: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 3 in self._codes and 6 in self._codes:
                address_range = self.generate_triplet_value(self._addresses)
                data_block = random.randint(1, 1024)
                for address in address_range:
                    single_data_to_write = self.generate_triplet_value(self._values)
                    for data in single_data_to_write:
                        db_functions.extend([
                            (self.read_area, [Areas.DB, data_block, address, 1], []),
                            (self.write_area, [Areas.DB, data_block, address, set_word(bytearray(2), 0, data)], []),
                        ])
                    db_functions.append((self.read_area, [Areas.DB, data_block, address, 1], []))

            db_functions_exceptions: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 3 in self._codes and 6 in self._codes:
                exception_range = self.generate_exception_ranges(self._addresses, "DB")
                data_block = random.randint(1, 1024)
                for address in exception_range:
                    random_value = random.randrange(0, S7Client.MAX_VALUE)
                    db_functions_exceptions.extend([
                        (self.read_area, [Areas.DB, data_block, address, 1], []),
                        (self.write_area, [Areas.DB, data_block, address, set_word(bytearray(2), 0, random_value)], []),
                    ])

            db_functions_multiple: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 3 in self._codes and 16 in self._codes:
                for elements in range(1, self._max_elements):
                    address_range = self.generate_triplet_value(self._addresses, elements)
                    data_block = random.randint(1, 1024)
                    for address in address_range:
                        combinations = self.generate_combinations(self._values, elements)
                        for combination in combinations.values():
                            db_functions_multiple.extend([
                                (self.read_area, [Areas.DB, data_block, address, elements], []),
                                (self.write_area, [Areas.DB, data_block, address, combination], [])
                            ])
                        db_functions_multiple.append((self.read_area, [Areas.DB, data_block, address, elements + 1], []))

            db_functions_multiple_exceptions: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 3 in self._codes and 16 in self._codes:
                for elements in range(1, self._max_elements):
                    exception_range = self.generate_exception_ranges(self._addresses, "DB", elements)
                    combinations = self.generate_combinations(self._values, elements)
                    data_block = random.randint(1, 1024)
                    for combination in combinations.values():
                        for address in exception_range:
                            db_functions_multiple_exceptions.extend([
                                (self.read_area, [Areas.DB, data_block, address, elements], []),
                                (self.write_area, [Areas.DB, data_block, address, combination], [])
                            ])
                        db_functions_multiple_exceptions.append((self.read_area, [exception_range[-1], elements + 1], []))

            mk_functions_multiple: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 1 in self._codes and 15 in self._codes:
                for elements in range(1, self._max_elements):
                    address_range = self.generate_triplet_value(self._addresses, elements)
                    markers_block = random.randint(1, 1024)
                    for address in address_range:
                        mk_combinations = self.generate_multiple_mk_requests(elements)
                        for mk_values in mk_combinations:
                            mk_functions_multiple.extend([
                                (self.read_area, [Areas.MK, markers_block, address, elements], []),
                                (self.write_area, [Areas.MK, markers_block, address, mk_values], [])
                            ])
                        mk_functions_multiple.append((self.read_area, [Areas.MK, markers_block, address, 1], []))

            mk_functions_multiple_exceptions: List[tuple[Callable[..., Any], List[Any], List[Any]]] = []
            if 1 in self._codes and 15 in self._codes:
                for elements in range(1, self._max_elements):
                    exception_range = self.generate_exception_ranges(self._addresses, "MK" elements)
                    mk_combinations = self.generate_multiple_mk_requests(self._max_elements)
                    markers_block = random.randint(1, 1024)
                    for mk_values in mk_combinations:
                        for address in exception_range:
                            mk_functions_multiple_exceptions.extend([
                                (self.read_area, [Areas.MK, markers_block, address, elements], []),
                                (self.write_area, [Areas.MK, markers_block, address, mk_values], [])
                            ])

            functions.extend(mk_functions)
            functions.extend(mk_functions_multiple)
            functions.extend(db_functions)
            functions.extend(db_functions_multiple)
            functions.extend(mk_functions_exceptions)
            functions.extend(mk_functions_multiple_exceptions)
            functions.extend(db_functions_exceptions)
            functions.extend(db_functions_multiple_exceptions)

        random.shuffle(functions)
        functions = functions[:(2 * self._samples_num) + 100]
        self._functions = functions


def main():
    ip, port, samples_num = retrieve_args()

    client = BoundariesClient(ip, port, samples_num, [1, 5, 15, 3, 6, 16], RangeModel(low=0, high=1), RangeModel(low=0, high=10), 2)
    client.start_client()
    # client.execute_functions()
    try:
        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.disconnect()


if __name__ == '__main__':
    main()
