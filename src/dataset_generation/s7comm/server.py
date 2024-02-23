import argparse
import logging
from typing import Tuple
from snap7.server import Server
from snap7.types import wordlen_to_ctypes, WordLen, srvAreaDB, srvAreaMK


class S7Comm:

    def __init__(self, ip: str, port: int, block_dict: dict):
        self._ip = ip
        self._port = port
        self._wordlen_to_ctypes = wordlen_to_ctypes
        self._block_dict = block_dict

        for block_code, size in block_dict.items():
            for index in range(size+1):
                if block_code == srvAreaDB:
                    setattr(self, f"_DBdata_{index}", (wordlen_to_ctypes[WordLen.Byte.value] * 2)())
                if block_code == srvAreaMK:
                    setattr(self, f"_MKdata_{index}", (wordlen_to_ctypes[WordLen.Byte.value] * 2)())

    def start(self):
        setup_logging()
        logging.info("Starting S7comm Server..")
        server = Server()
        try:
            for block_code, size in self._block_dict.items():
                for index in range(size+1):
                    if block_code == srvAreaDB:
                        db_data_attr = getattr(self, f"_DBdata_{index}", None)
                        if db_data_attr is not None:
                            server.register_area(srvAreaDB, 0, db_data_attr)
                    if block_code == srvAreaMK:
                        mk_data_attr = getattr(self, f"_MKdata_{index}", None)
                        if mk_data_attr is not None:
                            server.register_area(srvAreaMK, 0, mk_data_attr)

            server.start_to(self._ip, self._port)
            print("S7comm server started")
            server.get_status()
        except KeyboardInterrupt:
            print("Server stopped by user.")
            server.stop()
            server.destroy()

    def _update_control_logic(self):
        pass


def setup_logging():
    logging.basicConfig(format='%(asctime)s %(levelname)-8s %(message)s',
                        level=logging.DEBUG,
                        datefmt='%Y-%m-%d %H:%M:%S')


def retrieve_args() -> Tuple[str, int]:
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="localhost", required=False)
    parser.add_argument('-p', default=5020, required=False)
    args = parser.parse_args()

    return args.ip, int(args.p)
