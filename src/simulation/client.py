from pymodbus.client import ModbusTcpClient
import random

SERVER_HOST = "localhost"
SERVER_PORT = 5020

client = ModbusTcpClient(SERVER_HOST, port=SERVER_PORT)

def generate_random_request():
    address = random.randint(0, 99)
    num_elements = random.randint(1, 10)
    return address, num_elements

def read_data(data_type, address, num_elements):
    result = client.read_holding_registers(address, num_elements, unit=0x01)
    
    #num_registers = result.registers
    #print("lenghth of registers in response is:", len(num_registers))
    #print("lenghth of registers in request is:", num_elements)
    #if  num_elements == len(num_registers):
    #    print("Response is correct")
    #else:
    #    print("Response is not correct")

    if result.isError():
        print(f"Failed to read {data_type}. Error: {result}")
    else:
        print(f"{data_type} at address {address}: {result.registers}")
    
client.connect()

try:
    
    while True:
        address, num_elements = generate_random_request()
        read_data("Holding Registers", address, num_elements)
        
        # address_to_write = 10
        # data_to_write = [100, 200, 300, 400]
        # response = client.write_registers(address_to_write, data_to_write, unit=0x01)
        # if response.isError():
        #     print(f"Failed to write data. Error: {response}")
        #
        # read_data("Holding Registers", address=0x10, num_elements=5)

except KeyboardInterrupt:
    print("Client stopped by user.")

finally:
    client.close()
