import threading
import time

from pymodbus.client import ModbusTcpClient

# Configuration
TARGET_IP = "91.230.41.210"  # Replace with your target device's IP
TARGET_PORT = 502            # Modbus TCP port
REQUEST_COUNT = 100          # Total number of requests per thread
THREAD_COUNT = 1            # Number of concurrent threads
REGISTER_ADDRESS = 0         # Address of the holding register to read
REGISTER_COUNT = 1           # Number of registers to read

# Thread-safe statistics
lock = threading.Lock()
total_time = 0
total_requests = 0

def send_requests():
    global total_time, total_requests
    client = ModbusTcpClient(TARGET_IP, port=TARGET_PORT)

    if client.connect():
        start_time = time.time()
        for _ in range(REQUEST_COUNT):
            response = client.read_holding_registers(REGISTER_ADDRESS, REGISTER_COUNT, 1)
            if response.isError():
                print(f"Error in response: {response}")
        end_time = time.time()

        # Update statistics
        with lock:
            total_time += (end_time - start_time)
            total_requests += REQUEST_COUNT

        client.close()
    else:
        print(f"Failed to connect to {TARGET_IP}:{TARGET_PORT}")

# Create and start threads
threads = []
for _ in range(THREAD_COUNT):
    thread = threading.Thread(target=send_requests)
    threads.append(thread)
    thread.start()

# Wait for all threads to complete
for thread in threads:
    thread.join()

# Calculate and display results
average_time = total_time / THREAD_COUNT
requests_per_second = total_requests / total_time

print(f"Average execution time per thread: {average_time:.2f} seconds")
print(f"Requests per second: {requests_per_second:.2f}")
