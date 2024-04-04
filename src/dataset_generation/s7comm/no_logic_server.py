from dataset_generation.s7comm.server import S7Comm, retrieve_args
from snap7.types import srvAreaDB, srvAreaMK


class NoLogicServer(S7Comm):
    def __init__(self, ip: str, port: int, mk: int = 2, db: int = 2):
        super().__init__(ip, port, {srvAreaDB: db, srvAreaMK: mk})


def main():
    ip, port = retrieve_args()
    server = NoLogicServer(ip, port, 40, 40)
    server.start()


if __name__ == '__main__':
    main()
