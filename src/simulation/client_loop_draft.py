import random
import time
from pymodbus.client import ModbusTcpClient

SERVER_HOST = "localhost"
SERVER_PORT = 502

client : ModbusTcpClient = ModbusTcpClient(SERVER_HOST, port=SERVER_PORT)

# Function to generate a random Modbus request
def generate_random_request():

    function_code = random.choice([3]) #1, 3, 5, 15, 16 #Note something is wrong with FC 06

    # random starting address (0 to 99)
    address = random.randint(0, 99)

    # random number of registers/coils (1 to 10)
    num_elements = random.randint(1, 10)

    # random data to write (only in FC 15 and 16)
    data_to_write = [random.randint(0, 65535) for _ in range(num_elements)]

    # random data to write (only in FC 5 and 6)
    single_data_to_write = [random.randint(0, 65535)]

    return function_code, address, num_elements, data_to_write, single_data_to_write


def read_data(data_type, address, a, num_elements=1):
    if a == 1: #Read Coils (FC 01)
        result = client.read_coils(address, num_elements, unit=0x01)
        if result.isError():
            print(f"Failed to read {data_type}. Error: {result}")
        else:
            print(f"{data_type} at address {address}: {result}")

    if a == 3: #Read Holding Registers (FC 03)
        result = client.read_holding_registers(address, num_elements, unit=0x01)
        if result.isError():
            print(f"Failed to read {data_type}. Error: {result}")
        else:
            print(f"{data_type} at address {address}: {result.registers}")


def write_single_data(data_type, address, single_data_to_write, a):
    if a == 5: #Write Single Coil (FC 05)
        result = client.write_coil(address, single_data_to_write, unit=0x01)
    if a == 6: #Write Single Holding Register (FC 06)
        result = client.write_register(address, single_data_to_write, unit=0x01)

    if result.isError():
        print(f"Failed to write {data_type}. Error: {result}")
    else:
        print(f"{data_type} to address {address}: {single_data_to_write}")


def write_multiple_data(data_type, address, data_to_write, a):       
    if a == 15: #Write Multiple Coils (FC 15)
        result = client.write_coils(address, data_to_write, unit=0x01)
    if a == 16: #Write Multiple Holding Register (FC 16)
        result = client.write_registers(address, data_to_write, unit=0x01)

    if result.isError():
        print(f"Failed to write {data_type}. Error: {result}")
    else:
        print(f"{data_type} to address {address}: {data_to_write}")
        

client.connect()

try:
    while True:
        function_code, address, num_elements, data_to_write, single_data_to_write = generate_random_request()
        
        if function_code == 1: # Read Coils (FC 01)
            read_data("Coils", address, 1, num_elements)
        
        elif function_code == 3: # Read Holding Registers (FC 03)
            read_data("Holding Registers", address, 3, num_elements)
        
        
        elif  function_code == 5: # Write Single Coil (FC 5)    
            write_single_data("Write Single Coil", address, single_data_to_write, 5)
        
        elif function_code == 6: # Write Single Register (FC 6)
            write_single_data("Write Single Register", address, single_data_to_write, 6)

        
        elif function_code == 15: # Write Multiple Coils (FC 15)
            write_multiple_data("Write Multiple Coils", address, data_to_write, 15)
        
        elif function_code == 16: # Write Multiple Registers (FC 16)
            write_multiple_data("Write Multiple Registers", address, data_to_write, 16)

        #time.sleep(random.uniform(1, 5))

except KeyboardInterrupt:
    print("Client stopped by user.")

finally:
    client.close()
