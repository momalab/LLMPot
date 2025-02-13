import argparse
from typing import List, Tuple

from pymodbus.client import ModbusTcpClient


class MbtcpClient(ModbusTcpClient):
    def __init__(self, ip: str, port: int, samples_num: int, sps: List[int]):
        super().__init__(ip, port)
        self.ip = ip
        self.port = port
        self.samples_num = samples_num
        self.sps = sps
        self.connect()

    def start_client(self):
        pass


def retrieve_args() -> Tuple[str, int, int, str]:
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="192.168.0.2", required=False)
    parser.add_argument('-p', default=502, required=False)
    parser.add_argument('-num', default=1600, required=False)
    parser.add_argument('-sps', nargs="+", type=int, default=[80, 70, 85, 75], required=False)
    args = parser.parse_args()

    return args.ip, args.p, args.num, args.sps
