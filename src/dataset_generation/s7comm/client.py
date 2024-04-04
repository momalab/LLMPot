import argparse
import itertools
import random
from typing import Tuple, List
from snap7.client import Client
from snap7.types import Areas
from snap7.util import get_word, get_bool

import logging
import sys

from finetune.model.finetuner_model import RangeModel

logger = logging.getLogger(__name__)
logger.setLevel(logging.CRITICAL)

handler = logging.StreamHandler(sys.stdout)
handler.setLevel(logging.CRITICAL)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)


class S7Client(Client):
    MAX_MK_ADDRESS = 16382
    MAX_DB_ADDRESS = 15999
    MAX_NUM_BLOCKS = 1024
    MAX_VALUE = 27648

    def __init__(self, ip: str, port: int, samples_num: int, codes: List[int]):
        super().__init__()
        logging.getLogger(Client.__module__).setLevel(logging.CRITICAL)
        self._samples_num = samples_num
        self.ip = ip
        self.port = port
        self._functions = []
        self._codes = codes
        self.connect(self.ip, 0, 0, self.port)
        self.get_connected()

    def func_wrapper(self, func: callable, *args):
        try:
            if func.__name__ == self.read_area.__name__:
                block_name, block_num, address, num_bytes = args[0], args[1], args[2], args[3]
                response = self.read_area(block_name, block_num, address, num_bytes)
                if block_name == Areas.MK:
                    logger.info(f"Data at {block_num} is: {get_bool(response, 0, 0)}")
                if block_name == Areas.DB:
                    logger.info(f"Data at {block_num} is: {get_word(response, 0)}")

            if func.__name__ == self.write_area.__name__:
                block_name, block_num, address, value = args[0], args[1], args[2], args[3]
                response = self.write_area(block_name, block_num, address, value)
                if block_name == Areas.MK:
                    logger.info(f"Data at {block_num} is: {get_bool(value, 0, 0)}")
                if block_name == Areas.DB:
                    logger.info(f"Data at {block_num} is: {get_word(value, 0)}")
        except RuntimeError:
            logger.error("----- Exception -----")
        except IndexError:
            logger.error("----- Exception -----")

    @staticmethod
    def generate_random_value(values: RangeModel, elements=0):
        return random.randrange(values.low, values.high - elements)

    @staticmethod
    def generate_multiple_mk_requests(elements):
        mk_value = [bytearray([0b00000001]), bytearray([0b00000000])]
        return itertools.product(mk_value, repeat=elements + 1)

    @staticmethod
    def generate_combinations(values: RangeModel, elements):
        nums = [values.low, random.randrange(values.low + 1, values.high - elements - 1), values.high - elements]

        combinations = itertools.product(nums, repeat=elements + 1)
        return {i: list(t) for i, t in enumerate(combinations)}

    @staticmethod
    def generate_triplet_value(values: RangeModel, elements=0):
        return [values.low, random.randrange(values.low, values.high - elements - 1), values.high - elements]

    @staticmethod
    def generate_exception_ranges(addresses: RangeModel, area_block, elements=0):
        if area_block == "MK":
            return [addresses.high + 1, random.randrange(addresses.high, S7Client.MAX_MK_ADDRESS - elements - 1), S7Client.MAX_MK_ADDRESS - elements]
        if area_block == "DB":
            return [addresses.high + 1, random.randrange(addresses.high, S7Client.MAX_DB_ADDRESS - elements - 1), S7Client.MAX_DB_ADDRESS - elements]


    def start_client(self):
        pass


def retrieve_args() -> Tuple[str, int, int]:
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="127.0.0.1", required=False)
    parser.add_argument('-p', default=10200, required=False)
    parser.add_argument('-num', default=1200, required=False)
    args = parser.parse_args()

    return args.ip, int(args.p), int(args.num)
