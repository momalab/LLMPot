import argparse
from typing import Tuple

from pymodbus.client import ModbusTcpClient
import sys
import os

class MbtcpClient(ModbusTcpClient):
    def __init__(self, ip: str, port: int, samples_num: int, function_name: str):
        super().__init__(ip, port)
        self._function_name = function_name
        self._samples_num = samples_num
        self.ip = ip
        self.port = port
        self.connect()

    def start_client(self):
        pass


def retrieve_args() -> Tuple[str, int, int]:
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="10.224.33.30", required=False)
    parser.add_argument('-p', default=502, required=False)
    parser.add_argument('-num', default=4096, required=False)
    parser.add_argument('-func', default="sigmoid", required=False)
    args = parser.parse_args()

    return args.ip, int(args.p), int(args.num), str(args.func)
