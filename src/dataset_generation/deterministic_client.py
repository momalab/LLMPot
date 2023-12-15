import argparse
import itertools
from mbtcp_requests import Mbtcp_Requests

class MbtcpClient:

    def __init__(self, server_address: str, server_port: int):
        self.mbtcp_requests = Mbtcp_Requests(server_address, server_port)

    @staticmethod
    def generate_request(sample, element, multiple_data_value, data):
        address = [x for x in range(0, 101)]
        num_elements = [z for z in range(1, 4)]
        boolean_value = 2
        single_data_to_write = [y for y in range(0, 10)] 
        values_combinations = itertools.product(range(multiple_data_value), repeat=num_elements[element])  
        coils_combinations = itertools.product(range(boolean_value), repeat=num_elements[element])          
        return address[sample], num_elements[element], single_data_to_write[data], values_combinations, coils_combinations
    
    def start_client(self, samples_num: int, single_data_value: int, multiple_data_value: int, max_elements: int, function_code: str):
        self.mbtcp_requests.connect_client()
        
        try:
            if (function_code == '1') or (function_code == '5'): 
                for element in range(1): #Explicitly for read/write single coil
                    for sample in range(samples_num):
                        address, num_elements, single_data_to_write, values_combinations, coils_combinations = self.generate_request(sample, element, multiple_data_value, data=1)      
                        for coil in range(2):
                            value_to_write = [z for z in [True, False]]
                            self.mbtcp_requests.read_data("Read Single Coil", address, 1, num_elements=1)
                            self.mbtcp_requests.write_single_data("Write Single Coil", address, single_data_to_write, 5, value_to_write[coil])
                
            if (function_code == '3') or (function_code == '6'):
                for element in range(1): #Explicitly for read/write single register
                    for sample in range(samples_num):
                        for data in range(single_data_value):
                            address, num_elements, single_data_to_write, values_combinations, coils_combinations = self.generate_request(sample, element, multiple_data_value, data)      
                            self.mbtcp_requestsread_data("Read Single Registers", address, 3, num_elements=1)
                            self.mbtcp_requestswrite_single_data("Write Single Registers", address, single_data_to_write, 6, value_to_write=0)
                        self.mbtcp_requests.read_data("Read Single Registers", address, 3, num_elements=1)
                
            if function_code == '16':
                for element in range(max_elements): #Covers 1, 2, and 3 registers requests
                    for sample in range(samples_num): 
                        address, num_elements, single_data_to_write, values_combinations, coils_combinations = self.generate_request(sample, element, multiple_data_value, data=1)      
                        for values_to_write in values_combinations:
                            self.mbtcp_requests.read_data("Read Multiple Registers", address, 3, num_elements)
                            self.mbtcp_requests.write_multiple_data("Write Multiple Registers", address, values_to_write, 16)
                        self.mbtcp_requests.read_data("Read Multiple Registers", address, 3, num_elements)

            if function_code == '15':
                for element in range(max_elements): #Covers single, 2, and 3 coils requests
                    for sample in range(samples_num):
                        address, num_elements, single_data_to_write, values_combinations, coils_combinations = self.generate_request(sample, element, multiple_data_value, data=1)      
                        for coil_value in coils_combinations:
                            self.mbtcp_requests.read_data("Read Multiple Coils", address, 1, num_elements)
                            self.mbtcp_requests.write_multiple_data("Write Multiple Coils", address, coil_value, 15)

        except KeyboardInterrupt:
            print("Client stopped by user.")
        finally:
            self.mbtcp_requests.close_client()

def main():
    def list_of_strings(arg):
        return arg.split(',')
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="localhost", required=False)
    parser.add_argument('-p', default=502, required=False)
    parser.add_argument('-num', default=100, required=False) 
    parser.add_argument('-dat', default=10, required=False)
    parser.add_argument('-mul', default=3, required=False)
    parser.add_argument('-elem', default=3, required=False)
    parser.add_argument('-fun', default='15', required=False) #example: -fun 1,3,etc change type to list #OR for single test default='16' and False and type int
    args = parser.parse_args()

    server_address = args.ip
    server_port = int(args.p)
    samples_num = int(args.num) #regisers 0 to 99 > in the server keep it 103 because we add elements
    single_data_value = int(args.dat) #values 0 to 9
    multiple_data_value = int(args.mul) #values 0 to 2 > restrict the data in multiple registers
    max_elements = int(args.elem) #max 3 registers per packet
    function_code = args.fun #example: -fun 1,3
    
    mbtcp_client = MbtcpClient(server_address, server_port)
    mbtcp_client.start_client(samples_num, single_data_value, multiple_data_value, max_elements, function_code)

if __name__ == '__main__':
    main()