import socket
import threading

host = '127.0.0.1'
port = 5020
server_addresss = (host, port)
message = "hello there!!"


def send_request():
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect(server_addresss)
    print(f"Sending: {message}")
    client_socket.send(message.encode('ascii'))
    data = client_socket.recv(1024)
    print('Received from the server :', str(data.decode('ascii')))
    client_socket.close()


def multi_clients():
    threads = []
    for _ in range(10):
        thread = threading.Thread(target=send_request)
        threads.append(thread)

    for thread in threads:
        thread.start()

    for thread in threads:
        thread.join()


if __name__ == '__main__':
    multi_clients()
