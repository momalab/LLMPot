import time

from pymodbus.constants import Endian
from pymodbus.payload import BinaryPayloadBuilder

from dataset_generation.test_bed.client import MbtcpClient, retrieve_args


class TestbedClient(MbtcpClient):
    def start_client(self):
        duration = 80
        interval = duration / self.samples_num

        slot = 0
        setpoint_address = 5
        ws_address = 3

        start_time = time.time()
        while time.time() - start_time < duration:

            slot_time = time.time() - start_time

            if slot_time > 20:
                builder = BinaryPayloadBuilder(byteorder=Endian.BIG, wordorder=Endian.LITTLE)
                builder.add_32bit_float(float(self.sps[slot]))
                setpoint_new = builder.build()
                self.write_register(setpoint_address, setpoint_new, skip_encode=True)
                slot += 1
                time.sleep(0.05)

            register_value = self.read_holding_registers(ws_address, 1)
            print(f"Register {register_value}")

            time.sleep(interval)



def main():
    ip, port, samples_num, sps = retrieve_args()
    client = TestbedClient(ip, port, samples_num, sps)
    try:
        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()


if __name__ == '__main__':
    main()
