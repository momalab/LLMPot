import random
import time

from tqdm import tqdm

from dataset_generation.mbtcp_process_control.client import MbtcpClient, retrieve_args


class P3Client(MbtcpClient):
    def start_client(self):
        for _ in tqdm(range(int(self._samples_num/10))):
            mixing_status = random.choice([True, False])

            functions = [(self._client.read_discrete_input, [0]),
                         (self._client.read_holding_register, [0]),
                         (self._client.read_holding_register, [1]),
                         (self._client.read_input_register, [0]),
                         (self._client.read_input_register, [1]),
                         (self._client.read_input_register, [2]),
                         (self._client.read_input_register, [3]),
                         (self._client.write_coil, [0, mixing_status])]

            flow_rate = random.randrange(0, 100)
            mixing_status = random.choice([True, False])

            ir_addresses = random.randint(2, 50)
            coil_addresses = random.randint(0, 50)
            di_addresses = random.randint(1, 50)
            hr_addresses = random.randint(2, 50)
            exception_function = [(self._client.read_holding_register, [hr_addresses]),
                                  (self._client.read_input_register, [ir_addresses]),
                                  (self._client.write_holding_register, [hr_addresses, flow_rate]),
                                  (self._client.read_discrete_input, [di_addresses]),
                                  (self._client.write_coil, [coil_addresses, mixing_status])]

            function, args = random.choice(exception_function)
            exceptions = [(self._client.illegal_function, []), (function, [*args])]
            functions.extend(exceptions)

            random.shuffle(functions)

            for function, args in functions:
                function(*args)
                time.sleep(0.05)


def main():
    ip, port, samples_num = retrieve_args()
    client = P3Client(ip, port, samples_num)
    try:
        client.connect()

        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()


if __name__ == '__main__':
    main()
