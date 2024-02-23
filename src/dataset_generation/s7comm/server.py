import argparse
import logging
from typing import Tuple
from snap7.server import Server
from snap7.types import wordlen_to_ctypes, WordLen, srvAreaDB, srvAreaMK


class S7Comm:

    def __init__(self, ip: str, port: int, size: int, db_block: dict, mk_block: dict):
        self._ip = ip
        self._port = port
        self._wordlen_to_ctypes = wordlen_to_ctypes
        self._size = size
        self._mk_block = mk_block
        self._db_block = db_block
        self._srvAreaDB = srvAreaDB # code 5 in db_block
        self._srvAreaMK = srvAreaMK # code 2 in mk_block
        self._DBdata = (wordlen_to_ctypes[WordLen.Byte.value] * size)()
        self._MKdata = (wordlen_to_ctypes[WordLen.Byte.value] * size)()

        for db_number, counts in db_block.items():
            for count in counts:
                for i in range(count):
                    # if block_number == 5:
                    setattr(self, f"_DBdata_{i}", (wordlen_to_ctypes[WordLen.Byte.value] * size)())
        for mk_number, counts in mk_block.items():
            for count in counts:
                for i in range(count):
                    # if block_number == 2: #must be common dict for both ?
                    setattr(self, f"_MKdata_{i}", (wordlen_to_ctypes[WordLen.Byte.value] * size)())

    def start(self):
        setup_logging()
        logging.info("Starting S7comm Server..")
        server = Server()
        try:
            for db_number, counts in self._db_block.items():
                for count in counts:
                    for i in range(count):
                        db_data_attr = getattr(self, f"_DBdata_{i}", None)
                        if db_data_attr is not None:
                            server.register_area(srvAreaDB, 0, db_data_attr)
            for mk_numer, counts in self._mk_block.items():
                for count in counts:
                    for i in range(count):
                        mk_data_attr = getattr(self, f"_MKdata_{i}", None)
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
