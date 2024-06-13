import sys
import logging

from pymodbus.server import StartTcpServer
from pymodbus.device import ModbusDeviceIdentification
from pymodbus.datastore import ModbusSequentialDataBlock
from pymodbus.datastore import ModbusSlaveContext, ModbusServerContext


def setup_logging():
    """
    Set up and configure logging.
    """
    logging.basicConfig(format='%(asctime)s %(levelname)-8s %(message)s',
                        level=logging.INFO,
                        datefmt='%Y-%m-%d %H:%M:%S')


def start_server(address: str = "localhost", port: int = 5020):
    setup_logging()

    logging.info("Starting Modbus Server")

    store = ModbusSlaveContext(
        di=ModbusSequentialDataBlock(0, [0] * 101),#read coil
        co=ModbusSequentialDataBlock(0, [0] * 103), #write coil
        hr=ModbusSequentialDataBlock(0, [0] * 103), #write reg
        ir=ModbusSequentialDataBlock(0, [0] * 101)) #read reg

    context = ModbusServerContext(slaves=store, single=True)

    identity = ModbusDeviceIdentification()
    identity.VendorName = 'Pymodbus'
    identity.ProductCode = 'PM'
    identity.VendorUrl = 'http://github.com/riptideio/pymodbus/'
    identity.ProductName = 'Pymodbus Server'
    identity.ModelName = 'Pymodbus Server'
    identity.MajorMinorRevision = '1.5'

    # print("Modbus Server started..")
    StartTcpServer(context=context, identity=identity, address=(address, port))


def main(argv: list[str]):
    if len(argv) == 3:
        server_address = str(argv[1])
        server_port = int(argv[2])
        start_server(server_address, server_port)
    else:
        start_server()


if __name__ == "__main__":
    main(sys.argv)
