import argparse
import multiprocessing
from typing import Tuple

from pymodbus.datastore import ModbusServerContext, ModbusSlaveContext
from pymodbus.datastore import ModbusSparseDataBlock
from pymodbus.device import ModbusDeviceIdentification
from pymodbus.server.async_io import StartTcpServer


class MbtcpServer:

    def __init__(self, ip: str, port: int,
                 input_reg_block: dict, holding_reg_block: dict,
                 discrete_block: dict, coil_block: dict):
        self._ip = ip
        self._port = port
        self._store = ModbusSlaveContext(ir=ModbusSparseDataBlock(input_reg_block), hr=ModbusSparseDataBlock(holding_reg_block),
                                         di=ModbusSparseDataBlock(discrete_block), co=ModbusSparseDataBlock(coil_block))

        self._context = ModbusServerContext(slaves=self._store, single=True)

    def start(self):
        update_logic_thread = multiprocessing.Process(target=self._update_control_logic)
        try:
            update_logic_thread.start()

            identity = ModbusDeviceIdentification()
            identity.VendorName = 'CODE'
            identity.ProductCode = 'MyProductCode'
            identity.VendorUrl = 'http://www.mycompany.com'
            identity.ProductName = 'MyProductName'
            identity.ModelName = 'MyModelName'
            identity.MajorMinorRevision = '1.0'

            StartTcpServer(context=self._context, identity=identity, address=(self._ip, self._port))
        except KeyboardInterrupt:
            print("Server stopped by user.")
            update_logic_thread.terminate()
            update_logic_thread.join()

    def _update_control_logic(self):
        pass


def retrieve_args() -> Tuple[str, int]:
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="localhost", required=False)
    parser.add_argument('-p', default=5020, required=False)
    args = parser.parse_args()

    return args.ip, int(args.p)
