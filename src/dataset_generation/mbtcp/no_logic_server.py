from dataset_generation.mbtcp.server import MbtcpServer, retrieve_args


class NoLogicServer(MbtcpServer):
    def __init__(self, ip: str, port: int, registers: int, coils: int):
        super().__init__(ip, port, {},
                         {1: [0]*registers},
                         {0: 0},
                         {1: [0]*coils})


def main():
    ip, port = retrieve_args()
    server = NoLogicServer(ip, port)
    server.start()


if __name__ == '__main__':
    main()
