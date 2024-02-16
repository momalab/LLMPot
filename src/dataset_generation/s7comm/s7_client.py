import argparse
from snap7.client import Client
from snap7.types import Areas
from snap7.util import get_real, set_real

def start_client(server_address, server_port, samples):
    client = Client()
    client.connect(server_address, 0, 0, server_port) #ip, rack, slot, tcpport
    client.get_connected()

    try:
        for i in range(samples):
            data = client.read_area(Areas.DB, 0, 1, 4) #ID of Areas.DB = 0x84
            print(f"data read: {get_real(data, 0)}, {data}")

            b = set_real(bytearray(4), 0, i+1)
            data = client.write_area(Areas.DB, 0, 1, b)
            print(f"data written: {get_real(b, 0)}, {b}")
            print("----------------")

    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.disconnect()

def main():

    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="127.0.0.1", required=False)
    parser.add_argument('-p', default=102, required=False)
    parser.add_argument('-num', default=5, required=False)
    args = parser.parse_args()

    server_address = args.ip
    server_port = int(args.p)
    samples = int(args.num)

    start_client(server_address, server_port, samples)

if __name__ == "__main__":
    main()
