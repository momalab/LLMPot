import json
import socket
import argparse
# import pandas as pd
# from pandas import DataFrame
from cfg import PROJECT_ROOT_DIR, OUTPUTS_DIR
# from pymodbus.client import ModbusTcpClient
from utilities.load_dataset import load_dataset_from_file

class Result:
    index: int
    valid: bool
    request: str
    response: str
    test_set_response: str

    
def start_client(server_address, server_port, csv_filename, result_file):

    # client = ModbusTcpClient(server_address, port=server_port)
    # client.connect()
    clientSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    clientSocket.connect((server_address, server_port))

    try:
        to_save = Result()
        test_set = load_dataset_from_file(f"{csv_filename}")["test"]
        # test_set: pd.DataFrame = pd.read_csv(f"{PROJECT_ROOT_DIR}/outputs/datasets/test/{csv_filename}.csv")

        for modbus_request in range(2):
            #Note the request is in a contextual structure
            request = test_set['request'][modbus_request]
            if "|" in request:
                request_to_wago = request[request.rindex("|")+1:len(request)-1]
            else:
                request_to_wago = request

            print(f"Request is: {request_to_wago}")

            print(f"Request sent: {bytes.fromhex(request_to_wago)}")
            clientSocket.sendall(bytes.fromhex(request_to_wago))

            response_from_wago = clientSocket.recv(1024)
            response_from_wago = response_from_wago.hex()
            print(f"Response in hex: {response_from_wago}")

            predicted_response = test_set['response'][modbus_request]

            to_save.index = modbus_request
            to_save.request = request_to_wago
            to_save.response = response_from_wago
            to_save.test_set_response = predicted_response

            if response_from_wago == predicted_response:
                to_save.valid = True
            else:
                to_save.valid = False


    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        # client.close()
        result_file.write(json.dumps(to_save.__dict__) + "\n")
        clientSocket.close()

def main():

    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="10.224.33.30", required=False)
    parser.add_argument('-p', default=502, required=False)
    parser.add_argument('-csv', required=True)
    args = parser.parse_args()

    server_address = args.ip
    server_port = int(args.p)
    csv_filename = args.csv

    with open(f"{OUTPUTS_DIR}/validation_data/{csv_filename}.jsonl", "a") as results_file:
        start_client(server_address, server_port, csv_filename, results_file)


if __name__ == '__main__':
    main()
