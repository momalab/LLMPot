import argparse
import itertools
from pymodbus.client import ModbusTcpClient

class MbtcpClient:

    def __init__(self, server_address: str, server_port: int):
        self._client = ModbusTcpClient(server_address, port=server_port)

    @staticmethod
    def generate_request(sample, element, multiple_data_value, data):
        address = [x for x in range(0, 101)]
        num_elements = [z for z in range(1, 4)]
        boolean_value = 2
        single_data_to_write = [y for y in range(0, 10)] 
        values_combinations = itertools.product(range(multiple_data_value), repeat=num_elements[element])  
        coils_combinations = itertools.product(range(boolean_value), repeat=num_elements[element])          
        return address[sample], num_elements[element], single_data_to_write[data], values_combinations, coils_combinations
    
    def read_data(self, data_type, address, a, num_elements):
        if a == 1:
            result = self._client.read_coils(address, num_elements, unit=0x01)
            if result.isError():
                print(f"Failed to read {data_type}. Error: {result.bits[0]}")
            else:
                print(f"{data_type} at address {address}: {result},{result.bits[0]}")
        if a == 3:
            result = self._client.read_holding_registers(address, num_elements, unit=0x01)
            if result.isError():
                print(f"Failed to read {data_type}. Error: {result}")
            else:
                print(f"{data_type} at address {address}: {result.registers}")

    def write_single_data(self, data_type, address, single_data_to_write, a, value_to_write):
        if a == 5:
            result = self._client.write_coil(address, value_to_write, unit=0x01)
            if result.isError():
                print(f"Failed to write {data_type}. Error: {result.bits[0]}")
            else:
                print(f"{data_type} to address {address}: {value_to_write}")
        if a == 6:
            result = self._client.write_register(address, single_data_to_write, unit=0x01)
            if result.isError():
                print(f"Failed to write {data_type}. Error: {result}")
            else:
                print(f"{data_type} to address {address}: {single_data_to_write}")
                
    def write_multiple_data(self, data_type, address, data_to_write, a):
        if a == 15:
            result = self._client.write_coils(address, data_to_write, unit=0x01)
            if result.isError():
                print(f"Failed to write {data_type}. Error: {result.bits[0]}")
            else:
                print(f"{data_type} to address {address}: {data_to_write}")
        if a == 16:
            result = self._client.write_registers(address, data_to_write, unit=0x01)
            if result.isError():
                print(f"Failed to write {data_type}. Error: {result}")
            else:
                print(f"{data_type} to address {address}: {data_to_write}")

    def start_client(self, samples_num: int, single_data_value: int, multiple_data_value: int, max_elements: int, function_code: list):
        self._client.connect()
        
        try:
            if '1' in function_code: 
                for element in range(1):
                    for sample in range(samples_num):
                        address, num_elements, single_data_to_write, values_combinations, coils_combinations = self.generate_request(sample, element, multiple_data_value, data=1)      
                        for coil in range(2):
                            value_to_write = [z for z in [True, False]]
                            self.read_data("Read Single Coil", address, 1, num_elements=1)
                            self.write_single_data("Write Single Coil", address, single_data_to_write, 5, value_to_write[coil])
                
            if ('3' in function_code) or ('6' in function_code):
                for element in range(1):
                    for sample in range(samples_num):
                        for data in range(single_data_value):
                            address, num_elements, single_data_to_write, values_combinations, coils_combinations = self.generate_request(sample, element, multiple_data_value, data)      
                            self.read_data("Read Single Registers", address, 3, num_elements=1)
                            self.write_single_data("Write Single Registers", address, single_data_to_write, 6, value_to_write=0)
                        self.read_data("Read Single Registers", address, 3, num_elements=1)
                
            if '16' in function_code:
                for element in range(max_elements): 
                    for sample in range(samples_num): 
                        address, num_elements, single_data_to_write, values_combinations, coils_combinations = self.generate_request(sample, element, multiple_data_value, data=1)      
                        for values_to_write in values_combinations:
                            self.read_data("Read Multiple Registers", address, 3, num_elements)
                            self.write_multiple_data("Write Multiple Registers", address, values_to_write, 16)
                        self.read_data("Read Multiple Registers", address, 3, num_elements)

            if '15' in function_code:
                for element in range(max_elements): 
                    for sample in range(samples_num):
                        address, num_elements, single_data_to_write, values_combinations, coils_combinations = self.generate_request(sample, element, multiple_data_value, data=1)      
                        for coil_value in coils_combinations:
                            self.read_data("Read Multiple Coils", address, 1, num_elements)
                            self.write_multiple_data("Write Multiple Coils", address, coil_value, 15)

        except KeyboardInterrupt:
            print("Client stopped by user.")
        finally:
            self._client.close()

def main():
    def list_of_strings(arg):
        return arg.split(',')
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="localhost", required=False)
    parser.add_argument('-p', default=502, required=False)
    parser.add_argument('-num', default=100, required=True)
    parser.add_argument('-dat', default=10, required=True)
    parser.add_argument('-mul', default=3, required=True)
    parser.add_argument('-elem', default=3, required=True)
    parser.add_argument('-fun', type=list_of_strings, required=True)
    args = parser.parse_args()

    server_address = args.ip
    server_port = int(args.p)
    samples_num = int(args.num) #regisers 0 to 99 > in the server keep it 103 because we add elements
    single_data_value = int(args.dat) #values 0 to 9
    multiple_data_value = int(args.mul) #values 0 to 2 > restrict the data in multiple registers
    max_elements = int(args.elem) #max 3 registers per packet
    function_code = args.fun
    print(f"fun: {function_code}")
    
    mbtcp_client = MbtcpClient(server_address, server_port)
    mbtcp_client.start_client(samples_num, single_data_value, multiple_data_value, max_elements, function_code)

if __name__ == '__main__':
    main()