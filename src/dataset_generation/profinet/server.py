import socket

PROFINET_PORT = 34962
BUFFER_SIZE = 1024

def handle_profinet_request(data, addr):
    """Process incoming Profinet packet and craft a response."""
    print(f"Received Profinet Request from {addr}: {data.hex()}")

    # Simple Profinet Discovery Response (Fake Response)
    response = bytes.fromhex("000E000000020001000000000000")  # Example Profinet response
    return response

def profinet_server():
    """Profinet UDP Server."""
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    server_socket.bind(("0.0.0.0", PROFINET_PORT))

    print(f"Profinet Server listening on UDP port {PROFINET_PORT}...")

    while True:
        data, addr = server_socket.recvfrom(BUFFER_SIZE)
        if not data:
            continue

        response = handle_profinet_request(data, addr)
        if response:
            server_socket.sendto(response, addr)
            print(f"Sent Profinet Response to {addr}: {response.hex()}")

if __name__ == "__main__":
    profinet_server()
