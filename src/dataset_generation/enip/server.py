import socket
import struct
import random

class ENIPServer:
    def __init__(self, host="localhost", port=44818):
        self.host = host
        self.port = port
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.server_socket.bind((self.host, self.port))
        self.server_socket.listen(5)
        self.sessions = {}  # Session registry
        print(f"ENIP Server listening on {self.host}:{self.port}")

    def handle_registration(self, client_socket, data):
        """Handle ENIP session registration."""
        command = struct.unpack("<H", data[0:2])[0]
        if command == 0x0065:  # Register session command
            session_handle = random.randint(1, 0xFFFFFFFF)
            self.sessions[session_handle] = client_socket
            # Build and send a response to register session
            response = struct.pack("<HHII", 0x0065, 0x0004, session_handle, 0x0000)
            client_socket.sendall(response)
            print(f"Session {session_handle} registered.")

    def handle_read_request(self, client_socket, session_handle, data):
        """Handle CIP read request."""
        # Extracting the command from the request (simplified)
        command = struct.unpack("<H", data[0:2])[0]
        if command == 0x6F:  # Command to send encapsulated CIP message
            # Example read response (this would need to be CIP structured data)
            # For simplicity, we'll return a fixed response with dummy data
            tag_value = 1234  # Example data
            response = struct.pack("<H", tag_value)
            client_socket.sendall(response)
            print(f"Sent read response for session {session_handle}.")

    def start(self):
        print("Waiting for incoming connections...")
        while True:
            client_socket, addr = self.server_socket.accept()
            print(f"Connection received from {addr}")
            try:
                # Receive the initial ENIP request
                data = client_socket.recv(1024)
                if len(data) >= 24:  # Minimum ENIP packet size
                    session_handle = struct.unpack("<I", data[4:8])[0]
                    if session_handle == 0:
                        # Handle registration
                        self.handle_registration(client_socket, data)
                    else:
                        # Handle read/write requests for an existing session
                        self.handle_read_request(client_socket, session_handle, data)
                client_socket.close()
            except Exception as e:
                print(f"Error handling client: {e}")
                client_socket.close()

if __name__ == "__main__":
    server = ENIPServer()
    server.start()
