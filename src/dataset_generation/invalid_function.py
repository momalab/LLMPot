import random
from pymodbus.pdu import ModbusRequest


class CustomInvalidFunctionRequest(ModbusRequest):
    def __init__(self, custom_function_code, **kwargs):
        ModbusRequest.__init__(self, **kwargs)
        self.function_code = custom_function_code

    def encode(self):
        hex_chars = '0123456789abcdef'
        length = random.choice([16, 32, 48]) #max 2024  bits
        hex_request = ''.join(random.choice(hex_chars) for _ in range(length))
        return bytes.fromhex(hex_request)

    def decode(self, data):
        pass
