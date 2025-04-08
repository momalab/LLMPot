from pymodbus.client import ModbusTcpClient
from pymodbus.exceptions import ModbusIOException
from pymodbus.other_message import ReportSlaveIdRequest

def response_handler(response):
    if isinstance(response, ModbusIOException):
        print("Failed to...")
    else:
        print(f"Response: {response}")

# client = ModbusTcpClient('hydra.abudhabi.nyu.edu', port=5020)
client = ModbusTcpClient('91.230.41.210', port=502)
# client = ModbusTcpClient('localhost', port=5020)

connection = client.connect()

if connection:
    print("Connected to Modbus server.")

    try:

        lala = ReportSlaveIdRequest(50)
        response = client.execute(lala)
        response_handler(response)
        # response = client.write_register(1, 50, slave=0)
        # response_handler(response)
        # response = client.read_holding_registers(40001, 1, slave=2)
        # response_handler(response)
        # response = client.write_register(40001, 50, slave=2)
        # response_handler(response)
        # response = client.read_holding_registers(40001, 1, slave=2)
        # response_handler(response)
    except Exception as e:
        print(f"An error occurred: {e}")
else:
    print("Failed to connect to the Modbus server.")

# Close the connection
client.close()
