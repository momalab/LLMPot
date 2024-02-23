import argparse
from typing import Tuple
from snap7.client import Client
from snap7.types import Areas
from snap7.util import get_word, get_bool


class S7Client(Client):
    def __init__(self, ip: str, port: int, samples_num: int):
        super().__init__()
        self._samples_num = samples_num
        self.ip = ip
        self.port = port
        self.connect(self.ip, 0, 0, self.port)
        self.get_connected()

    def func_wrapper(self, func: callable, *args):
        try:
            func(*args)
            if func.__name__ == self.read_area.__name__:
                block_name, block_num, address, num_bytes = args[0], args[1], args[2], args[3]
                response = self.read_area(block_name, block_num, address, num_bytes)
                if block_name == Areas.MK:
                    print(f"Data at {block_num} is: {get_bool(response, 0, 0)}")
                if block_name == Areas.DB:
                    print(f"Data at {block_num} is: {get_word(response, 0)}")

            if func.__name__ == self.write_area.__name__:
                block_name, block_num, address, value = args[0], args[1], args[2], args[3]
                response = self.write_area(block_name, block_num, address, value)
                if block_name == Areas.MK:
                    print(f"Data at {block_num} is: {get_bool(value, 0, 0)}")
                if block_name == Areas.DB:
                    print(f"Data at {block_num} is: {get_word(value, 0)}")
        except RuntimeError:
            print("----- Exception -----")
        except IndexError:
            print("----- Exception -----")

    def start_client(self):
        pass


def retrieve_args() -> Tuple[str, int, int]:
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="127.0.0.1", required=False)
    parser.add_argument('-p', default=10200, required=False)
    parser.add_argument('-num', default=1000, required=False)
    args = parser.parse_args()

    return args.ip, int(args.p), int(args.num)
