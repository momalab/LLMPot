import time

from dataset_generation.mbtcp_process_control.server import MbtcpServer, retrieve_args


class P2Server(MbtcpServer):
    def __init__(self, ip: str, port: int):
        super().__init__(ip, port, {1: [0, 0]}, {1: [0, 0]}, {0: [0, 0]}, {})

    def update_control_logic(self):
        while True:
            # Water Tank Level Control System:
            upper_level_limit = 70
            lower_level_limit = 30
            water_level = self._store.getValues(0x03, 0, count=1)[0] # water level sensor
            if int(water_level) > upper_level_limit:
                self._store.setValues(0x02, 0, [True]) # open outtflow control valve
                self._store.setValues(0x02, 1, [False])
            elif int(water_level) < lower_level_limit:
                self._store.setValues(0x02, 0, [False])
                self._store.setValues(0x02, 1, [True]) # open inflow control valve
            else:
                self._store.setValues(0x02, 0, [False])
                self._store.setValues(0x02, 1, [False])
            time.sleep(0.1)


def main():
    ip, port = retrieve_args()
    server = P2Server(ip, port)
    server.start()


if __name__ == '__main__':
    main()