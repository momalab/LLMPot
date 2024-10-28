import binascii
from pymodbus.bit_read_message import ReadCoilsRequest

from dataset_generation.mbtcp.client import MbtcpClient

client = MbtcpClient('localhost', 5020, 0, [1,3])

client.read_coils(1, 10)

request = ReadCoilsRequest(1, 10)  # Address 1, reading 10 coils

client.transaction.tid = 5

encoded_request = request.encode()
hex_data = binascii.hexlify(encoded_request).decode('utf-8')

# Print the hexadecimal representation of the request
print(f"Request in hex: {hex_data}")

response = client.execute(request)

print(response)
client.close()
