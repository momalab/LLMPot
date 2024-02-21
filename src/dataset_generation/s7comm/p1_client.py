import time
import random
import argparse
from snap7.client import Client
from snap7.types import Areas
from snap7.util import get_word, set_word, get_bool
from s7_invalid_function import S7_CustomInvalidFunctionRequest


def read_temperature(client, address, num_bytes):
    try:
        temperature_status = client.db_read(0, address, num_bytes)
        print(f"Temp at {address} is: {get_word(temperature_status, 0)}")
        return temperature_status
    except RuntimeError:
        print("----- Exception -----")


def write_temperature(client, temp, address):
    try:
        new_temp = set_word(bytearray(2), 0, temp)
        temperature_update = client.db_write(0, address, new_temp)
        print(f"Temp at {address} updated to: {get_word(new_temp, 0)}")
        return temperature_update
    except RuntimeError:
        print("----- Exception -----")


def read_cooling(client, address, num_bytes):
    try:
        cooling_system_status = client.read_area(Areas.MK, 0, address, num_bytes)
        print(f"Cooling at {address} is: {get_bool(cooling_system_status, 0, 0)}")
        return cooling_system_status
    except RuntimeError:
        print("----- Exception -----")


def write_cooling(client, cool, address):
    try:
        cooling_system_update = client.write_area(Areas.MK, 0, address, cool)
        print(f"Cooling at {address} updated to: {get_bool(cool, 0, 0)}")
        return cooling_system_update
    except RuntimeError:
        print("----- Exception -----")


def illegal_function(server_address, server_port):
    # ['0xF0', '0xF1', '0xF2', '0xF3', '0xF4', '0xF5', '0xF6']
    valid_function_code = [240, 241, 242, 243, 244, 245, 246]
    false_function_code = random.choice([x for x in range(0, 255) if x not in valid_function_code])
    print(f"False FC is: {false_function_code}")
    request = S7_CustomInvalidFunctionRequest(false_function_code, server_address, server_port)
    return request.send_custom_s7_command()


def start_client(server_address, server_port, samples_num):
    client = Client()
    client.connect(server_address, 0, 0, server_port)
    client.get_connected()

    try:
        for _ in range(samples_num):

            illegal_function(server_address, server_port)


            # temp = random.randrange(0, 50)
            # cool = random.choice([bytearray([0b00000001]) , bytearray([0b00000000])])

            # functions = [(read_temperature, [client, 0, 2]),
            #              (write_temperature, [client, temp, 0]),
            #              (read_cooling, [client, 0, 2]),
            #              (write_cooling, [client, cool, 0])]

            # temp = random.randrange(0, 50)
            # cool = random.choice([True, False])
            # db_addresses = random.randint(1, 50)
            # db_bytes = random.randint(3, 10)
            # mk_addresses = random.randint(1, 50)
            # mk_bytes = random.randint(3, 10)
            # exception_function = [(read_temperature, [client, db_addresses, db_bytes]),
            #                       (write_temperature, [client, temp, db_addresses]),
            #                       (read_cooling, [client, mk_addresses, mk_bytes]),
            #                       (write_cooling, [client, cool, mk_addresses])]

            # function, args = random.choice(exception_function)
            # exceptions = [(illegal_function, [server_address, server_port]), (function, [*args])]
            # functions.extend(exceptions)
            # random.shuffle(functions)

            # for function, args in functions:
            #     function(*args)
            #     if function.__name__ == write_temperature.__name__:
            #         time.sleep(0.3)

    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.disconnect()

def main():

    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="127.0.0.1", required=False)
    parser.add_argument('-p', default=102, required=False)
    parser.add_argument('-num', default=1, required=False)
    args = parser.parse_args()

    server_address = args.ip
    server_port = int(args.p)
    samples_num = int(args.num)

    start_client(server_address, server_port, samples_num)

if __name__ == '__main__':
    main()
