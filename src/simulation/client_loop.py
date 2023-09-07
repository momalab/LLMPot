import random
import time
from pymodbus.client import ModbusTcpClient

SERVER_HOST = "localhost"
SERVER_PORT = 5020


# Function to generate a random Modbus request
def generate_random_request():
    # Choose a random function code (3 for Read Holding Registers, 16 for Write Multiple Registers)
    function_code = random.choice([3, 16])

    # Choose a random starting address (0 to 99)
    address = random.randint(0, 99)

    # Choose a random number of elements (1 to 10)
    num_elements = random.randint(1, 10)

    # Choose random data to write (only used when function code is 16)
    data_to_write = [random.randint(0, 65535) for _ in range(num_elements)]

    return function_code, address, num_elements, data_to_write


def read_data(data_type, address, num_elements=1):
    result = client.read_holding_registers(address, num_elements, unit=0x01)
    if result.isError():
        print(f"Failed to read {data_type}. Error: {result}")
    else:
        print(f"{data_type} at address {address}: {result.registers}")


client = ModbusTcpClient(SERVER_HOST, port=SERVER_PORT)
client.connect()

try:
    while True:
        function_code, address, num_elements, data_to_write = generate_random_request()

        if function_code == 3:
            read_data("Holding Registers", address, num_elements)
        elif function_code == 16:
            response = client.write_registers(address, data_to_write, unit=0x01)
            if response.isError():
                print(f"Failed to write data. Error: {response}")
            else:
                print(f"Data written to address {address}: {data_to_write}")

        #time.sleep(random.uniform(1, 5))

except KeyboardInterrupt:
    print("Client stopped by user.")

finally:
    client.close()
