import random
import sys
from pymodbus.client import ModbusTcpClient

# 1: server address, 2: server port, 3: sample_num, 4: has_context

SERVER_ADDRESS = str(sys.argv[1])
SERVER_PORT = int(sys.argv[2])

client: ModbusTcpClient = ModbusTcpClient(SERVER_ADDRESS, port=SERVER_PORT)


def generate_random_request():
    function_code = random.choice([1, 3, 5, 15, 16]) # Note something is wrong with FC 06
    address = random.randint(0, 99)
    num_elements = random.randint(1, 10)
    data_to_write = [random.randint(0, 65535) for _ in range(num_elements)]
    single_data_to_write = [random.randint(0, 65535)]
    return function_code, address, num_elements, data_to_write, single_data_to_write

def read_data(data_type, address, a, num_elements=1):
    if a == 1: 
        result = client.read_coils(address, num_elements, unit=0x01)
        if result.isError():
            print(f"Failed to read {data_type}. Error: {result}")
        else:
            print(f"{data_type} at address {address}: {result}")
    if a == 3: 
        result = client.read_holding_registers(address, num_elements, unit=0x01)
        if result.isError():
            print(f"Failed to read {data_type}. Error: {result}")
        else:
            print(f"{data_type} at address {address}: {result.registers}")

def write_single_data(data_type, address, single_data_to_write, a):
    if a == 5: 
        result = client.write_coil(address, single_data_to_write, unit=0x01)
    if a == 6: 
        result = client.write_register(address, single_data_to_write, unit=0x01)
    if result.isError():
        print(f"Failed to write {data_type}. Error: {result}")
    else:
        print(f"{data_type} to address {address}: {single_data_to_write}")

def write_multiple_data(data_type, address, data_to_write, a):       
    if a == 15:
        result = client.write_coils(address, data_to_write, unit=0x01)
    if a == 16: 
        result = client.write_registers(address, data_to_write, unit=0x01)
    if result.isError():
        print(f"Failed to write {data_type}. Error: {result}")
    else:
        print(f"{data_type} to address {address}: {data_to_write}")


def start_client(samples_num: int, has_context: bool):
    client.connect()

    try:
        for _ in range(samples_num):

            if not has_context:
                function_code, address, num_elements, data_to_write, single_data_to_write = generate_random_request()

                if function_code == 1:  # Read Coils (FC 01)
                    read_data("Coils", address, 1, num_elements)

                elif function_code == 3:  # Read Holding Registers (FC 03)
                    read_data("Holding Registers", address, 3, num_elements)

                elif function_code == 5:  # Write Single Coil (FC 5)
                    write_single_data("Write Single Coil", address, single_data_to_write, 5)

                elif function_code == 6:  # Write Single Register (FC 6)
                    write_single_data("Write Single Register", address, single_data_to_write, 6)

                elif function_code == 15:  # Write Multiple Coils (FC 15)
                    write_multiple_data("Write Multiple Coils", address, data_to_write, 15)

                elif function_code == 16:  # Write Multiple Registers (FC 16)
                    write_multiple_data("Write Multiple Registers", address, data_to_write, 16)

            else:
                address = random.randint(0, 64)
                num_elements = random.randint(1, 10)
                data_to_write = [random.randint(0, 65535) for _ in range(num_elements)]
                function_code_context = [3, 16, 3]  # context scenario
                context_length = 3

                for j in range(context_length):
                    if function_code_context[j] == 3:
                        read_data("Read holding Registers", address, 3, num_elements)
                    elif function_code_context[j] == 16:
                        write_multiple_data("Write Multiple Registers", address, data_to_write, 16)

    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()


def main(argv: list[str]):
    samples_num = int(argv[3]) * 1000
    has_context = eval(argv[4])
    start_client(samples_num, has_context)


if __name__ == '__main__':
    main(sys.argv)
