import argparse
import logging
import threading
from typing import Tuple

from pymodbus.datastore import (ModbusServerContext, ModbusSlaveContext,
                                ModbusSparseDataBlock)
from pymodbus.device import ModbusDeviceIdentification
from pymodbus.server.async_io import StartTcpServer

FORMAT = ('%(asctime)-15s %(threadName)-15s'
          ' %(levelname)-8s %(module)-15s:%(lineno)-8s %(message)s')
logging.basicConfig(format=FORMAT)
log = logging.getLogger()
log.setLevel(logging.DEBUG)

class MbtcpServer:

    def __init__(self, ip: str, port: int,
                 input_reg_block: dict, holding_reg_block: dict,
                 discrete_block: dict, coil_block: dict):
        self._ip = ip
        self._port = port
        self._store = ModbusSlaveContext(ir=ModbusSparseDataBlock(input_reg_block), hr=ModbusSparseDataBlock(holding_reg_block),
                                         di=ModbusSparseDataBlock(discrete_block), co=ModbusSparseDataBlock(coil_block))

        self._context = ModbusServerContext(slaves=self._store, single=True)
        self._identity = ModbusDeviceIdentification()
        self._identity.VendorName = 'WAGO'
        self._identity.ProductCode = '750-881'
        self._identity.VendorUrl = 'https://www.wago.com'
        self._identity.ProductName = 'ETHERNET Programmable Fieldbus Controller'
        self._identity.ModelName = 'PFC200'
        self._identity.MajorMinorRevision = '03.01.02'

    def start(self):
        update_logic_thread = threading.Thread(target=self.update_control_logic, args=(self._context,))
        update_logic_thread.daemon = True
        try:
            print("Starting server.")
            update_logic_thread.start()

            StartTcpServer(context=self._context, identity=self._identity, address=(self._ip, self._port))
        except KeyboardInterrupt:
            print("Server stopped by user.")
            update_logic_thread.join()

    @staticmethod
    def update_control_logic(context: ModbusServerContext):
        pass

def retrieve_args() -> Tuple[str, int]:
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="localhost", required=False)
    parser.add_argument('-p', default=5020, required=False)
    args = parser.parse_args()

    return args.ip, int(args.p)
