import argparse
import random
import traceback
from pymodbus.client import ModbusTcpClient
from invalid_function import CustomInvalidFunctionRequest

class MbtcpClient:

    def __init__(self, server_address: str, server_port: int):
        self._client = ModbusTcpClient(server_address, port=server_port)

    @staticmethod
    def generate_random_request(exception_code, function_code):

        if '1' in exception_code: #Illegal function code - ExceptionCode 0x01
            valid_functioncode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 15, 16, 20, 22, 23, 24, 43, 128]
            false_functioncode = random.choice([x for x in range(0, 254) if x not in valid_functioncode ])
            exception_fc = false_functioncode

            address = random.randint(0, 100)
            num_elements = random.randint(1, 3)
            print(f"E_FC: {exception_fc}, Elements: {num_elements}, Address: {address}")

        if '2' in exception_code: #Illegal data adress - ExceptionCode 0x02
            address = random.randint(102, 120) #works with num elements 1,2,3

            num_elements = random.randint(1, 3)
            print(f"Elements: {num_elements}, Address: {address}")
            exception_fc = 0

        if '3' in exception_code: #Illegal data value - ExceptionCode 0x03
            if '1' in function_code: 
                num_elements = random.randint(2001, 2040) #max of 2000 coils
            if '3' in function_code: 
                num_elements = random.randint(126, 130) #max of 125 registers
            if '15' in function_code:
                num_elements = random.randint(1969, 2040) #max of 1968 multiple coils
            if '16' in function_code:
                num_elements = random.randint(124, 130) #max of 123 multiple registers
            
            address = random.randint(0, 100)
            if ('5' in function_code) or ('6' in function_code): #applicable for 0x02 only/ MUST BE REVISED > should accept only ON or OFF
                #In FC 5: any value other than 0x0000 makes the bit True?!
                num_elements = 1
                address = random.randint(102, 150) 
               
            print(f"Elements: {num_elements}, Address: {address}")
            exception_fc = 0

        mult_data_to_write = [random.randint(0, 3) for _ in range(num_elements)]
        single_data_to_write = random.randint(0, 10)
        
        return address, num_elements, mult_data_to_write, single_data_to_write, exception_fc

    def read_data(self, data_type, address, a, num_elements):
        if a == 1:
            result = self._client.read_coils(address, num_elements, unit=0x01)
            if result.isError():
                print(f"Failed to read {data_type}. Error: {result}")
            else:
                print(f"{data_type} at address {address}: {result.bits[0]}")
        if a == 3:
            result = self._client.read_holding_registers(address, num_elements, unit=0x01)
            if result.isError():
                print(f"Failed to read {data_type}. Error: {result}")
            else:
                print(f"{data_type} at address {address}: {result.registers}")

    def write_single_data(self, data_type, address, single_data_to_write, a):
        if a == 5:
            print(f"dat: {single_data_to_write}")
            result = self._client.write_coil(address, single_data_to_write, unit=0x01)
            if result.isError():
                print(f"Failed to read {data_type}. Error: {result}")
            else:
                print(f"{data_type} at address {address}: {result}")
        if a == 6:
            result = self._client.write_register(address, single_data_to_write, unit=0x01)
            if result.isError():
                print(f"Failed to write {data_type}. Error: {result}")
            else:
                print(f"{data_type} to address {address}: {single_data_to_write}")
                
    def write_multiple_data(self, data_type, address, mult_data_to_write, a):
        if a == 15:
            result = self._client.write_coils(address, mult_data_to_write, unit=0x01)
            if result.isError():
                print(f"Failed to read {data_type}. Error: {result}")
            else:
                print(f"{data_type} at address {address}: {result}")
        if a == 16:
            result = self._client.write_registers(address, mult_data_to_write, unit=0x01)
            if result.isError():
                print(f"Failed to write {data_type}. Error: {result}")
            else:
                print(f"{data_type} to address {address}: {mult_data_to_write}")

    def start_client(self, samples_num: int, function_code: list, exception_code: list):
        self._client.connect()

        try:
            for _ in range(samples_num):

                address, num_elements, mult_data_to_write, single_data_to_write, exception_fc = self.generate_random_request(exception_code, function_code)
                if '1' in function_code and exception_fc == 0:
                    self.read_data("Read Single Coil", address, 1, num_elements)
                    
                if '3' in function_code and exception_fc == 0: 
                    self.read_data("Read Holding Registers", address, 3, num_elements)
                    
                if '5' in function_code and exception_fc == 0:
                    self.write_single_data("Write Single Coil", address, single_data_to_write, 5)
                    
                if '6' in function_code and exception_fc == 0:
                    self.write_single_data("Write Single Registers", address, single_data_to_write, 6)

                if '15' in function_code and exception_fc == 0: 
                    self.write_multiple_data("Write Multiple Coils", address, mult_data_to_write, 15)
                    
                if '16' in function_code and exception_fc == 0:  
                    self.write_multiple_data("Write Multiple Registers", address, mult_data_to_write, 16)
                
                else:
                    request = CustomInvalidFunctionRequest(exception_fc) #generates illegal function code exception
                    print(self._client.execute(request))

        except Exception as e:
            print(f"Error: {str(e)}")
            print(traceback.format_exc())
        finally:
            self._client.close()


def main():
    def list_of_strings(arg):
        return arg.split(',')
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip',  default="localhost", required=False)
    parser.add_argument('-p',  default=502,required=False)
    parser.add_argument('-num', default=1, required=False)
    parser.add_argument('-fun', type=list_of_strings, required=True)
    parser.add_argument('-exc', type=list_of_strings, required=True)
    args = parser.parse_args()

    server_address = args.ip
    server_port = int(args.p)
    samples_num = int(args.num) 
    function_code = args.fun
    exception_code = args.exc #1,2,3
    
    mbtcp_client = MbtcpClient(server_address, server_port)
    mbtcp_client.start_client(samples_num, function_code, exception_code)


if __name__ == '__main__':
    main()
