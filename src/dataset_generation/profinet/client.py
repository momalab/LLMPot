import socket

PROFINET_PORT = 34962
SERVER_IP = "127.0.0.1"  # Change to your server IP

def send_profinet_discovery():
    """Send a Profinet discovery request."""
    request = bytes.fromhex("000E000000010001000000000000")  # Example Profinet request

    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as client_socket:
        client_socket.sendto(request, (SERVER_IP, PROFINET_PORT))
        print(f"Sent Profinet Discovery Request: {request.hex()}")

        response, _ = client_socket.recvfrom(1024)
        print(f"Received Response: {response.hex()}")

if __name__ == "__main__":
    send_profinet_discovery()
