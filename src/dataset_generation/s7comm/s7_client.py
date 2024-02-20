import argparse
from snap7.client import Client
from snap7.types import Areas
from snap7.util import get_word, set_word, get_bool


def start_client(server_address, server_port, samples):
    client = Client()
    client.connect(server_address, 0, 0, server_port) #ip, rack, slot, tcpport
    client.get_connected()

    try:
        for _ in range(samples):
            data = client.db_read(0, 0, 2)
            print(f"DataDB read is: {get_word(data, 0)}")

            value = 23
            b = set_word(bytearray(2), 0, value)
            data = client.db_write(0, 0, b)
            print(f"DataDB written is: {get_word(b, 0)}")
            print("----------------")

            data = client.read_area(Areas.MK, 0, 0, 2)
            print(f"DataMK is: {get_bool(data, 0, 0)}")

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
    samples = int(args.num)

    start_client(server_address, server_port, samples)

if __name__ == "__main__":
    main()
