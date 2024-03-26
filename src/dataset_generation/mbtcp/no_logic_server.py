from dataset_generation.mbtcp.server import MbtcpServer, retrieve_args


class NoLogicServer(MbtcpServer):
    def __init__(self, ip: str, port: int):
        super().__init__(ip, port, {1: [0, 0]}, {1: [0, 0]}, {0: 0}, {1: [0, 0]})


def main():
    ip, port = retrieve_args()
    server = NoLogicServer(ip, port)
    server.start()


if __name__ == '__main__':
    main()
