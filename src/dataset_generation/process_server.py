import threading
from pymodbus.datastore import ModbusServerContext, ModbusSlaveContext
from pymodbus.server.async_io import StartTcpServer
from pymodbus.datastore import ModbusSparseDataBlock
import time

def update_control_logic():
    while True:
        temperature = store.getValues(0x03, 0, count=1)[0]
        print(f"Temperature: {temperature}")
        if int(temperature) > 30:
            store.setValues(0x01, 0, [True])
        else:
            store.setValues(0x01, 0, [False])
        print(f"Coil: {store.getValues(0x01, 0, count=1)}")
        time.sleep(2)
        

reg = {1: 0}
coil = {0: 0}
reg_block = ModbusSparseDataBlock(reg)
coil_block = ModbusSparseDataBlock(coil)
store = ModbusSlaveContext(hr=reg_block, di=coil_block, co=ModbusSparseDataBlock({0: 0}))

context = ModbusServerContext(slaves=store, single=True)

logic_thread = threading.Thread(target=update_control_logic)
logic_thread.start()

StartTcpServer(context=context, address=("localhost", 502))
