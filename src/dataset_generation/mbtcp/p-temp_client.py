import random

from dataset_generation.mbtcp.client import MbtcpClient, retrieve_args


class PTempClient(MbtcpClient):
    def start_client(self):
        functions = []
        while len(functions) < self._samples_num:
            print(f"Functions: {len(functions)}")
            functions.extend([(self.read_holding_registers, [3], {})])

        random.shuffle(functions)
        self._functions = functions

        self.execute_functions(delay=0.1)


def main():
    client = PTempClient(*retrieve_args())
    try:
        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()


if __name__ == '__main__':
    main()
