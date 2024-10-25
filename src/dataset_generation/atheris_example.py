import sys
import atheris
from pymodbus.client import ModbusTcpClient

def TestOneInput(data):
    client = ModbusTcpClient('127.0.0.1', port=5020)

    try:
        client.connect()

        if len(data) >= 6:
            client.socket.send(data)  # Send raw fuzzed data directly to Modbus server
            response = client.socket.recv(1024)

    except Exception as e:
        pass  # We don't care about exceptions, just crashes
    finally:
        client.close()

atheris.Setup(sys.argv, TestOneInput)
atheris.Fuzz()
