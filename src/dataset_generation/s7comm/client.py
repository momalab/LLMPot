import argparse
import logging
import sys
import time
from typing import Tuple, List

from snap7.client import Client
from snap7.types import Areas
from snap7.util import get_word, get_bool

from finetune.model.finetuner_model import RangeModel

logger = logging.getLogger(__name__)
logger.setLevel(logging.CRITICAL)

handler = logging.StreamHandler(sys.stdout)
handler.setLevel(logging.CRITICAL)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)


class S7Client(Client):
    MAX_ADDRESS = 15999
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
        except Exception as e:
            logger.error(f"Exception: {e}")

    def start_client(self):
        pass

    def execute_functions(self):
        time.sleep(2)
        for function, args, kwargs in self._functions:
            try:
                response = function(*args, **kwargs)
                if not response:
                    print(f"Not received response to request: {function} and {args}")
            except Exception as e:
                print(f"Error in function: {function.__name__} with args: {args}, exception: {e}")
            if function.__name__ == self.write_area.__name__:
                time.sleep(0.05)


def retrieve_args() -> Tuple[str, int, int]:
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="127.0.0.1", required=False)
    parser.add_argument('-p', default=10200, type=int, required=False)
    parser.add_argument('-num', default=100, type=int, required=False)
    args = parser.parse_args()

    return args.ip, int(args.p), int(args.num)
