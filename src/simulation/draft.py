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

                # query model
                model.load_model("byt5", "/home/dunia/ICSPot/outputs/simplet5-epoch-4-train-loss-1.2354-val-loss-1.2378/", use_gpu=True)

                print("Received Query is:", data)

                #convert byte string into hex string
                data_hex_string = ''.join(f'{byte:02x}' for byte in data)
                print("Query in hex string is:", data_hex_string)

                #Test with no context "inference"
                predicted_response = model.predict(data_hex_string)
                print("Predicted response is:", predicted_response)

                try: 

                    hex_string = predicted_response

                    # Convert the hexadecimal string to a list of two-character chunks
                    hex_chunks = [hex_string[i:i + 2] for i in range(0, len(hex_string), 2)]

                    # Convert each chunk to its corresponding ASCII character
                    payload_string = ''.join([chr(int(chunk, 16)) for chunk in hex_chunks])
                    print("Response in hex is:", payload_string)

                    print(sys.stderr, 'sending data back to the client')
                    connection.sendall(bytes(payload_string, 'utf-8')) #high-level Python-only method that sends the entire buffer you pass
                except:

                    predicted_response_hex = bytes.fromhex(predicted_response[0])

                    print(sys.stderr, 'sending data back to the client')
                    connection.sendall(predicted_response_hex) #high-level Python-only method that sends the entire buffer you pass

            else:
                print(sys.stderr, 'no more data from', client_address)
                break

    finally:
        # Clean up the connection
        connection.close()
