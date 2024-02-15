import argparse
from snap7.client import Client
from snap7.types import Areas

def start_client(server_address, server_port):
    client = Client()
    client.connect("127.0.0.1", 0, 0, 102) #ip, rack, slot, tcpport
    client.get_connected()

    try:

        data = client.read_area(Areas.DB, 0, 0, 1) #ID of Areas.DB = 0x84
        print(f"data read: {data}")

        buffer = bytearray([0b00000001])
        data = client.write_area(Areas.DB, 0, 1, buffer)
        print(f"data written: {data}")

    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.disconnect()

def main():

    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="127.0.0.1", required=False)
    parser.add_argument('-p', default=1020, required=False)
    args = parser.parse_args()

    server_address = args.ip
    server_port = int(args.p)

    start_client(server_address, server_port)

if __name__ == "__main__":
    main()
