import argparse
import random
import traceback
from mbtcp_requests import Mbtcp_Requests
from invalid_function import CustomInvalidFunctionRequest


class MbtcpClient:
    def __init__(self, server_address: str, server_port: int):
        self.mbtcp_requests = Mbtcp_Requests(server_address, server_port)

    def start_client(self, samples_num: int, function_code: str, exception_code: str):
        self.mbtcp_requests.connect_client()

        try:
            for exception in exception_code:
                for function in function_code:
                    for _ in range(samples_num):

                        print(f"Exc: {exception}")

                        #Illegal Function Code
                        if exception == '1':
                            valid_functioncode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 15, 16, 17, 20, 21, 22, 23, 24, 43, 128]
                            false_functioncode = random.choice([x for x in range(0, 254) if x not in valid_functioncode])
                            address = random.randint(0, 100)
                            num_elements = random.randint(1, 3)
                            print(f"E_FC: {false_functioncode}, Elements: {num_elements}, Address: {address}")

                            request = CustomInvalidFunctionRequest(false_functioncode)
                            print(self.mbtcp_requests.execute(request))

                        #Illegal Data Address
                        if exception == '2':
                            address = random.randint(100, 125)
                            num_elements = random.randint(1, 3)
                            mult_data_to_write = [random.randint(0, 3) for _ in range(num_elements)]
                            single_data_to_write = random.randint(0, 10)
                            print(f"Elements: {num_elements}, Address: {address}")

                            if function == '1':
                                self.mbtcp_requests.read_data("Read Coil", address, 1, num_elements)
                            if function == '3':
                                self.mbtcp_requests.read_data("Read Holding Registers", address, 3, num_elements)
                            if function == '5':
                                self.mbtcp_requests.write_single_data("Write Single Coil", address, single_data_to_write, 5)
                            if function == '6':
                                self.mbtcp_requests.write_single_data("Write Single Register", address, single_data_to_write, 6)
                            if function == '15':
                                self.mbtcp_requests.write_multiple_data("Write Multiple Coils", address, mult_data_to_write, 15)
                            if function == '16':
                                self.mbtcp_requests.write_multiple_data("Write Multiple Registers", address, mult_data_to_write, 16)

                        #Illegal Data Value
                        if exception == '3':  # Note nothing happens for FC 5 nd 6 here
                            address = random.randint(0, 100)

                            if function == '1':
                                num_elements = random.randint(2001, 2040)  # max of 2000 coils
                                print(f"Elements: {num_elements}, Address: {address}")
                                self.mbtcp_requests.read_data("Read Coil", address, 1, num_elements)

                            if function == '3':
                                num_elements = random.randint(126, 130)  # max of 125 registers
                                print(f"Elements: {num_elements}, Address: {address}")
                                self.mbtcp_requests.read_data("Read Holding Registers", address, 3, num_elements)

                            if function == '15':
                                # max of 1968 multiple coils
                                num_elements = random.randint(1969, 2040)
                                mult_data_to_write = [random.randint(0, 3) for _ in range(num_elements)]
                                print(f"Elements: {num_elements}, Address: {address}")
                                self.mbtcp_requests.write_multiple_data("Write Multiple Coils", address, mult_data_to_write, 15)

                            if function == '16':
                                # max of 123 multiple registers/ after 127 it gives struct.error
                                num_elements = random.randint(124, 127)
                                mult_data_to_write = [random.randint(0, 3) for _ in range(num_elements)]
                                print(f"Elements: {num_elements}, Address: {address}")
                                self.mbtcp_requests.write_multiple_data("Write Multiple Registers", address, mult_data_to_write, 16)

        except Exception as e:
            print(f"Error: {str(e)}")
            print(traceback.format_exc())

        finally:
            self.mbtcp_requests.close_client()


def main():
    def list_of_strings(arg):
        return arg.split(',')
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip',  default="localhost", required=False)
    parser.add_argument('-p',  default=502, required=False)
    parser.add_argument('-num', default=5, required=False)
    # example: -fun 1,3,etc #OR for single test default=['16'] and False
    parser.add_argument('-fun', type=list_of_strings, required=True)
    # example: -exc 1,2,3   #OR for single test default=['3'] and False
    parser.add_argument('-exc', type=list_of_strings, required=True)

    args = parser.parse_args()

    server_address = args.ip
    server_port = int(args.p)
    samples_num = int(args.num)
    function_code = args.fun
    exception_code = args.exc

    mbtcp_client = MbtcpClient(server_address, server_port)
    mbtcp_client.start_client(samples_num, function_code, exception_code)


if __name__ == '__main__':
    main()
