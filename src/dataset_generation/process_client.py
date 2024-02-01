import time
import random
import argparse
from pymodbus.client import ModbusTcpClient
from invalid_function import CustomInvalidFunctionRequest

def read_register(client, address):
    temperature_status = client.read_holding_registers(address, count=1, unit=0x01)
    print(f"Temp at {address} is: {temperature_status.registers}, {temperature_status}")
    return temperature_status


def write_register(client, temp, address):
    print(f"Setting temperature to {temp}°C")
    temperature_update = client.write_register(address, value=temp, unit=0x01)
    print(f"Temp at {address} updated to: {temperature_update}")
    return temperature_update


def read_coil(client, address):
    cooling_system_status = client.read_coils(address, count=1, unit=0x01)
    print(f"Cooling system at {address} is: {cooling_system_status}")
    return cooling_system_status


def write_coil(client, cool, address):
    print(f"Switching cooling system to: {cool}")
    cooling_update = client.write_coil(address, value=cool, unit=0x01)
    print(f"Cooling at {address} updated to: {cooling_update}")
    return cooling_update


def illegal_function(client):
    valid_functioncode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 15, 16, 17, 20, 21, 22, 23, 24, 43, 128]
    false_functioncode = random.choice([x for x in range(0, 254) if x not in valid_functioncode])
    print(f"False FC is: {false_functioncode}")
    request = CustomInvalidFunctionRequest(false_functioncode)
    print(f"{client.execute(request)}")
    return client.execute(request)


def illegal_address():
    address = random.randint(1, 50)
    return address


def start_client(server_address, server_port, samples_num, exception_samples):

    client = ModbusTcpClient(server_address, port=server_port)
    client.connect()

    try:

        for _ in range(int(samples_num/4)):
            temp = random.randrange(0, 50)
            cool = random.choice([True, False])
            functions = [(read_register, [client, 0]),
                           (write_register, [client, temp, 0]),
                           (read_coil, [client, 0]),
                           (write_coil, [client, cool, 0])]

            random.shuffle(functions)

            for function, args in functions:
                function(*args)
                if function.__name__ == write_register.__name__:
                    time.sleep(2)

        for _ in range(int(exception_samples/2)):
            address = random.randint(1, 50)
            exception_function = [(read_register, [client, address]),
                                  (write_register, [client, temp, address]),
                                  (read_coil, [client, address]),
                                  (write_coil, [client, cool, address])]

            function, args = random.choice(exception_function)
            exceptions = [(illegal_function, [client]), (function, [*args])]
            random.shuffle(exceptions)

            for exception, args in exceptions:
                exception(*args)

    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()


def main():

    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="localhost", required=False)
    parser.add_argument('-p', default=502, required=False)
    parser.add_argument('-num', default=1000, required=False)
    parser.add_argument('-exc', default=200, required=False)
    args = parser.parse_args()

    server_address = args.ip
    server_port = int(args.p)
    samples_num = int(args.num)
    exception_samples = int(args.exc)

    start_client(server_address, server_port, samples_num, exception_samples)


if __name__ == '__main__':
    main()
