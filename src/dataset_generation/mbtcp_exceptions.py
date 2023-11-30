import argparse
import random
import traceback
from pymodbus.client import ModbusTcpClient
from invalid_function import CustomInvalidFunctionRequest

class MbtcpClient:
    """
    The valid range for the starting address of holding resisters is from 0 to 65,535
    The maximum number of registers that can be read in a single request is 125 registers
    
    Read Holding Registers (FC03) Exception:
    - Modbus FC: 0x83
    - Exception code: 0x01 or 0x02

    Write Multiple Registers (FC16) Exception:
    - Modbus FC: 0x90
    - Exception code: 0x01 or 0x02
    """
    def __init__(self, server_address: str, server_port: int):
        self._client = ModbusTcpClient(server_address, port=server_port)

    @staticmethod
    def generate_random_request(ec):
        if ec == 1: #Illegal Function code - ExceptionCode 0x01
            valid_functioncode = [1, 2, 3, 4, 5, 6, 8, 11, 15, 16, 22, 23, 24, 43] 
            #FC08 tests the communication system between client and server or for checking various internal error states within the server.
            #FC24
            #FC43 (Read Device Identification) allows remote clients to read the identification and additional information describing the slave.
            false_functioncode = random.choice([x for x in range(0, 254) if x not in valid_functioncode ])
            # hex_fc = hex(false_functioncode)
            # exception_fc = hex_fc[2:] #to remove '0x'
            exception_fc = false_functioncode
            address = random.randint(0, 64)
            num_elements = random.randint(1, 10)
            print(f"E_FC: {exception_fc}, Elements: {num_elements}, Address: {address}")

        elif ec == 2: #Illegal data adress - ExceptionCode 0x02
            address = random.randint(90, 120)
            num_elements = random.randint(1, 10)
            print(f"Elements: {num_elements}, Address: {address}")
            exception_fc = 0

        elif ec == 3: #Illegal data value - ExceptionCode 0x03
            num_elements = random.randint(124, 127) #nithing more than 127 number of elements will be passed
            address = random.randint(0, 64)
            print(f"Elements: {num_elements}, Address: {address}")
            exception_fc = 0

        data_to_write = [random.randint(0, 65535) for _ in range(num_elements)]
        return address, num_elements, data_to_write, exception_fc

    def read_data(self, data_type, address, num_elements=1):
        result = self._client.read_holding_registers(address, num_elements, unit=0x01)
        if result.isError():
            print(f"Failed to read {data_type}. Error: {result}")
        else:
            print(f"{data_type} at address {address}: {result.registers}")

    def write_multiple_data(self, data_type, address, data_to_write):
        result = self._client.write_registers(address, data_to_write, unit=0x00)
        if result.isError():
            print(f"Failed to write {data_type}. Error: {result}")
        else:
            print(f"{data_type} to address {address}: {data_to_write}")

    def start_client(self, samples_num: int):
        self._client.connect()

        try:
            for _ in range(samples_num):
                function_code = random.choice([3, 16])
                exception_code = random.choice([1, 2, 3])
                print(f"EC: {exception_code}, FC: {function_code}")
                address, num_elements, data_to_write, exception_fc = self.generate_random_request(exception_code)

                if function_code == 3 and exception_fc == 0: 
                    self.read_data("Holding Registers", address, num_elements)
                elif function_code == 16 and exception_fc == 0:  
                    self.write_multiple_data("Write Multiple Registers", address, data_to_write)
                else:
                    request = CustomInvalidFunctionRequest(exception_fc) 
                    print(self._client.execute(request))

        except Exception as e:
            print(f"Error: {str(e)}")
            print(traceback.format_exc())
        finally:
            self._client.close()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip',  default="localhost", required=False)
    parser.add_argument('-p',  default=502,required=False)
    parser.add_argument('-num', default=1, required=False)
    args = parser.parse_args()

    server_address = args.ip
    server_port = int(args.p)
    samples_num = int(args.num) * 1000

    mbtcp_client = MbtcpClient(server_address, server_port)
    mbtcp_client.start_client(samples_num)


if __name__ == '__main__':
    main()
