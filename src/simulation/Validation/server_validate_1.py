import json
import socket
import traceback
from typing import Optional, TextIO

from simplet5 import SimpleT5
from result import Result


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
        model.load_model("byt5", "/Users/cv43/Downloads/finetuned/byt5", use_gpu=False)

        server_socket.bind(("127.0.0.1", 5020))
        server_socket.listen()
        print("Server ready for connection")

        client, _ = server_socket.accept()
        with open("./data/server_results.jsonl", "a") as results_file:
            server_start(client, model, results_file)
    finally:
        server_socket.shutdown(socket.SHUT_RDWR)
        server_socket.close()


if __name__ == '__main__':
    main()
