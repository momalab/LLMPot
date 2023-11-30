import random
from pymodbus.pdu import ModbusRequest
from pymodbus.exceptions import NotImplementedException

class CustomInvalidFunctionRequest(ModbusRequest):
    def __init__(self, custom_function_code, **kwargs):
        ModbusRequest.__init__(self, **kwargs)
        self.function_code = custom_function_code
    
    def encode(self):
        # Implement encoding for your request
        query = random.choice(["0016007f", "007800030648d6e5bfe1d5", "006d0008", "006c0008102c5686f7199796b3ad180010b9f2c49cb7b9", "00720006", "0074000a"]) 
        return bytes.fromhex(query)


    def decode(self, data):
        # Implement decoding for your request
        pass
