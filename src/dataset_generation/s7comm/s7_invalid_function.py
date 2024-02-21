import socket
import random


class S7_CustomInvalidFunctionRequest:
    def __init__(self, false_function_code, server_address, server_port):
        self.false_function_code = false_function_code
        self.server_address = server_address
        self.server_port = server_port

    def send_custom_s7_command(self):
        hex_chars = '0123456789abcdef'
        length = random.choice([14, 22])
        hex_request = ''.join(random.choice(hex_chars) for _ in range(length))

        # with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_socket:
        client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        client_socket.connect((self.server_address, self.server_port))
        client_socket.sendall(bytes.fromhex(hex_request))
        print(f"Sent: {hex_request}")
        response = client_socket.recv(1024)
        print(f"Response: {response}")
        print(f"Response in hex: {response.hex()}")
        return response

# Read Data Block (DB): 0xF0 - Used for reading data from data blocks.
# Write Data Block (DB): 0xF1 - Used for writing data to data blocks.
# Read Merker (Memory): 0xF2 - Used for reading merker (memory) areas.
# Write Merker (Memory): 0xF3 - Used for writing to merker (memory) areas.
# Read Inputs: 0xF4 - Used for reading the state of digital inputs.
# Read Outputs: 0xF5 - Used for reading the state of digital outputs.
# Write Outputs: 0xF6 - Used for writing to digital outputs.
