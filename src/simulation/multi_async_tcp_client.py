import asyncio
import threading

# Define the TCP client function
async def tcp_client(host, port, message):
    reader, writer = await asyncio.open_connection(host, port)

    print(f"Connected to {host}:{port}")

    writer.write(message.encode())
    await writer.drain()

    data = await reader.read(100)
    print(f"Received: {data.decode()}")

    writer.close()
    await writer.wait_closed()
    print(f"Connection to {host}:{port} closed")

# Function to run the TCP client in a thread
def run_tcp_client(host, port, message):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(tcp_client(host, port, message))
    loop.close()

# Define the list of host, port, and message for multiple clients
clients = [
    {"host": "localhost", "port": 5020, "message": "Hello, Server 1!"},
    {"host": "localhost", "port": 5020, "message": "Hello, Server 2!"},
    {"host": "localhost", "port": 5020, "message": "Hello, Server 3!"},
    {"host": "localhost", "port": 5020, "message": "Hello, Server 4!"},
    {"host": "localhost", "port": 5020, "message": "Hello, Server 5!"},
]

# Create threads for each client
threads = []
for client in clients:
    thread = threading.Thread(target=run_tcp_client, args=(client["host"], client["port"], client["message"]))
    threads.append(thread)

# Start the threads
for thread in threads:
    thread.start()

# Wait for all threads to finish
for thread in threads:
    thread.join()
