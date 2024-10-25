import argparse
import random
import re
import time
from typing import Tuple, List

import numpy as np
from pymodbus.client import ModbusTcpClient

from dataset_generation.mbtcp.invalid_function import MbtcpCustomInvalidFunctionRequest


class MbtcpClient(ModbusTcpClient):
    MAX_ADDRESS = 65535
    MAX_REG_VALUE = 65535

    def __init__(self, ip: str, port: int, samples_num: int, codes: List[int]):
        super().__init__(ip, port)
        self._samples_num = samples_num
        self.ip = ip
        self.port = port
        self._functions = []
        self._codes = codes

        extra_samples_num = samples_num // 100
        samples = np.random.randint(0, 65535, samples_num - extra_samples_num)
        samples_list = samples.tolist()

        samples_list.extend([0] * extra_samples_num)
        samples_list.extend([65535] * extra_samples_num)
        random.shuffle(samples_list)

        self.transaction_ids = samples_list

    def illegal_function(self):
        valid_function_code = [0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 15, 16, 17, 20, 21, 22, 23, 24, 43, 128]
        false_function_code = random.choice([x for x in range(0, 254) if x not in valid_function_code])
        request = MbtcpCustomInvalidFunctionRequest(false_function_code)
        return self.execute(request)

    def start_client(self):
        pass

    def execute_functions(self, delay: float = 0):
        self.connect()
        for function, args, kwargs in self._functions:
            request = function(*args, **kwargs)
            self.transaction.tid = self.transaction_ids.pop()

            if hasattr(request, "slave_id") and request.slave_id == None:
                request.slave_id = 0

            response = self.execute(request)
            time.sleep(delay)
            if not response:
                print(f"Not received response to request: {function.__name__} and {args}")
            if function.__name__ == self.write_register.__name__:
                time.sleep(0.05)


def retrieve_args() -> Tuple[str, int, int, List[int]]:
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="localhost", required=False)
    parser.add_argument('-p', default=5020, required=False)
    parser.add_argument('-num', default=1000, required=False)
    args = parser.parse_args()

    return args.ip, int(args.p), int(args.num), [1,5,15,3,6,16,11]
