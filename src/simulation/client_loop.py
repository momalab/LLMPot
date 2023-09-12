import random
import time
from pymodbus.client import ModbusTcpClient
#from pyModbusTCP.client import ModbusClient

SERVER_HOST = "localhost"
SERVER_PORT = 5020


# Function to generate a random Modbus request
def generate_random_request():
    # Choose a random function code (3 for Read Holding Registers, 16 for Write Multiple Registers)
    function_code = random.choice([5]) #1, 3, 5, 6, 15, 16

    # Choose a random starting address (0 to 99)
    address = random.randint(0, 99)

    # Choose a random number of elements (1 to 10)
    num_elements = random.randint(1, 10)

    # Choose random data to write (only used when function code is 5 or 6)
    data_to_write = [random.randint(0, 65535) for _ in range(num_elements)]

    return function_code, address, num_elements, data_to_write


def read_data(data_type, address, num_elements=1, a=1):
    if a == 1: # Read Coils (FC 01)
        result = client.read_coils(address, num_elements, unit=0x01)
        if result.isError():
            print(f"Failed to read {data_type}. Error: {result}")
        else:
            print(f"{data_type} at address {address}: {result}")


    if a ==3: #Read Holding Registers (FC 03)
        result = client.read_holding_registers(address, num_elements, unit=0x01)
        if result.isError():
            print(f"Failed to read {data_type}. Error: {result}")
        else:
            print(f"{data_type} at address {address}: {result.registers}")


def write_data(data_type, address, data_to_write, a=1):
    if a == 5:
        result = client.write_coil(address, True)
    if a == 6:
        print(data_to_write)
        result = client.write_register(address, True)
    if a == 15:
        result = client.write_coils(address, data_to_write, unit=0x01)
    if a == 16:
        result = client.write_registers(address, data_to_write, unit=0x01)

    if result.isError():
        print(f"Failed to write {data_type}. Error: {result}")
    else:
        print(f"{data_type} to address {address}: {data_to_write}")
        
    


client = ModbusTcpClient(SERVER_HOST, port=SERVER_PORT)
#client = ModbusClient(SERVER_HOST, port=SERVER_PORT)

client.connect()

try:
    while True:
        function_code, address, num_elements, data_to_write = generate_random_request()

        # Read Coils (FC 01)
        if function_code == 1:
            read_data("Coils", address, num_elements, 1)

        # Read Holding Registers (FC 03)
        elif function_code == 3:
            read_data("Holding Registers", address, num_elements, 3)
        
        # Write Single Coil (FC 5)
        elif  function_code == 5:    
            write_data("Write Single Coil", address, data_to_write, 5)
        
        # Write Single Register (FC 6)
        elif function_code == 6:
            write_data("Write Single Register", address, data_to_write, 6)

        # Write Multiple Coils (FC 15)
        elif function_code == 15:
            write_data("Write Multiple Coils", address, data_to_write, 15)
        
        # Write Multiple Registers (FC 16)
        elif function_code == 16:
            write_data("Write Multiple Registers", address, data_to_write, 16)

        time.sleep(random.uniform(1, 5))

except KeyboardInterrupt:
    print("Client stopped by user.")

finally:
    client.close()
