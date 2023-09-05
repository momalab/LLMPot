# import the socket module

import socket

# import the threading module

import threading


def Connect2Server():
    # Create a socket instance

    socketObject = socket.socket()

    # Using the socket connect to a server...in this case localhost

    socketObject.connect(("localhost", 5020))

    print("Connected to localhost")

    # Send a message to the web server to supply a page as given by Host param of GET request

    HTTPMessage = "GET / HTTP/1.1\r\nHost: localhost\r\n Connection: close\r\n\r\n"

    bytes = str.encode(HTTPMessage)

    socketObject.sendall(bytes)

    # Receive the data

    while (True):

        data = socketObject.recv(1024)

        print(data)

        if data == b'':
            print("Connection closed")

            break

    socketObject.close()


print("Client - Main thread started")

ThreadList = []

ThreadCount = 20

for index in range(ThreadCount):
    ThreadInstance = threading.Thread(target=Connect2Server())

    ThreadList.append(ThreadInstance)

    ThreadInstance.start()

# Main thread to wait till all connection threads are complete

for index in range(ThreadCount):
    ThreadList[index].join()
