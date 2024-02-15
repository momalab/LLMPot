import time
import random
import argparse
import snap7
from snap7.types import Areas, wordlen_to_ctypes, S7WLReal


def read_temperature_register(client, address):
    temperature_status = client.read_area(Areas.DB, 1, address, wordlen_to_ctypes(S7WLReal))
    temperature_sensor_value = snap7.util.get_real(temperature_status, 0)
    print(f"Temp at {address} is: {temperature_sensor_value}, {temperature_status}")
    return temperature_status


def write_temperature_register(client, temp, address):
    new_temp = snap7.util.set_real(temp)
    temperature_update = client.write_area(Areas.DB, 1, address, new_temp)
    print(f"Temp at {address} updated to: {temperature_update}")
    return temperature_update


def read_cooling_coil(client, address):
    cooling_system_status = client.read_area(Areas.MK, 0, address, 1)
    print(f"Cooling system at {address} is: {cooling_system_status}")
    return cooling_system_status


def write_cooling_coil(client, cool, address):
    cooling_system_update = client.write_area(Areas.MK, 0, address, cool)
    print(f"Cooling system at {address} updated to: {cooling_system_update}")
    return cooling_system_update


def start_client(server_address, server_port, data_num):
    client = snap7.client.Client()
    # For Siemens S7-300 PLC we use rack:0, slot:2
    client.connect(server_address, 0, 0, server_port)
    client.get_connected()

    try:
        for _ in range(int(data_num / 4)):
            temp = random.randrange(0, 50)
            cool = random.choice([True, False])

            functions = [(read_temperature_register, [client, 0]),
                         (write_temperature_register, [client, temp, 0]),
                         (read_cooling_coil, [client, 0]),
                         (write_cooling_coil, [client, cool, 0])]

            # temp = random.randrange(0, 50)
            # cool = random.choice([True, False])
            # di_addresses = random.randint(1, 50)
            # hr_addresses = random.randint(2, 50)
            # exception_function = [(read_temperature_register, [client, hr_addresses]),
            #                       (write_temperature_register, [client, temp, hr_addresses]),
            #                       (read_cooling_coil, [client, di_addresses]),
            #                       (write_cooling_coil, [client, cool, di_addresses])]

            # function, args = random.choice(exception_function)
            # random.shuffle(functions)

            for function, args in functions:
                function(*args)
                if function.__name__ == write_temperature_register.__name__:
                    time.sleep(0.3)

    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.disconnect()

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="127.0.0.1", required=False)
    parser.add_argument('-p', default=102, required=False)
    parser.add_argument('-num', default=4, required=False)
    args = parser.parse_args()

    server_address = args.ip
    server_port = int(args.p)
    data_num = int(args.num)

    start_client(server_address, server_port, data_num)

if __name__ == '__main__':
    main()
