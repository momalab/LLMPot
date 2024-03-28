import random
from tqdm import tqdm
from typing import List, Callable, Any

from dataset_generation.mbtcp.client import MbtcpClient, retrieve_args


class P3Client(MbtcpClient):
    def generate_random_args_for_function(self, function):
        if function in [self.read_holding_registers, self.read_input_registers]:
            return [random.randint(2, 50)]  # Example argument structure for these functions
        elif function == self.write_registers:
            return [random.randint(2, 50), random.randrange(0, 100)]
        elif function == self.read_discrete_inputs:
            return [random.randint(1, 50)]
        elif function == self.write_coil:
            return [random.randint(0, 50), random.choice([True, False])]
        else:
            return []  # Default case if no specific arguments are required

    def start_client(self):
        for _ in tqdm(range(int(self._samples_num/9))):
            # valid_functions: List[tuple[Callable[..., Any], List[Any]]] = []
            functions = [(self.read_discrete_inputs, [0]),
                         (self.read_holding_registers, [0]),
                         (self.read_holding_registers, [1]),
                         (self.read_input_registers, [0]),
                         (self.read_input_registers, [1]),
                         (self.read_input_registers, [2]),
                         (self.read_input_registers, [3])]

            flow_rate = random.randrange(0, 100)
            mixing_status = random.choice([True, False])
            # exception_function: List[tuple[Callable[..., Any], List[Any]]] = []
            for i in range(2):
                ir_addresses = random.randint(2, 50)
                coil_addresses = random.randint(0, 50)
                di_addresses = random.randint(1, 50)
                hr_addresses = random.randint(2, 50)
                exception_function = [(self.read_holding_registers, [hr_addresses]),
                                    (self.read_input_registers, [ir_addresses]),
                                    (self.write_registers, [hr_addresses, flow_rate]),
                                    (self.read_discrete_inputs, [di_addresses]),
                                    (self.write_coil, [coil_addresses, mixing_status])]

            function, args = random.choice(exception_function)
            exceptions = [(self.illegal_function, [])]
            for _ in range(2):  # Loop twice to add the function with random args each time
                args = self.generate_random_args_for_function(function)
                exceptions.append((function, args))

            functions.extend(exceptions)
            random.shuffle(functions)
            self.execute_functions(functions)

            # functions = valid_functions + exceptions
            # random.shuffle(functions)
            # if self.dry_run:
            #     return self.execute_functions(functions)
            # else:
            #     self.execute_functions(functions)


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
