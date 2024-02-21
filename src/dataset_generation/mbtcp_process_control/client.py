import argparse
import random
from typing import Tuple

from pymodbus.client import ModbusTcpClient

from dataset_generation.invalid_function import Mbtcp_CustomInvalidFunctionRequest


class MbtcpClient:
    def __init__(self, ip: str, port: int, samples_num: int):
        self._samples_num = samples_num
        self.ip = ip
        self.port = port
        self._client = ModbusTcpClient(self.ip, self.port)

    def connect(self):
        self._client.connect()

    def read_holding_registers(self, address, count=1):
        return self._client.read_holding_registers(address, count)

    def write_register(self, address, value):
        return self._client.write_register(address, value)

    def read_discrete_inputs(self, address, count=1):
        return self._client.read_discrete_inputs(address, count)

    def write_coil(self, address, value):
        return self._client.write_coil(address, value)

    def illegal_function(self):
        valid_function_code = [0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 15, 16, 17, 20, 21, 22, 23, 24, 43, 128]
        false_function_code = random.choice([x for x in range(0, 254) if x not in valid_function_code])
        request = Mbtcp_CustomInvalidFunctionRequest(false_function_code)
        return self._client.execute(request)

    def close(self):
        self._client.close()

    def start_client(self):
        pass


def retrieve_args() -> Tuple[str, int, int]:
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="localhost", required=False)
    parser.add_argument('-p', default=5020, required=False)
    parser.add_argument('-num', default=1000, required=False)
    args = parser.parse_args()

    return args.ip, int(args.p), int(args.num)
