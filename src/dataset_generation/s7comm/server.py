import argparse
import logging
from typing import Tuple
from snap7.server import Server
from snap7.types import wordlen_to_ctypes, WordLen, srvAreaDB, srvAreaMK


class S7Comm:

    def __init__(self, ip: str, port: int, block_dict: dict):
        self._ip = ip
        self._port = port
        self._block_dict = block_dict
        setup_logging()

        for block_code, size in block_dict.items():
            for index in range(size):
                if block_code == srvAreaDB:
                    setattr(self, f"_DBdata_{index}", (wordlen_to_ctypes[WordLen.Byte.value] * 40)())
                if block_code == srvAreaMK:
                    setattr(self, f"_MKdata_{index}", (wordlen_to_ctypes[WordLen.Byte.value] * 40)())

    def start(self):
        logging.info("Starting S7comm Server..")
        server = Server()
        try:
            for block_code, size in self._block_dict.items():
                for index in range(size):
                    if block_code == srvAreaDB:
                        db_data_attr = getattr(self, f"_DBdata_{index}", None)
                        if db_data_attr is not None:
                            server.register_area(srvAreaDB, index, db_data_attr)
                    if block_code == srvAreaMK:
                        mk_data_attr = getattr(self, f"_MKdata_{index}", None)
                        if mk_data_attr is not None:
                            server.register_area(srvAreaMK, index, mk_data_attr)

            server.start_to(self._ip, self._port)
            print("S7comm server started")
            self._update_control_logic()
        except Exception as e:
            logging.error(f"Failed to start server: {e}")
            raise

        try:
            while True:
                continue
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
    parser.add_argument('-ip', default="127.0.0.1", required=False)
    parser.add_argument('-p', default=10200, required=False)
    args = parser.parse_args()

    return args.ip, int(args.p)
