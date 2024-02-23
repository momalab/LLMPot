import argparse
import random
from typing import Tuple
from snap7.client import Client

from dataset_generation.s7comm.invalid_function import S7_CustomInvalidFunctionRequest


class S7Client(Client):

    def __init__(self, ip: str, port: int, samples_num: int):
        super().__init__()
        self._samples_num = samples_num
        self.ip = ip
        self.port = port

    def illegal_function(self):
        valid_function_code = [240, 241, 242, 243, 244, 245, 246] # Read = 0x04 and Write = 0x05 - must be altered
        false_function_code = random.choice([x for x in range(0, 255) if x not in valid_function_code])
        print(f"False FC is: {false_function_code}")
        request = S7_CustomInvalidFunctionRequest(false_function_code, self.ip, self.port)
        return request.send_custom_s7_command()

    def func_wrapper(self, func: callable, *args):
        try:
            func(args)
            # if func == self.read_area:
            #     if Areas.MK:
            #         print(f"Data at {data_block} is: {get_bool(cooling_system_status, 0, 0)}")
            #     else:
            #         print(f"Data at {data_block} is: {get_word(temperature_status, 0)}")
            # if func == self.write_area:
            #     if Areas.MK:
            #         print(f"Data at {data_block} updated to: {get_bool(cool, 0, 0)}")
            #     else:
            #         print(f"Data at {data_block} updated to: {get_word(new_temp, 0)}")
        except RuntimeError:
            print("----- Exception -----")
        except IndexError:
            print("----- Exception -----")

    def start_client(self):
        # self.connect(self.ip, 0, 0, self.port)
        # self.get_connected()
        pass


def retrieve_args() -> Tuple[str, int, int]:
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="localhost", required=False)
    parser.add_argument('-p', default=5020, required=False)
    parser.add_argument('-num', default=1000, required=False)
    args = parser.parse_args()

    return args.ip, int(args.p), int(args.num)
