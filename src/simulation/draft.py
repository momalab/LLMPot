import socket
import sys

from simplet5 import SimpleT5
model = SimpleT5()

# Create a TCP/IP socket 
#socket connects the two nodes on a network to communicate with each other 
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM) #AF_INET addresses from the internet/ SOCK_STREAM socket type for TCP/IP

server_address = ('localhost', 5020)
print(sys.stderr, 'starting up on %s port %s', server_address)
sock.bind(server_address) #assigns a socket to an address

# Listen for incoming connections (client connection requests)
sock.listen(1) #maximum number of queued connections (atleast 1 and max 5)

while True:
    # Wait for a connection
    print(sys.stderr, 'waiting for a connection') #standard error (Exceptions)
    connection, client_address = sock.accept() #accept a connection request from a client

    try:
        print(sys.stderr, 'connection from', client_address)

        # Receive the data in small chunks and retransmit it
        while True:
            data = connection.recv(32) # bufsize: Number of bytes to receive
            print(sys.stderr, 'received "%s"' % data)
            if data:
                print(sys.stderr, 'sending data back to the client')

                # query model
                model.load_model("byt5", "outputs/simplet5-epoch-4-train-loss-0.0073-val-loss-0.0061", use_gpu=True)

                #Test with no context
                query_received = data#?
                print("Query is:",  query_received)

                predicted_response = model.predict(query_received)
                print("Predicted response is:", predicted_response)

                predicted_response_hex = bytes.fromhex(predicted_response[0])
                print("Response in hex:", predicted_response_hex)

                connection.sendall(predicted_response_hex) #high-level Python-only method that sends the entire buffer you pass

            else:
                print(sys.stderr, 'no more data from', client_address)
                break

    finally:
        # Clean up the connection
        connection.close()
