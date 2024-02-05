import json
import socket
import argparse

import pandas
from cfg import OUTPUTS_DIR
from utilities.load_dataset import load_dataset_from_file

class Result:
    index: int
    valid: bool
    request: str
    response: str
    test_set_response: str


class MbtcpValidatorException(Exception):
    def __init__(self, message: str):
        super().__init__(message)



def start_client(server_address, server_port, test_set, result_file):

    clientSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    clientSocket.connect((server_address, server_port))

    try:

        for modbus_request in range(len(test_set)):
            try:
                to_save = Result()
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

                to_save.index = modbus_request+1
                to_save.request = request_to_wago
                to_save.response = response_from_wago
                to_save.test_set_response = predicted_response

                if response_from_wago == predicted_response:
                    to_save.valid = True
                else:
                    to_save.valid = False

            except MbtcpValidatorException as exception:
                to_save.valid = False
                to_save.traceback = exception
            finally:
                result_file.write(json.dumps(to_save.__dict__) + "\n")

    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
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
    
    test_set = load_dataset_from_file(f"{csv_filename}")["test"]

    with open(f"{OUTPUTS_DIR}/validation_data/{csv_filename}.jsonl", "a") as results_file:
        start_client(server_address, server_port, test_set, results_file)

    print("############################")
    #Calculate results
    with open(f"{OUTPUTS_DIR}/validation_data/{csv_filename}.jsonl", 'r') as file:
        data = [json.loads(line) for line in file]

    df = pandas.DataFrame(data)
    valid = len(df.query('valid == True'))
    invalid = len(df.query('valid == False'))
    valid_percentage = 100 * (valid/len(test_set))
    print(f"Valid: {valid}/{len(test_set)}, {valid_percentage}%")
    invalid_percentage = 100 * (invalid/len(test_set))
    print(f"Invalid: {invalid}/{len(test_set)}, {invalid_percentage}%")


if __name__ == '__main__':
    main()
