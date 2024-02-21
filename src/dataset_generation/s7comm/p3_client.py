import time
import random
import argparse
from snap7.client import Client
from snap7.types import Areas
from snap7.util import get_word, set_word, get_bool
from s7_invalid_function import S7_CustomInvalidFunctionRequest


def read_flow_rate(client: Client, data_block, address, num_bytes):
    try:
        flow_rate = client.db_read(data_block, address, num_bytes)
        print(f"flow_rate at {data_block}, {address} is: {get_word(flow_rate, 0)}")
        return flow_rate
    except RuntimeError:
        print("----- Exception -----")


def write_flow_rate(client: Client, data_block, temp, address):
    try:
        new_flow = set_word(bytearray(2), 0, temp)
        flow_rate_update = client.db_write(data_block, address, new_flow)
        print(f"flow_rate at {address} updated to: {get_word(new_flow, 0)}")
        return flow_rate_update
    except RuntimeError:
        print("----- Exception -----")


def read_mixing_status(client: Client, data_block, address, num_bytes):
    try:
        mixing_status = client.read_area(Areas.MK, data_block, address, num_bytes)
        print(f"Cooling at {address} is: {get_bool(mixing_status, 0, 0)}")
        return mixing_status
    except RuntimeError:
        print("----- Exception -----")


def write_mixing_status(client: Client, data_block, cool, address):
    try:
        mixing_update = client.write_area(Areas.MK, data_block, address, cool)
        print(f"Cooling at {address} updated to: {get_bool(cool, 0, 0)}")
        return mixing_update
    except RuntimeError:
        print("----- Exception -----")


def illegal_function(server_address, server_port):
    # ['0xF0', '0xF1', '0xF2', '0xF3', '0xF4', '0xF5', '0xF6'] / Read = 0x04 and Write = 0x05
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
        for _ in range(int(samples_num/5)):

            mixing_status = random.choice([bytearray([0b00000001]) , bytearray([0b00000000])])

            functions = [(read_flow_rate, [client, 0, 0, 2]), #db_num, start, length
                         (read_flow_rate, [client, 1, 0, 2]),
                         (read_flow_rate, [client, 2, 0, 2]),
                         (read_flow_rate, [client, 3, 0, 2])]

            # flow_rate = random.randrange(0, 50)
            mixing_status = random.choice([bytearray([0b00000001]) , bytearray([0b00000000])])

            data_block = random.randint(4, 50)
            db_addresses = random.randint(0, 50)
            db_bytes = random.randint(3, 10)

            merkers_block = random.randint(0, 50)
            mk_addresses = random.randint(0, 50)
            mk_bytes = random.randint(3, 10)

            exception_function = [(read_flow_rate, [client, data_block, db_addresses, db_bytes]),
                                #   (write_flow_rate, [client, data_block, flow_rate, db_addresses]),
                                  (read_mixing_status, [client, merkers_block, mk_addresses, mk_bytes]),
                                  (write_mixing_status, [client, merkers_block, mixing_status, mk_addresses])]

            function, args = random.choice(exception_function)
            exceptions = [(function, [*args])] # (illegal_function, [server_address, server_port])
            functions.extend(exceptions)
            random.shuffle(functions)

            for function, args in functions:
                function(*args)
                time.sleep(0.05)

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
