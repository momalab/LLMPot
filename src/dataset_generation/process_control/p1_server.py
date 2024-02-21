import threading
from pymodbus.datastore import ModbusServerContext, ModbusSlaveContext
from pymodbus.server.async_io import StartTcpServer
from pymodbus.datastore import ModbusSparseDataBlock
import time

def update_control_logic():
    while True:
        temperature = store.getValues(0x03, 0, count=1)[0]
        if int(temperature) > 25:
            store.setValues(0x02, 0, [True])
        else:
            store.setValues(0x02, 0, [False])
        time.sleep(0.1)

input_reg_block = ModbusSparseDataBlock({1: [0, 0]})
holding_reg_block = ModbusSparseDataBlock({1: [0, 0]})
discrete_block = ModbusSparseDataBlock({0: 0})
coil_block = ModbusSparseDataBlock({})
store = ModbusSlaveContext(ir=input_reg_block, hr=holding_reg_block, di=discrete_block, co=coil_block)

context = ModbusServerContext(slaves=store, single=True)

logic_thread = threading.Thread(target=update_control_logic)
logic_thread.start()

StartTcpServer(context=context, address=("localhost", 502))
