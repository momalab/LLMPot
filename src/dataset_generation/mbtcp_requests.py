from pymodbus.client import ModbusTcpClient

class Mbtcp_Requests:
    
    def __init__(self, server_address: str, server_port: int):
        self._client = ModbusTcpClient(server_address, port=server_port)
        
    def connect_client(self):
        self._client.connect()
        
    def close_client(self):
        self._client.close()
        
    def execute(self, request):
        self._client.execute(request)
    
    def read_data(self, data_type, address, a, num_elements):
        if a == 1:
            result = self._client.read_coils(address, num_elements, unit=0x01)
            if result.isError():
                return print(f"Failed to read {data_type}. Error: {result}")
            else:
                return print(f"{data_type} at address {address}: {result},{result.bits[0]}")
        if a == 3:
            result = self._client.read_holding_registers(address, num_elements, unit=0x01)
            if result.isError():
                return print(f"Failed to read {data_type}. Error: {result}")
            else:
                return print(f"{data_type} at address {address}: {result.registers}")

    def write_single_data(self, data_type, address, single_data_to_write, a):
        if a == 5:
            result = self._client.write_coil(address, single_data_to_write, unit=0x01)
            if result.isError():
                return print(f"Failed to write {data_type}. Error: {result}")
            else:
                return print(f"{data_type} to address {address}: {single_data_to_write}")
        if a == 6:
            result = self._client.write_register(address, single_data_to_write, unit=0x01)
            if result.isError():
                return print(f"Failed to write {data_type}. Error: {result}")
            else:
                return print(f"{data_type} to address {address}: {single_data_to_write}")
                
    def write_multiple_data(self, data_type, address, data_to_write, a):
        if a == 15:
            result = self._client.write_coils(address, data_to_write, unit=0x01)
            if result.isError():
                return print(f"Failed to write {data_type}. Error: {result}")
            else:
                return print(f"{data_type} to address {address}: {data_to_write}")
        if a == 16:
            result = self._client.write_registers(address, data_to_write, unit=0x01)
            if result.isError():
                return print(f"Failed to write {data_type}. Error: {result}")
            else:
                return print(f"{data_type} to address {address}: {data_to_write}")
