import trace
import traceback
from pycomm3 import CIPDriver, LogixDriver

# ENIP client using pycomm3
class ENIPClientPycomm:
    def __init__(self, server_host="127.0.0.1"):
        self.server_host = server_host

    def connect_and_send_request(self):
        try:
            # Connect to the server (or PLC) using pycomm3's CIPDriver
            with LogixDriver('localhost') as plc:
                id = plc._register_session()
                print(f"Session ID: {id}")
                return plc.read('DINT1')

                if result:
                    print(f"Received data from server: {result}")
                else:
                    print("No response or error in reading data")

        except Exception as e:
            traceback.print_exc()
            print(f"Failed to communicate with ENIP server: {e}")

if __name__ == "__main__":
    client = ENIPClientPycomm()
    client.connect_and_send_request()
