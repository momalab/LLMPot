import sys
import json
import socket
import traceback
from result import Result
from simplet5 import SimpleT5
from typing import Optional, TextIO

#1:byt5, 2:finetuned_model name >jsonl file has same name format, 3:port

def server_start(client: socket.socket, model: SimpleT5, result_file: TextIO):
    to_save: Result = Optional[Result]
    index = 0
    while True:
        try:
            request = client.recv(2048).hex()
            predicted_response = model.predict(request)[0]

            to_save = Result()
            to_save.index = index
            to_save.request = request
            to_save.response = predicted_response

            bytes_to_send = bytes.fromhex(predicted_response)

            client.sendall(bytes_to_send)

        except Exception:
            print(traceback.format_exc())
            to_save.traceback = traceback.format_exc()
            client.sendall(bytes(traceback.format_exc(), 'utf-8'))
        finally:
            result_file.write(json.dumps(to_save.__dict__) + "\n")
            if index % 50 == 0:
                result_file.flush()
            index = index + 1


def main():
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        model = SimpleT5()
        model.load_model(f"{sys.argv[1]}", f"../models/{sys.argv[2]}.csv", use_gpu=True) #Remember: model name format: byt5-small_dataset_5epcohs_32precision.csv

        server_socket.bind("127.0.0.1", int({sys.argv[3]}))
        server_socket.listen()
        print("Server ready for connection")

        client, _ = server_socket.accept()
        with open(f"./data/jsonl/{sys.argv[2]}.jsonl", "a") as results_file: #fine?
            server_start(client, model, results_file)
    finally:
        server_socket.shutdown(socket.SHUT_RDWR)
        server_socket.close()


if __name__ == '__main__':
    main()
