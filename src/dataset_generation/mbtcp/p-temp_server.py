import time

from dataset_generation.mbtcp.server import MbtcpServer, retrieve_args
from pymodbus.datastore import ModbusServerContext


class PTempServer(MbtcpServer):
    def __init__(self, ip: str, port: int):
        super().__init__(ip, port, {1: [2]}, {}, {}, {})

    @staticmethod
    def update_control_logic(context: ModbusServerContext):
        i = 0
        while True:
            print(context[0x00].getValues(0x04, 0, count=1)[0])
            context[0x00].setValues(0x04, 0, [i])
            print(f"Updated value: {i}")
            i += 1

            time.sleep(0.5)


def main():
    ip, port = retrieve_args()
    server = PTempServer(ip, port)
    server.start()


if __name__ == '__main__':
    main()
