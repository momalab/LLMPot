import argparse
import random
from typing import Tuple

from pymodbus.client import ModbusTcpClient
import sys
import os


from dataset_generation.mbtcp.invalid_function import MbtcpCustomInvalidFunctionRequest

class MbtcpClient(ModbusTcpClient):
    def __init__(self, ip: str, port: int, samples_num: int):
        super().__init__(ip, port)
        self._samples_num = samples_num
        self.ip = ip
        self.port = port
        self.connect()

    def illegal_function(self):
        valid_function_code = [0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 15, 16, 17, 20, 21, 22, 23, 24, 43, 128]
        false_function_code = random.choice([x for x in range(0, 254) if x not in valid_function_code])
        request = MbtcpCustomInvalidFunctionRequest(false_function_code)
        return self.execute(request)

    def start_client(self):
        pass


def retrieve_args() -> Tuple[str, int, int]:
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="10.224.33.30", required=False)
    parser.add_argument('-p', default=502, required=False)
    parser.add_argument('-num', default=4096, required=False)
    args = parser.parse_args()

    return args.ip, int(args.p), int(args.num)
