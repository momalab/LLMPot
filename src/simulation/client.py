from pymodbus.client import ModbusTcpClient

SERVER_HOST = "localhost"
SERVER_PORT = 5020

client = ModbusTcpClient(SERVER_HOST, port=SERVER_PORT)


def read_data(data_type, address, num_elements=1):
    result = client.read_holding_registers(address, num_elements, unit=0x00)
    if result.isError():
        print(f"Failed to read {data_type}. Error: {result}")
    else:
        print(f"{data_type} at address {address}: {result.registers}")


try:
    client.connect()

    read_data("Holding Registers", address=0, num_elements=5)

    # address_to_write = 10
    # data_to_write = [100, 200, 300, 400]
    # response = client.write_registers(address_to_write, data_to_write, unit=0x01)
    # if response.isError():
    #     print(f"Failed to write data. Error: {response}")
    #
    # read_data("Holding Registers", address=0x10, num_elements=5)

finally:
    client.close()
