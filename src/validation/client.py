import sys
import json
import socket
import traceback
import pandas as pd
from result import Result
from typing import TextIO, Optional

#1:port, 2:finetuned_model name >jsonl file has same name format 

def start_client_loop(client_socket: socket.socket, result_file: TextIO, test_set: []):
    to_save = Optional[Result]
    for i in range(len(test_set)):
        try:
            valid = False
            request = test_set['request'][i]
            to_save = Result(index=i, request=request)

            client_socket.sendall(bytes.fromhex(request))
            response_bytes = client_socket.recv(2048).hex()

            if response_bytes[0:15:1] == test_set['response'][i][0:15:1]:
                valid = True

            to_save.response = response_bytes
            to_save.test_set_response = test_set['response'][i]
            to_save.valid = valid
        except Exception:
            to_save.valid = False
            to_save.traceback = traceback.format_exc()
        finally:
            result_file.write(json.dumps(to_save.__dict__) + "\n")
            if i % 50 == 0:
                result_file.flush()


def main():
    test_set = pd.read_csv(f"../datasets/test/{sys.argv[2]}.csv")
    test_set = pd.rename(columns={'source_text':'request', 'target_text':'response'})

    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        client_socket.connect(("127.0.0.1", int(sys.argv[1])))
        with open(f"./data/jsonl/{sys.argv[2]}.jsonl", "a") as results_file:
            start_client_loop(client_socket, results_file, test_set)
    finally:
        client_socket.close()


if __name__ == '__main__':
    main()