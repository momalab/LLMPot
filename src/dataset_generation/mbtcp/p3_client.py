import random
from tqdm import tqdm
from typing import List, Callable, Any

from dataset_generation.mbtcp.client import MbtcpClient, retrieve_args


class P3Client(MbtcpClient):

    def start_client(self):
        for _ in tqdm(range(int(self._samples_num/9))):
            functions = [(self.read_discrete_inputs, [0], []),
                         (self.read_holding_registers, [0], []),
                         (self.read_holding_registers, [1], []),
                         (self.read_input_registers, [0], []),
                         (self.read_input_registers, [1], []),
                         (self.read_input_registers, [2], []),
                         (self.read_input_registers, [3], [])]

            flow_rate = random.randrange(0, 100)
            mixing_status = random.choice([True, False])
            exception_function: List[tuple[Callable[..., Any], List[Any]]] = []
            for i in range(2):
                ir_addresses = random.randint(2, 50)
                coil_addresses = random.randint(0, 50)
                di_addresses = random.randint(1, 50)
                hr_addresses = random.randint(2, 50)
                exception_function = [(self.read_holding_registers, [hr_addresses], []),
                                      (self.read_input_registers, [ir_addresses], []),
                                      (self.write_registers, [hr_addresses, flow_rate], []),
                                      (self.read_discrete_inputs, [di_addresses], []),
                                      (self.write_coil, [coil_addresses, mixing_status], [])]

            selected_functions = random.choices(exception_function, k=2)
            exceptions = [(self.illegal_function, [], [])]
            exceptions.extend(selected_functions)

            functions.extend(exceptions)
            random.shuffle(functions)
            if self.dry_run:
                return self.execute_functions(functions)
            else:
                self.execute_functions(functions)


def main():
    ip, port, samples_num = retrieve_args()
    client = P3Client(ip, port, samples_num)
    try:
        client.start_client()
    except KeyboardInterrupt:
        print("Client stopped by user.")
    finally:
        client.close()


if __name__ == '__main__':
    main()
