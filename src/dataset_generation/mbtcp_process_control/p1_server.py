import time

from dataset_generation.mbtcp_process_control.server import MbtcpServer, retrieve_args


class P1Server(MbtcpServer):

    def __init__(self, ip: str, port: int):
        super().__init__(ip, port, {1: [0, 0]}, {1: [0, 0]}, {0: 0}, {})

    def _update_control_logic(self):
        while True:
            temperature = self._store.getValues(0x03, 0, count=1)[0]
            if int(temperature) > 25:
                self._store.setValues(0x02, 0, [True])
            else:
                self._store.setValues(0x02, 0, [False])
            time.sleep(0.1)


def main():
    ip, port = retrieve_args()
    server = P1Server(ip, port)
    server.start()


if __name__ == '__main__':
    main()
