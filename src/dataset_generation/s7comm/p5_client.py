from dataset_generation.s7comm.client import S7Client


class P5Client(S7Client):

    def start_client(self):
        functions = [(self.read_area, [0x84, 0, 0, 1])]

        for function, args in functions:
            self.func_wrapper(function(*args))