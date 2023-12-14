import argparse
import random
import traceback
from pymodbus.client import ModbusTcpClient
from invalid_function import CustomInvalidFunctionRequest

class MbtcpClient:
    def __init__(self, server_address: str, server_port: int):
        self._client = ModbusTcpClient(server_address, port=server_port)


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
            for ex in range(len(exception_code)):
                for fc in range(len(function_code)):
                    for _ in range(samples_num):
                        
                        print(f"Exc {ex}: {exception_code[ex]}")
                        
                        if exception_code[ex] == '1':
                            valid_functioncode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 15, 16, 17, 20, 21, 22, 23, 24, 43, 128]
                            false_functioncode = random.choice([x for x in range(0, 254) if x not in valid_functioncode])
                            address = random.randint(0, 100)
                            num_elements = random.randint(1, 3)
                            print(f"E_FC: {false_functioncode}, Elements: {num_elements}, Address: {address}")
                            
                            request = CustomInvalidFunctionRequest(false_functioncode)
                            print(self._client.execute(request))
                        
                        elif exception_code[ex] == '2':
                            address = random.randint(102, 120)
                            num_elements = random.randint(1, 3)
                            mult_data_to_write = [random.randint(0, 3) for _ in range(num_elements)]
                            single_data_to_write = random.randint(0, 10)
                            print(f"Elements: {num_elements}, Address: {address}")
                            
                            print(f"FC: {function_code[fc]}")
                            if function_code[fc] == '1':
                                self.read_data("Read Coil", address, 1, num_elements)
                            elif function_code[fc] == '3':
                                self.read_data("Read Holding Registers", address, 3, num_elements)
                            elif function_code[fc] == '5':
                                self.write_single_data("Write Single Coil", address, single_data_to_write, 5)
                            elif function_code[fc] == '6':
                                self.write_single_data("Write Single Register", address, single_data_to_write, 6)
                            elif function_code[fc] == '15':
                                self.write_multiple_data("Write Multiple Coils", address, mult_data_to_write, 15)
                            elif function_code[fc] == '16':
                                self.write_multiple_data("Write Multiple Registers", address, mult_data_to_write, 16)
                        
                        elif exception_code[ex] == '3': #Note nothing happens for FC 5 nd 6 here
                            address = random.randint(0, 100)

                            print(f"FC: {function_code[fc]}")
                            if function_code[fc] == '1':
                                num_elements = random.randint(2001, 2040) #max of 2000 coils
                                print(f"Elements: {num_elements}, Address: {address}")
                                self.read_data("Read Coil", address, 1, num_elements)
                            
                            elif function_code[fc] == '3':
                                num_elements = random.randint(126, 130) #max of 125 registers
                                print(f"Elements: {num_elements}, Address: {address}")
                                self.read_data("Read Holding Registers", address, 3, num_elements)
                            
                            elif function_code[fc] == '15':
                                num_elements = random.randint(1969, 2040) #max of 1968 multiple coils
                                mult_data_to_write = [random.randint(0, 3) for _ in range(num_elements)]
                                print(f"Elements: {num_elements}, Address: {address}")
                                self.write_multiple_data("Write Multiple Coils", address, mult_data_to_write, 15)
                            
                            elif function_code[fc] == '16':
                                num_elements = random.randint(124, 127) #max of 123 multiple registers/ after 127 it gives struct.error
                                mult_data_to_write = [random.randint(0, 3) for _ in range(num_elements)]
                                print(f"Elements: {num_elements}, Address: {address}")
                                self.write_multiple_data("Write Multiple Registers", address, mult_data_to_write, 16)
                    
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
    parser.add_argument('-num', default=100, required=False)
    parser.add_argument('-fun', type=list_of_strings, required=True) #example: -fun 1,3,etc #OR for single test default=['16'] and False 
    parser.add_argument('-exc', type=list_of_strings, required=True) #example: -exc 1,2,3   #OR for single test default=['3'] and False

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
