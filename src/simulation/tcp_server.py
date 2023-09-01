import socket
import sys

# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

server_address = ('localhost', 5020)
print(sys.stderr, 'starting up on %s port %s', server_address)
sock.bind(server_address)

# Listen for incoming connections
sock.listen(1)

while True:
    # Wait for a connection
    print(sys.stderr, 'waiting for a connection')
    connection, client_address = sock.accept()

    try:
        print(sys.stderr, 'connection from', client_address)

        # Receive the data in small chunks and retransmit it
        while True:
            data = connection.recv(32)
            print(sys.stderr, 'received "%s"' % data)
            if data:
                print(sys.stderr, 'sending data back to the client')

                # query model
                # data

                connection.sendall(b'\x00\x00\x00\x00\x00\x19\x01\x03\x16\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x1e\x00\x00\x00\x00\x00\x00\x00\x00')
            else:
                print(sys.stderr, 'no more data from', client_address)
                break

    finally:
        # Clean up the connection
        connection.close()
