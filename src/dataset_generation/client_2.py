from pymodbus.client import ModbusTcpClient

MODBUS_SERVER_IP = '127.0.0.1'
MODBUS_SERVER_PORT = 502

client = ModbusTcpClient(MODBUS_SERVER_IP, port=MODBUS_SERVER_PORT)

client.connect()

starting_address = 0x00  
num_registers = 124
values_to_write = [10] * num_registers 

result = client.write_registers(starting_address, values_to_write, unit=0x00)
print(f"Add: {starting_address}, #: {num_registers}, data: {values_to_write}")
print(result)

client.close()