import time
import random
import argparse
from pymodbus.client import ModbusTcpClient
from invalid_function import Mbtcp_CustomInvalidFunctionRequest


def read_holding_register(client: ModbusTcpClient, address):
    current_water_level = client.read_holding_registers(address, count=1, unit=0x01)
    print(f"Current water_level at {address} is: {current_water_level.registers}, {current_water_level}")
    return current_water_level


def write_holding_register(client: ModbusTcpClient, water_level, address):
    print(f"Setting water_level to {water_level}L")
    water_level_update = client.write_register(address, value=water_level, unit=0x01)
    print(f"water_level at {address} updated to: {water_level_update}")
    return water_level_update


def read_discrete_input(client: ModbusTcpClient, address):
    valve_status = client.read_discrete_inputs(address, count=1, unit=0x01)
    if valve_status.isError():
        print(f"Current valve_status at {address} is: {valve_status}")
    else:
        print(f"Current valve_status at {address} is: {valve_status.bits[0]}")
    return valve_status


def write_coil(client: ModbusTcpClient, valve_action, address):
    print(f"Switching valve_status to: {valve_action}")
    valve_update = client.write_coil(address, value=valve_action, unit=0x01)
    if valve_update.isError():
        print(f"valve_status at {address} updated to: {valve_update}")
    else:
        print(f"valve_status at {address} updated to: {valve_update.bits[0]}")
    return valve_update


def illegal_function(client):
    valid_function_code = [0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 15, 16, 17, 20, 21, 22, 23, 24, 43, 128]
    false_function_code = random.choice([x for x in range(0, 254) if x not in valid_function_code])
    print(f"False FC is: {false_function_code}")
    request = Mbtcp_CustomInvalidFunctionRequest(false_function_code)
    return client.execute(request)


def start_client(server_address, server_port, samples_num):

    client: ModbusTcpClient = ModbusTcpClient(server_address, port=server_port)
    client.connect()

    try:

        for i in range(int(samples_num/7)):
            water_level = random.randrange(0, 100)
            valve_action = random.choice([True, False])
            functions = [(read_holding_register, [client, 0]), # water level sensor
                         (read_discrete_input, [client, 0]), # outflow valve
                         (read_discrete_input, [client, 1]), # inflow valve
                         (write_holding_register, [client, water_level, 0]),
                         (write_coil, [client, valve_action, 0])]

            water_level = random.randrange(0, 100)
            valve_action = random.choice([True, False])

            coil_addresses = random.randint(0, 50)
            di_addresses = random.randint(2, 50)
            hr_addresses = random.randint(2, 50)
            exception_function = [(read_holding_register, [client, hr_addresses]),
                                  (write_holding_register, [client, water_level, hr_addresses]),
                                  (read_discrete_input, [client, di_addresses]),
                                  (write_coil, [client, valve_action, coil_addresses])]

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
    parser.add_argument('-num', default=1204, required=False)
    args = parser.parse_args()

    server_address = args.ip
    server_port = int(args.p)
    samples_num = int(args.num)

    start_client(server_address, server_port, samples_num)


if __name__ == '__main__':
    main()
