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
    
    def read_data(self, data_type, address, num_elements):
        result = self._client.read_holding_registers(address, num_elements, unit=0x01)
        if result.isError():
            print(f"Failed to read {data_type}. Error: {result}")
        else:
            print(f"{data_type} at address {address}: {result.registers}")

    def write_single_data(self, data_type, address, single_data_to_write):
        result = self._client.write_register(address, single_data_to_write, unit=0x01)
        if result.isError():
            print(f"Failed to write {data_type}. Error: {result}")
        else:
            print(f"{data_type} to address {address}: {single_data_to_write}")

    def start_client(self, samples_num: int, data_value: int):
        self._client.connect()
        
        try:
            for sample in range(samples_num):

                for data in range(data_value):
                    address, num_elements, single_data_to_write = self.generate_request(sample, data)      

                    self.read_data("Read holding Registers", address, num_elements)
                    self.write_single_data("Write Multiple Registers", address, single_data_to_write)
                    
                self.read_data("Read holding Registers", address, num_elements)

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
    samples_num = int(args.num) #default 99 (registers 0 to 98 included)
    data_value = int(args.dat) #default 10

    mbtcp_client = MbtcpClient(server_address, server_port)
    mbtcp_client.start_client(samples_num, data_value)

if __name__ == '__main__':
    main()