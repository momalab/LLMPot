import os
import sys
import time
import random
import argparse
from tqdm import tqdm
from pymodbus.client import ModbusTcpClient

parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(parent_dir)

from invalid_function import CustomInvalidFunctionRequest

def read_input_register(client: ModbusTcpClient, address):
    current_valve_position = client.read_input_registers(address, count=1, unit=0x01)
    # print(f"Current valve_position at {address} is: {current_valve_position.registers}, {current_valve_position}")
    # print("--------------------------------")
    return current_valve_position

def read_holding_register(client: ModbusTcpClient, address):
    current_flow_rate = client.read_holding_registers(address, count=1, unit=0x01)
    # print(f"Current flow_rate at {address} is: {current_flow_rate.registers}L/min, {current_flow_rate}")
    # print("--------------------------------")
    return current_flow_rate


def write_holding_register(client: ModbusTcpClient, new_value, address):
    new_value_update = client.write_register(address, value=new_value, unit=0x01)
    # if (address == 0) or (address == 1):
    # print(f"Setting flow_rate to {new_value}L/min")
    # print(f"Flow_rate at {address} updated to: {new_value_update}")
    # if (address == 2) or (address == 3):
    #     print(f"Setting valve_position to {new_value}")
    #     print(f"Valve_position at {address} updated to: {new_value_update}")
    # print("--------------------------------")
    return new_value_update


def read_discrete_input(client: ModbusTcpClient, address):
    mixing_status = client.read_discrete_inputs(address, count=1, unit=0x01)
    # if mixing_status.isError():
    #     print(f"Current mixing_status at {address} is: {mixing_status}")
    # else:
    #     print(f"Current mixing_status at {address} is: {mixing_status.bits[0]}")
    # print("--------------------------------")
    return mixing_status


def write_coil(client: ModbusTcpClient, mixing_status, address):
    # print(f"Switching mixing_status to: {mixing_status}")
    mixing_status_update = client.write_coil(address, value=mixing_status, unit=0x01)
    # if mixing_status_update.isError():
    #     print(f"mixing_status at {address} updated to: {mixing_status_update}")
    # else:
    #     print(f"mixing_status at {address} updated to: {mixing_status_update.bits[0]}")
    # print("--------------------------------")
    return mixing_status_update


def illegal_function(client):
    valid_function_code = [0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 15, 16, 17, 20, 21, 22, 23, 24, 43, 128]
    false_function_code = random.choice([x for x in range(0, 254) if x not in valid_function_code])
    # print(f"False FC is: {false_function_code}")
    request = CustomInvalidFunctionRequest(false_function_code)
    return client.execute(request)


def start_client(server_address, server_port, samples_num):

    client: ModbusTcpClient = ModbusTcpClient(server_address, port=server_port)
    client.connect()

    try:

        for i in tqdm(range(int(samples_num/10))):

            flow_rate_a = random.randrange(0, 100)
            flow_rate_b = random.randrange(0, 100)
            mixing_status = random.choice([True, False])

            functions = [(read_discrete_input, [client, 0]), # mixing process
                         (read_holding_register, [client, 0]), # read flow_rate_a
                         (read_holding_register, [client, 1]), # read flow_rate_b
                         (read_input_register, [client, 0]), # read valve_a
                         (read_input_register, [client, 1]), # read valve_b
                         (write_holding_register, [client, flow_rate_a, 0]),
                         (write_holding_register, [client, flow_rate_b, 1]),
                         (write_coil, [client, mixing_status, 0])]

            flow_rate = random.randrange(0, 100)
            mixing_status = random.choice([True, False])

            ir_addresses = random.randint(2, 50)
            coil_addresses = random.randint(0, 50)
            di_addresses = random.randint(1, 50)
            hr_addresses = random.randint(2, 50)
            exception_function = [(read_holding_register, [client, hr_addresses]),
                                  (read_input_register, [client, ir_addresses]),
                                  (write_holding_register, [client, flow_rate, hr_addresses]),
                                  (read_discrete_input, [client, di_addresses]),
                                  (write_coil, [client, mixing_status, coil_addresses])]

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
    parser.add_argument('-num', default=10000, required=False)
    args = parser.parse_args()

    server_address = args.ip
    server_port = int(args.p)
    samples_num = int(args.num)

    start_client(server_address, server_port, samples_num)


if __name__ == '__main__':
    main()
