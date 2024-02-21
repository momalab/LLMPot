import argparse
import time
from snap7.client import Client
from snap7.types import Areas
from snap7.util import get_word, set_word, get_bool


def start_client(server_address, server_port, samples_num):
    client = Client()
    # For Siemens S7-300 PLC we use plc's ip, rack:0, slot:2
    client.connect(server_address, 0, 0, server_port)
    client.get_connected()

    try:
        for _ in range(samples_num):
            # if size on sever = 2 and we read from 0 to 3 then we get exception
            data = client.db_read(0, 0, 2)
            print(f"DataDB read is: {get_word(data, 0)}")

            value = 28
            b = set_word(bytearray(2), 0, value)
            data = client.db_write(0, 0, b)
            print(f"DataDB written is: {get_word(b, 0)}")
            print("----------------")

            data = client.read_area(Areas.MK, 0, 0, 2)
            print(f"DataMK is: {get_bool(data, 0, 0)}")

            value_T = bytearray([0b00000001]) #True
            value_F = bytearray([0b00000000]) #False
            data = client.write_area(Areas.MK, 0, 0, value_F)
            print(f"DataMK update to: {get_bool(value_F, 0, 0)}")
            # immediate read of change
            data = client.read_area(Areas.MK, 0, 0, 2)
            print(f"DataMK is: {get_bool(data, 0, 0)}")

            #for the control logic to switch the value
            time.sleep(0.3) 
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
    samples_num = int(args.num)

    start_client(server_address, server_port, samples_num)

if __name__ == "__main__":
    main()
