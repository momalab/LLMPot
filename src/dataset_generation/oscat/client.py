import argparse
from typing import Tuple

from pymodbus.client import ModbusTcpClient

class MbtcpClient(ModbusTcpClient):
    def __init__(self, ip: str, port: int, samples_num: int, function_name: str, sampling: bool, range_low: int, range_high: int):
        super().__init__(ip, port)
        self._function_name = function_name
        self._samples_num = samples_num
        self.ip = ip
        self.port = port
        self.sampling = sampling
        self.range_low = range_low
        self.range_high = range_high
        self.connect()

    def start_client(self):
        pass


def retrieve_args() -> Tuple[str, int, int, str, bool, int, int]:
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="10.224.33.30", required=False)
    parser.add_argument('-p', default=5020, type=int, required=False)
    parser.add_argument('-num', default=4096, type=int, required=False)
    parser.add_argument('-func', default="no-sgn", required=False)
    parser.add_argument('-sampling', action="store_true")
    parser.add_argument('-range_low', default=-10, required=False)
    parser.add_argument('-range_high', default=10, required=False)
    args = parser.parse_args()

    return args.ip, args.p, args.num, args.func, args.sampling, args.range_low, args.range_high
