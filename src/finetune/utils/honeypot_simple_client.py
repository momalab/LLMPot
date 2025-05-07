import argparse
import random

from mbtcp_requests import Mbtcp_Requests


class MbtcpClient:

    def __init__(self, server_address: str, server_port: int):
        self.mbtcp_requests = Mbtcp_Requests(server_address, server_port)

    @staticmethod
    def generate_random_request():
        address = random.randint(0, 64)
        num_elements = random.randint(1, 10)
        data_to_write = [random.randint(0, 65535) for _ in range(num_elements)]
        single_data_to_write = random.randint(0, 65535)
        return address, num_elements, data_to_write, single_data_to_write

    def start_client(self, samples_num: int, has_context: bool, initial_function_code: int):
        self.mbtcp_requests.connect_client()

        try:
            for _ in range(samples_num):

                if not has_context:
                    address, num_elements, data_to_write, single_data_to_write = self.generate_random_request()
                    if initial_function_code == 0:
                        function_code = random.choice([3, 16])
                    else:
                        function_code = initial_function_code

                    if function_code == 1:  # Read Coils (FC 01)
                        self.mbtcp_requests.read_data("Coils", address, 1, num_elements)

                    elif function_code == 3:  # Read Holding Registers (FC 03)
                        self.mbtcp_requests.read_data("Holding Registers", address, 3, num_elements)

                    elif function_code == 5:  # Write Single Coil (FC 5)
                        self.mbtcp_requests.write_single_data("Write Single Coil", address, single_data_to_write, 5)

                    elif function_code == 6:  # Write Single Register (FC 6)
                        self.mbtcp_requests.write_single_data("Write Single Register", address, single_data_to_write, 6)

                    elif function_code == 15:  # Write Multiple Coils (FC 15)
                        self.mbtcp_requests.write_multiple_data("Write Multiple Coils", address, data_to_write, 15)

                    elif function_code == 16:  # Write Multiple Registers (FC 16)
                        self.mbtcp_requests.write_multiple_data("Write Multiple Registers", address, data_to_write, 16)

                else:
                    address = random.randint(0, 64)
                    num_elements = random.randint(1, 10)
                    data_to_write = [random.randint(0, 15) for _ in range(num_elements)]

                    self.mbtcp_requests.read_data("Read holding Registers", address, 3, num_elements)
                    self.mbtcp_requests.write_multiple_data("Write Multiple Registers", address, data_to_write, 16)
                    self.mbtcp_requests.read_data("Read holding Registers", address, 3, num_elements)

        except KeyboardInterrupt:
            print("Client stopped by user.")
        finally:
            self.mbtcp_requests.close_client()

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="localhost", required=False)
    parser.add_argument('-p', type=int, default=5020, required=False)
    parser.add_argument('-num', type=int, default=2, required=False)
    parser.add_argument('-c', type=bool, default=False, required=False)
    parser.add_argument('-fun', type=int, default=6, required=False)
    args = parser.parse_args()

    server_address = args.ip
    server_port = args.p
    samples_num = args.num
    has_context = args.c
    function_code = args.fun

    mbtcp_client = MbtcpClient(server_address, server_port)
    mbtcp_client.start_client(samples_num, has_context, function_code)


if __name__ == '__main__':
    main()