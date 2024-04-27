import random
from typing import List, Callable, Any
from snap7.util import set_word
from snap7.types import Areas
from dataset_generation.s7comm.client import S7Client, retrieve_args
from dataset_generation.utils import value_generator
from finetune.model.finetuner_model import RangeModel


class BoundariesClient(S7Client):

    def __init__(self, ip: str, port: int, samples_num: int, codes: List[int], addresses: RangeModel, values: RangeModel, max_elements: int):
        super().__init__(ip, port, samples_num, codes)
        self._addresses = addresses
        self._values = values
        self._max_elements = max_elements

    def start_client(self):
        functions = []
        while len(functions) < self._samples_num:

            db_functions_multiple: List[tuple[Callable[..., Any], List[Any], dict]] = []
            if 3 in self._codes or 16 in self._codes or 6 in self._codes:
                for elements in range(1, self._max_elements):
                    data_blocks = value_generator.generate_triplet_blocks(40, S7Client.MAX_NUM_BLOCKS)
                    for data_block in data_blocks:
                        combinations = value_generator.generate_combinations(self._values, elements)
                        for combination in combinations.values():
                            db_functions_multiple.extend([
                                (self.write_area, [Areas.DB, data_block, 0, value_generator.generate_words(combination)], {}),
                                (self.read_area, [Areas.DB, data_block, 0, elements], {})
                            ])

            db_functions_multiple_exceptions: List[tuple[Callable[..., Any], List[Any], dict]] = []
            if 3 in self._codes or 16 in self._codes or 6 in self._codes:
                for elements in range(1, self._max_elements):
                    combinations = value_generator.generate_combinations(self._values, elements)
                    data_blocks = value_generator.generate_triplet_blocks(40, S7Client.MAX_NUM_BLOCKS)
                    for data_block in data_blocks:
                        for combination in combinations.values():
                            db_functions_multiple_exceptions.extend([
                                (self.read_area, [Areas.DB, data_block, 0, elements], {}),
                                (self.write_area, [Areas.DB, data_block, 0, value_generator.generate_words(combination)], {})
                            ])

            mk_functions_multiple: List[tuple[Callable[..., Any], List[Any], dict]] = []
            if 1 in self._codes or 5 in self._codes or 15 in self._codes:
                for elements in range(1, self._max_elements):
                    markers_block = 0
                    mk_combinations = value_generator.generate_multiple_requests(elements, [bytearray([0b00000001]), bytearray([0b00000000])])
                    for mk_values in mk_combinations:
                        mk_functions_multiple.extend([
                            (self.read_area, [Areas.MK, markers_block, 0, elements], {}),
                            (self.write_area, [Areas.MK, markers_block, 0, value_generator.generate_words_from_bytearrays(mk_values)], {})
                        ])

            mk_functions_multiple_exceptions: List[tuple[Callable[..., Any], List[Any], dict]] = []
            if 1 in self._codes or 5 in self._codes or 15 in self._codes:
                for elements in range(1, self._max_elements):
                    mk_combinations = value_generator.generate_multiple_requests(self._max_elements, [bytearray([0b00000001]), bytearray([0b00000000])])
                    markers_blocks = value_generator.generate_triplet_blocks(1, S7Client.MAX_NUM_BLOCKS)
                    for markers_block in markers_blocks:
                        for mk_values in mk_combinations:
                            mk_functions_multiple_exceptions.extend([
                                (self.read_area, [Areas.MK, markers_block, 0, elements], {}),
                                (self.write_area, [Areas.MK, markers_block, 0, value_generator.generate_words_from_bytearrays(mk_values)], {})
                            ])

            functions.extend(mk_functions_multiple)
            functions.extend(db_functions_multiple)
            functions.extend(mk_functions_multiple_exceptions)
            functions.extend(db_functions_multiple_exceptions)

        random.shuffle(functions)
        functions = functions[:self._samples_num]
        self._functions = functions


def main():
    ip, port, samples_num = retrieve_args()

    client = BoundariesClient(ip, port, samples_num, [1, 5, 15, 3, 6, 16], RangeModel(low=0, high=10), RangeModel(low=0, high=10), 2)
    client.start_client()
    try:
        client.execute_functions()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.disconnect()


if __name__ == '__main__':
    main()
