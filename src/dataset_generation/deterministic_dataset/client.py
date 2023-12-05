import argparse
import random
from pymodbus.client import ModbusTcpClient

class MbtcpClient:

    def __init__(self, server_address: str, server_port: int):
        self._client = ModbusTcpClient(server_address, port=server_port)

    @staticmethod
    def generate_request(sample, data):
        address = [x for x in range(0, 101)]
        num_elements = 1
        single_data_to_write = [y for y in range(0, 10)] 
        return address[sample], num_elements, single_data_to_write[data]
    
    def read_data(self, data_type, address, a, num_elements):
        if a == 3:
            result = self._client.read_holding_registers(address, num_elements, unit=0x01)
            if result.isError():
                print(f"Failed to read {data_type}. Error: {result}")
            else:
                print(f"{data_type} at address {address}: {result.registers}")
        if a == 1:
            result = self._client.read_coils(address, num_elements, unit=0x01)
            if result.isError():
                print(f"Failed to read {data_type}. Error: {result.bits[0]}")
            else:
                print(f"{data_type} at address {address}: {result},{result.bits[0]}")

    def write_single_data(self, data_type, address, single_data_to_write, a, value_to_write):
        if a == 6:
            result = self._client.write_register(address, single_data_to_write, unit=0x01)
            if result.isError():
                print(f"Failed to write {data_type}. Error: {result}")
            else:
                print(f"{data_type} to address {address}: {single_data_to_write}")
        if a == 5:
            result = self._client.write_coil(address, value_to_write, unit=0x01)
            if result.isError():
                print(f"Failed to write {data_type}. Error: {result.bits[0]}")
            else:
                print(f"{data_type} to address {address}: {value_to_write}")

    def start_client(self, samples_num: int, data_value: int):
        self._client.connect()
        
        try:
            for sample in range(samples_num):
                for data in range(data_value):
                    address, num_elements, single_data_to_write = self.generate_request(sample, data)      
                    self.read_data("Read holding Registers", address, 3, num_elements)
                    self.write_single_data("Write Multiple Registers", address, single_data_to_write, 6, value_to_write=0)
                self.read_data("Read holding Registers", address, 3, num_elements)
                
                for coil in range(2): #On or Off / True or False
                    value_to_write = [z for z in [True, False]]
                    self.read_data("Read Coil", address, 1, num_elements)
                    self.write_single_data("Write Single Coil", address, single_data_to_write, 5, value_to_write[coil])
                
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
    args = parser.parse_args()

    server_address = args.ip
    server_port = int(args.p)
    samples_num = int(args.num) #default 100 (regisers 0 to 99) > in the server keep it 101
    data_value = int(args.dat) #default 10 (values 0 to 9)

    mbtcp_client = MbtcpClient(server_address, server_port)
    mbtcp_client.start_client(samples_num, data_value)

if __name__ == '__main__':
    main()