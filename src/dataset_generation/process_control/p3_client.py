import argparse
import random
import time

from pymodbus.client import ModbusTcpClient
from tqdm import tqdm

from dataset_generation.invalid_function import CustomInvalidFunctionRequest


def read_input_register(client: ModbusTcpClient, address):
    return client.read_input_registers(address, count=1, unit=0x01)


def read_holding_register(client: ModbusTcpClient, address):
    return client.read_holding_registers(address, count=1, unit=0x01)


def write_holding_register(client: ModbusTcpClient, new_value, address):
    return client.write_register(address, value=new_value, unit=0x01)


def read_discrete_input(client: ModbusTcpClient, address):
    return client.read_discrete_inputs(address, count=1, unit=0x01)


def write_coil(client: ModbusTcpClient, mixing_status, address):
    return client.write_coil(address, value=mixing_status, unit=0x01)


def illegal_function(client):
    valid_function_code = [0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 15, 16, 17, 20, 21, 22, 23, 24, 43, 128]
    false_function_code = random.choice([x for x in range(0, 254) if x not in valid_function_code])
    request = CustomInvalidFunctionRequest(false_function_code)
    return client.execute(request)


def start_client(server_address, server_port, samples_num):
    client: ModbusTcpClient = ModbusTcpClient(server_address, port=server_port)
    client.connect()

    try:
        for _ in tqdm(range(int(samples_num/10))):
            mixing_status = random.choice([True, False])

            functions = [(read_discrete_input, [client, 0]),
                         (read_holding_register, [client, 0]),
                         (read_holding_register, [client, 1]),
                         (read_input_register, [client, 0]),
                         (read_input_register, [client, 1]),
                         (read_input_register, [client, 2]),
                         (read_input_register, [client, 3]),
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
                time.sleep(0.05)

    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()


def main():

    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="localhost", required=False)
    parser.add_argument('-p', default=5020, required=False)
    parser.add_argument('-num', default=100, required=False)
    args = parser.parse_args()

    server_address = args.ip
    server_port = int(args.p)
    samples_num = int(args.num)

    start_client(server_address, server_port, samples_num)


if __name__ == '__main__':
    main()
