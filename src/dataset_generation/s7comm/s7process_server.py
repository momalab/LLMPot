import time
import snap7
import threading
from snap7.server import Server
from snap7.types import wordlen_to_ctypes, WordLen, srvAreaDB
from snap7.util import get_real, set_real

def update_control_logic():
    while True:
        temperature = server.read_area(0x84, 1, 0, 1, snap7.types.S7WLByte)
        temperature = get_real(temperature, 0)
        # temperature = db.get_value([0], 'INT')
        print(f"temp: {temperature}")
        
        if temperature > 25:
            cooling_status = server.write_area(0x83, 1, 0, [1])
            # db.set_value([0], 'BOOL', [1])
            print(f"cooling status ON: {cooling_status}")
        else:
            cooling_status = server.write_area(0x83, 1, 0, [0])
            # db.set_value([0], 'BOOL', [0])
            print(f"cooling status OFF: {cooling_status}")
        time.sleep(0.1)

server = Server() #true for event logging

size = 2
DBdata = (wordlen_to_ctypes[WordLen.Byte.value] * size)() #WordLen.Byte.value = 0x02
server.register_area(srvAreaDB, 0, DBdata) #area_code, index, userdata

logic_thread = threading.Thread(target=update_control_logic)
logic_thread.start()

server.start_to('192.168.0.1', 102)
server.get_status()
