from pymodbus.pdu import ModbusResponse
from pymodbus.client import ModbusTcpClient

SERVER_HOST = "localhost"
client: ModbusTcpClient = ModbusTcpClient(SERVER_HOST, 5020)

# func = client.read_coils
func = client.read_input_registers
# func = client.read_holding_registers

valid_addresses = []
for i in range(0, 64):
    result = func(address=i, count=1, unit=0x01)
    print(f"Reading {func.__name__} at address {i}: {result}")
    if isinstance(result, ModbusResponse) and not result.isError():
        valid_addresses.append(i)

print(f"Valid addresses: {valid_addresses}")
