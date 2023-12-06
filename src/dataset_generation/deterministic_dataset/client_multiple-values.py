import argparse
import random
from pymodbus.client import ModbusTcpClient
import itertools

class MbtcpClient:

    def __init__(self, server_address: str, server_port: int):
        self._client = ModbusTcpClient(server_address, port=server_port)

    @staticmethod
    def generate_request(sample, element, data_value):
        address = [x for x in range(0, 100)]
        num_elements = [z for z in range(1, 4)]
        values_combinations = itertools.product(range(data_value), repeat=num_elements[element])            
        return address[sample], num_elements[element], values_combinations
    
    def read_data(self, data_type, address, a, num_elements):
        if a == 3:
            result = self._client.read_holding_registers(address, num_elements, unit=0x01)
            if result.isError():
                print(f"Failed to read {data_type}. Error: {result}")
            else:
                print(f"{data_type} at address {address}: {result.registers}")

    def write_multiple_data(self, data_type, address, data_to_write, a):
        if a == 16:
            result = self._client.write_registers(address, data_to_write, unit=0x01)
            if result.isError():
                print(f"Failed to write {data_type}. Error: {result}")
            else:
                print(f"{data_type} to address {address}: {data_to_write}")
                

    def start_client(self, samples_num: int, data_value: int, max_elements:int):
        self._client.connect()
        
        try:            
            for element in range(max_elements): 
                for sample in range(samples_num): 
                    address, num_elements, values_combinations = self.generate_request(sample, element, data_value)      
                    for values_to_write in values_combinations:
                        self.read_data("Read Multiple Registers", address, 3, num_elements)
                        self.write_multiple_data("Write Multiple Registers", address, values_to_write, 16)
                        
                    self.read_data("Read Multiple Registers", address, 3, num_elements)
                
        except KeyboardInterrupt:
            print("Client stopped by user.")
        finally:
            self._client.close()

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="localhost", required=False)
    parser.add_argument('-p', default=502, required=False)
    parser.add_argument('-num', default=1, required=True)
    parser.add_argument('-dat', default=1, required=True)
    parser.add_argument('-elem', default=1, required=True)
    args = parser.parse_args()

    server_address = args.ip
    server_port = int(args.p)
    samples_num = int(args.num) #default 100 (regisers 0 to 99) > in the server keep it 103 because we add elements
    data_value = int(args.dat) #default 3 (values 0 to 2) > restrict the data in multiple registers
    max_elements = int(args.elem) #max 3 

    mbtcp_client = MbtcpClient(server_address, server_port)
    mbtcp_client.start_client(samples_num, data_value, max_elements)

if __name__ == '__main__':
    main()