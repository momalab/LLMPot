import argparse
from typing import Tuple

from pymodbus.client import ModbusTcpClient
import sys
import os

class MbtcpClient(ModbusTcpClient):
    def __init__(self, ip: str, port: int, samples_num: int, update_setpoint: str):
        super().__init__(ip, port)
        self.ip = ip
        self.port = port
        self._samples_num = samples_num
        self._update_setpoint = update_setpoint
        self.connect()

    def start_client(self):
        pass


def retrieve_args() -> Tuple[str, int, int, str]:
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="192.168.0.2", required=False)
    parser.add_argument('-p', default=502, required=False)
    parser.add_argument('-num', default=1000, required=False)
    parser.add_argument('-sp', default="False", required=False)
    args = parser.parse_args()

    return args.ip, int(args.p), int(args.num), args.sp
