import time

from dataset_generation.s7comm.server import S7Comm, retrieve_args


class P1Server(S7Comm):
    def __init__(self, ip: str, port: int):
        super().__init__(ip, port, {self._srvAreaDB: 1, self._srvAreaMK: 1})

    def _update_control_logic(self):
        while True:
            temp = int.from_bytes(self.DBdata_0, byteorder='big')
            if temp > 25:
                self.MKData_0[0] = 1
            else:
                self.MKData_0[0] = 0
            time.sleep(0.1)


def main():
    ip, port = retrieve_args()
    server = P1Server(ip, port)
    server.start()


if __name__ == '__main__':
    main()
