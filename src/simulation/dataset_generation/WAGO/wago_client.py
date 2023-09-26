import random
import time
from pymodbus.client import ModbusTcpClient

SERVER_HOST = "localhost"
SERVER_PORT = 502

client : ModbusTcpClient = ModbusTcpClient(SERVER_HOST, port=SERVER_PORT)

def read_data(data_type, address, a, num_elements=1):
    if a == 3: #Read Holding Registers (FC 03)
        result = client.read_holding_registers(address, num_elements, unit=0x01)
        if result.isError():
            print(f"Failed to read {data_type}. Error: {result}")
        else:
            print(f"{data_type} at address {address}: {result.registers}")

def write_multiple_data(data_type, address, data_to_write, a):       
    if a == 16: #Write Multiple Holding Register (FC 16)
        result = client.write_registers(address, data_to_write, unit=0x01)

    if result.isError():
        print(f"Failed to write {data_type}. Error: {result}")
    else:
        print(f"{data_type} to address {address}: {data_to_write}")
        

client.connect()

context_length = 3
sessions = 2
try:
    for i in range(sessions): 
        function_code = [3, 16, 3] 
        address = random.randint(0, 65534) #address range 0-65535
        #num_elements_toRead = random.randint(1, 123) # 1 - 125 number of registers 
        #num_elements_toWrite = random.randint(1, 123) # 1 - 123 number of registers
        num_elements = random.randint(1, 123)
        data_to_write = [random.randint(0, 65535) for _ in range(num_elements)]
         

        for i in range(context_length):
            function_code = function_code[i]
        
            if function_code == 3: 
                read_data("Holding Registers", address, 3, num_elements)
            
            elif function_code == 16: 
                write_multiple_data("Write Multiple Registers", address, data_to_write, 16)


except KeyboardInterrupt:
    print("Client stopped by user.")

finally:
    client.close()
