import random
import logging
import time
import traceback
from unittest import skip
from pymodbus.constants import Endian
from pymodbus.client import ModbusTcpClient
from pymodbus.payload import BinaryPayloadBuilder, BinaryPayloadDecoder

import pdb

SERVER_HOST = "10.224.33.30"
# SERVER_HOST = "localhost"

client: ModbusTcpClient = ModbusTcpClient(SERVER_HOST, 502)

random.seed(1111)

# def read_ascii_from_registers(client, start_address, num_registers):
#     response = client.read_holding_registers(start_address, num_registers)
#     if response.isError():
#         print("Error reading registers")
#         return None
#     # Combine register values and convert to ASCII
#     data = ''.join(chr((value >> 8) & 0xFF) + chr(value & 0xFF) for value in response.registers)
#     return data.strip()


def generate_random_request():
    function_code = random.choice([1, 2, 3, 4, 5, 6, 15, 16])
    address = random.randint(0, 63)
    num_elements = min(random.randint(1, 10), 64 - address)
    data_to_write = [random.randint(0, 20) for _ in range(num_elements)]
    single_data_to_write = random.randint(0, 20)
    return function_code, address, num_elements, data_to_write, single_data_to_write


def read_data(data_type, address, func_code, num_elements):
    if func_code == 1:
        result = client.read_coils(address, num_elements, unit=0x01)
        if result.isError():
            print(f"Failed to read {num_elements} from {data_type} at {address} . Error: {result}")
        else:
            print(f"{data_type} at address {address}: {result.bits[0]}")

    elif func_code == 2:
        result = client.read_discrete_inputs(address, num_elements, unit=0x01)
        if result.isError():
            print(f"Failed to read {num_elements} from {data_type} at {address} . Error: {result}")
        else:
            print(f"{data_type} at address {address}: {result.bits[0]}")

    elif func_code == 3:
        result = client.read_holding_registers(address, num_elements, unit=0x01)
        if result.isError():
            print(f"Failed to read {num_elements} from {data_type} at {address} . Error: {result}")
        else:
            decoder = BinaryPayloadDecoder.fromRegisters(result.registers, Endian.BIG, wordorder=Endian.LITTLE)
            print("read_holding_registers:" +str(decoder.decode_32bit_int()))
            print(f"{data_type} at address {address}: {result.registers}")

    elif func_code == 4:
        result = client.read_input_registers(address, num_elements, unit=0x01)
        if result.isError():
            print(f"Failed to read {num_elements} from {data_type} at {address} . Error: {result}")
        else:
            decoder = BinaryPayloadDecoder.fromRegisters(result.registers, Endian.BIG, wordorder=Endian.LITTLE)
            print("read_holding_registers:" +str(decoder.decode_32bit_float()))
            print(f"{data_type} at address {address}: {result.registers}")
    return result


def write_single_data(data_type, address, single_data_to_write, func_code):
    if func_code == 5:
        result = client.write_coil(address, single_data_to_write, unit=0x01)
    if func_code == 6:
        result = client.write_register(address, single_data_to_write, unit=0x01)
    if result.isError():
        print(f"Failed to write {num_elements} from {data_type} at {address} . Error: {result}")
    else:
        print(f"{data_type} to address {address}: {single_data_to_write}")


def write_multiple_data(data_type, address, data_to_write, func_code):
    if func_code == 15:
        result = client.write_coils(address, data_to_write, unit=0x01)
    if func_code == 16:
        builder = BinaryPayloadBuilder(byteorder=Endian.BIG, wordorder=Endian.LITTLE)
        input_x = data_to_write
        builder.add_32bit_float(float(input_x))
        inputs = builder.build()
<<<<<<< Updated upstream
        result = client.write_registers(address, inputs, unit=0x01)
=======
        result = client.write_registers(address, inputs, unit=0x01, skip_encode=True)
        # result = client.write_registers(address, data_to_write, unit=0x01)
>>>>>>> Stashed changes
    if result.isError():
        print(f"Failed to write {num_elements} from {data_type} at {address} . Error: {result}")
    else:
        print(f"{data_type} to address {address}: {data_to_write}")


client.connect()

logging.basicConfig()
log = logging.getLogger()
log.setLevel(logging.DEBUG)

try:
<<<<<<< Updated upstream
    function_code, address, num_elements, data_to_write, single_data_to_write = 16, 0, 2, [-1], 1
=======
    function_code, address, num_elements, data_to_write, single_data_to_write = 16, 0, 2, -10, 1

    if function_code == 1:  # Read Coils (FC 01)
        read_data("Coils", address, 1, num_elements)

    elif function_code == 2:  # Read Discrete Inputs (FC 02)
        res = read_data("Discrete Inputs", address, 2, num_elements)

    elif function_code == 3:  # Read Holding Registers (FC 03)
        res = read_data("Holding Registers", address, 3, num_elements)
        # device_model = read_ascii_from_registers(client, address, num_elements)
        # print(f"Device Model: {device_model}")

    elif function_code == 4:  # Read Input Registers (FC 04)
        res = read_data("Input Registers", address, 4, num_elements)

    elif function_code == 5:  # Write Single Coil (FC 5)
        write_single_data("Single Coil", address, single_data_to_write, 5)

    elif function_code == 6:  # Write Single Register (FC 6)
        # pdb.set_trace()
        write_single_data("Single Register", address, single_data_to_write, 6)

    elif function_code == 15:  # Write Multiple Coils (FC 15)
        write_multiple_data("Multiple Coils", address, data_to_write, 15)

    elif function_code == 16:  # Write Multiple Registers (FC 16)
        write_multiple_data("Multiple Registers", address, data_to_write, 16)

    function_code, address, num_elements, data_to_write, single_data_to_write = 4, 0, 2, -10, 1
>>>>>>> Stashed changes

    if function_code == 1:  # Read Coils (FC 01)
        read_data("Coils", address, 1, num_elements)

    elif function_code == 2:  # Read Discrete Inputs (FC 02)
        res = read_data("Discrete Inputs", address, 2, num_elements)

    elif function_code == 3:  # Read Holding Registers (FC 03)
        res = read_data("Holding Registers", address, 3, num_elements)
        # device_model = read_ascii_from_registers(client, address, num_elements)
        # print(f"Device Model: {device_model}")

    elif function_code == 4:  # Read Input Registers (FC 04)
        res = read_data("Input Registers", address, 4, num_elements)

    elif function_code == 5:  # Write Single Coil (FC 5)
        write_single_data("Single Coil", address, single_data_to_write, 5)

    elif function_code == 6:  # Write Single Register (FC 6)
        # pdb.set_trace()
        write_single_data("Single Register", address, single_data_to_write, 6)

    elif function_code == 15:  # Write Multiple Coils (FC 15)
        write_multiple_data("Multiple Coils", address, data_to_write, 15)

    elif function_code == 16:  # Write Multiple Registers (FC 16)
        write_multiple_data("Multiple Registers", address, data_to_write, 16)
except:
    pass
finally:
    client.close()
