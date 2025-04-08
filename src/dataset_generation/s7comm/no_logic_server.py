from snap7.types import srvAreaDB, srvAreaMK
from dataset_generation.s7comm.server import S7Comm, retrieve_args


class NoLogicServer(S7Comm):
    def __init__(self, ip: str, port: int, markers: int = 1, datablock: int = 1):
        super().__init__(ip, port, {srvAreaDB: datablock, srvAreaMK: markers})


def main():
    ip, port = retrieve_args()
    server = NoLogicServer(ip, port, 1, 100)
    server.start()


if __name__ == '__main__':
    main()
