import random
import time
import pandas as pd
from datetime import datetime
from pymodbus.constants import Endian
from pymodbus.payload import BinaryPayloadBuilder
from dataset_generation.test_bed.client import MbtcpClient, retrieve_args


class TestbedClient(MbtcpClient):
    def start_client(self):
        df = pd.DataFrame(columns=["Timestamp"])

        start_time = time.time()
        previous_register_value = None
        unchanged_intervals = 0
        duration = 60 # Total duration for sampling in seconds
        max_unchanged_intervals = 5 # Maximum number of consecutive unchanged intervals before stopping
        interval = 1 # Sampling interval in seconds

        while time.time() - start_time < duration:
            functions = []
            timestamp = datetime.now()

            # for _ in range(self._samples_num):

            setpoint_address = 5
            ws_address = 3
            df.loc[len(df)] = [timestamp]

            builder = BinaryPayloadBuilder(byteorder=Endian.BIG, wordorder=Endian.LITTLE)
            initial_setpoint = 150 # initial value is 93.0
            builder.add_32bit_float(initial_setpoint)
            new_setpoint = builder.build()

            if self._update_setpoint == "False":
                functions.extend([
                    (self.read_holding_registers, [setpoint_address, 2], {}),
                    (self.read_holding_registers, [ws_address, 1], {})])
            else:
                functions.extend([
                    (self.write_registers, [setpoint_address, new_setpoint], {"skip_encode": True}),
                    (self.read_holding_registers, [ws_address, 1], {})])

            for function, args, kwargs in functions:
                response = function(*args, **kwargs)
                if function.__name__ == self.read_holding_registers.__name__:
                    register_value = response.register
                    print(f"Register {register_value}")

                    if register_value == previous_register_value:
                        unchanged_intervals += 1
                    else:
                        unchanged_intervals = 0
                        previous_register_value = register_value

                    if unchanged_intervals >= max_unchanged_intervals:
                        print("Register value stopped changing. Stopping sampling.")
                        break

            time.sleep(interval)
            df.to_csv('modbus_timestamps.csv', index=False)


def main():
    ip, port, samples_num, update_setpoint = retrieve_args()
    client = TestbedClient(ip, port, samples_num, update_setpoint)
    try:
        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()


if __name__ == '__main__':
    main()
