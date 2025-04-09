from dataset_generation.mbtcp.server import MbtcpServer, retrieve_args


class NoLogicServer(MbtcpServer):
    def __init__(self, ip: str, port: int, coils: int = 2, registers: int = 2):
        super().__init__(ip, port, {},
                         {1: [0]*registers},
                         {0: 0},
                         {1: [0]*coils})


def main():
    ip, port = retrieve_args()
    server = NoLogicServer(ip, port, 40, 40)
    server.start()


if __name__ == '__main__':
    main()
