from dataset_generation.s7comm.server import S7Comm, retrieve_args
from snap7.types import srvAreaDB, srvAreaMK


class NoLogicServer(S7Comm):
    def __init__(self, ip: str, port: int, datablock: int = 1, markers: int = 1):
        super().__init__(ip, port, {srvAreaDB: datablock, srvAreaMK: markers})


def main():
    ip, port = retrieve_args()
    server = NoLogicServer(ip, port, 2, 1)
    server.start()


if __name__ == '__main__':
    main()
