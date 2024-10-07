import time
from pymodbus.client import ModbusTcpClient

client = ModbusTcpClient('10.224.33.30', port=502)
client.connect()

for _ in range(1, 2):

    before = time.time_ns()
    response = client.read_holding_registers(0, 1, unit=0x01)
    after = time.time_ns()
    print(f"Time: {(after - before) / 1e6} ms")

    print(f"Response from unit {response}")

client.close()
