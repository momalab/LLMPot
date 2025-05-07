import argparse
from typing import Tuple

from pymodbus.client import ModbusTcpClient
import sys
import os

class MbtcpClient(ModbusTcpClient):
    def __init__(self, ip: str, port: int, process_name: str):
        super().__init__(ip, port)
        self._process_name = process_name
        self.ip = ip
        self.port = port
        self.connect()

    def start_client(self):
        pass


def retrieve_args() -> Tuple[str, int, str]:
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="10.224.33.30", required=False)
    parser.add_argument('-p', default=502, required=False)
    parser.add_argument('-process', default="smartgrid", required=False)
    args = parser.parse_args()

    return args.ip, int(args.p), args.process
