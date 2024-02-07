import time
import random
import argparse
from pymodbus.client import ModbusTcpClient
from invalid_function import CustomInvalidFunctionRequest


def read_holding_register(client: ModbusTcpClient, address):
    temperature_status = client.read_holding_registers(address, count=1, unit=0x01)
    print(f"Reading temp at {address} is: {temperature_status.registers}, {temperature_status}")
    return temperature_status


def write_holding_register(client: ModbusTcpClient, temp, address):
    print(f"Setting temperature to {temp}°C")
    temperature_update = client.write_register(address, value=temp, unit=0x01)
    print(f"Temp at {address} updated to: {temperature_update}")
    return temperature_update


def read_discrete_input(client: ModbusTcpClient, address):
    cooling_system_status = client.read_discrete_inputs(address, count=1, unit=0x01)
    if cooling_system_status.isError():
        print(f"Reading cooling system at {address} is: {cooling_system_status}")
    else:
        print(f"Reading cooling system at {address} is: {cooling_system_status.bits[0]}")
    return cooling_system_status


def write_coil(client: ModbusTcpClient, cool, address):
    print(f"Switching cooling system to: {cool}")
    cooling_update = client.write_coil(address, value=cool, unit=0x01)
    if cooling_update.isError():
        print(f"Cooling at {address} updated to: {cooling_update}")
    else:
        print(f"Cooling at {address} updated to: {cooling_update.bits[0]}")
    return cooling_update


valid_function_codes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 15, 16, 17, 20, 21, 22, 23, 24, 43, 128]
false_function_codes = [x for x in range(0, 254) if x not in valid_function_codes]
used_function_codes = set()


def select_unused_element():
    unused_elements = [el for el in false_function_codes if el not in used_function_codes]

    if not unused_elements:
        used_function_codes.clear()
        unused_elements = false_function_codes

    selected_element = random.choice(unused_elements)
    used_function_codes.add(selected_element)

    return selected_element


def illegal_function(client):
    request = CustomInvalidFunctionRequest(select_unused_element())
    return client.execute(request)


def start_client(server_address, server_port, samples_num, boundaries_num):

    client: ModbusTcpClient = ModbusTcpClient(server_address, port=server_port)
    client.connect()

    try:

        for sample in range(int(samples_num/10)):
            print(f"----- iteration: {sample} -----")
            temp = random.randrange(0, 50)
            cool = random.choice([True, False])

            functions = [(read_holding_register, [client, 0]),
                         (write_holding_register, [client, temp, 0]),
                         (read_discrete_input, [client, 0]),
                         (write_coil, [client, cool, 0])]

            temp = random.randrange(0, 50)
            cool = random.choice([True, False])

            random_midpoint = random.randrange(1, 48)
            coil_addresses = [0, random_midpoint, 49]

            random_midpoint = random.randrange(2, 48)
            di_addresses = [1, random_midpoint, 49]

            random_midpoint = random.randrange(3, 48)
            hr_addresses = [2, random_midpoint, 49]

            boundary = 0
            for boundary in range(boundaries_num):
                exception_function = [(read_holding_register, [client, hr_addresses[boundary]]),
                                    (write_holding_register, [client, temp, hr_addresses[boundary]]),
                                    (read_discrete_input, [client, di_addresses[boundary]]),
                                    (write_coil, [client, cool, coil_addresses[boundary]])]

                function, args = random.choice(exception_function)
                exceptions = [(illegal_function, [client]), (function, [*args])]
                functions.extend(exceptions)
                random.shuffle(functions)

            for function, args in functions:
                function(*args)
                if function.__name__ == write_holding_register.__name__:
                    time.sleep(0.3)

    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()


def main():

    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="localhost", required=False)
    parser.add_argument('-p', default=502, required=False)
    parser.add_argument('-num', default=2500, required=False)
    parser.add_argument('-bound', default=3, required=False)
    args = parser.parse_args()

    server_address = args.ip
    server_port = int(args.p)
    samples_num = int(args.num)
    boundaries_num = int(args.bound)

    start_client(server_address, server_port, samples_num, boundaries_num)


if __name__ == '__main__':
    main()
