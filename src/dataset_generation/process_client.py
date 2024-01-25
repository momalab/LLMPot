from pymodbus.client import ModbusTcpClient
import argparse
import random

def read_register(client):
    temperature_status = client.read_holding_registers(
        address=0, count=1, unit=0x01)
    print(f"Temp is: {temperature_status.registers}")
    return temperature_status


def write_register(client, temp):
    temperature_update = client.write_register(
        address=0, value=temp, unit=0x01)
    print(f"Temp updated: {temperature_update}")
    return temperature_update


def read_coil(client):
    cooling_system_status = client.read_coils(address=0, count=1, unit=0x01)
    print(f"Cooling system: {cooling_system_status.bits[0]}")
    return cooling_system_status


def start_client(server_address, server_port, samples_num):

    client = ModbusTcpClient(server_address, port=server_port)
    client.connect()

    try:

        for _ in range(samples_num):
            temp = random.randrange(20, 41)
            print(f"Setting temperature to {temp}°C")

            functions = [read_register, write_register, read_coil]
            random.shuffle(functions)

            for function in functions:
                if function == write_register:
                    function(client, temp)
                else:
                    function(client)

    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()


def main():

    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="localhost", required=False)
    parser.add_argument('-p', default=502, required=False)
    parser.add_argument('-num', default=500, required=False)
    args = parser.parse_args()

    server_address = args.ip
    server_port = int(args.p)
    samples_num = int(args.num)

    start_client(server_address, server_port, samples_num)


if __name__ == '__main__':
    main()
