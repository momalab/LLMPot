import random
import time

from dataset_generation.mbtcp.server import MbtcpServer, retrieve_args


class P3Server(MbtcpServer):
    def __init__(self, ip: str, port: int):
        super().__init__(ip, port, {1: [2, 0, 3, 0]}, {1: [0, 0]}, {0: 0}, {})

    def update_control_logic(self):
        while True:
            time.sleep(0.1)
            flow_rate_a_int, flow_rate_a_decimal, flow_rate_b_int, flow_rate_b_decimal = self._store.getValues(0x04, 0, count=4)
            flow_rate_a = float(f"{flow_rate_a_int}.{flow_rate_a_decimal}")
            flow_rate_b = float(f"{flow_rate_b_int}.{flow_rate_b_decimal}")
            flow_rate_a, flow_rate_b = self.__adjust_flows(flow_rate_a, flow_rate_b, 3, 0.01, 0.5)

            if self.__is_ratio_within_tolerance(flow_rate_a, flow_rate_b, 3, 0.05):

                random_num = random.randint(0, 10)
                if random_num > 7:
                    flow_rate_a = random.randint(1, 10)
                    flow_rate_b = random.randint(1, 10)

            new_flow_rate_a, new_flow_rate_b = flow_rate_a, flow_rate_b
            self._store.setValues(0x04, 0, [int(str(new_flow_rate_a).split('.')[0])])
            self._store.setValues(0x04, 1, [int(str('{0:.2f}'.format(new_flow_rate_a)).split('.')[1])])
            self._store.setValues(0x04, 2, [int(str(new_flow_rate_b).split('.')[0])])
            self._store.setValues(0x04, 3, [int(str('{0:.2f}'.format(new_flow_rate_b)).split('.')[1])])

    @staticmethod
    def __adjust_flows(current_a, current_b, target_ratio, min_step, max_step):
        current_ratio = current_a / current_b if current_b != 0 else float('inf')
        ratio_diff = target_ratio - current_ratio
        step_size = max(min_step, min(max_step, abs(ratio_diff) * max_step))

        if ratio_diff > 0:
            adjusted_a = current_a + step_size
            adjusted_b = current_b - step_size * (current_b / current_a) if current_a != 0 else current_b - step_size
        else:
            adjusted_a = current_a - step_size * (current_a / current_b) if current_b != 0 else current_a - step_size
            adjusted_b = current_b + step_size

        adjusted_a = max(0, adjusted_a)
        adjusted_b = max(0, adjusted_b)

        return adjusted_a, adjusted_b

    @staticmethod
    def __is_ratio_within_tolerance(current_a, current_b, target_ratio, tolerance):
        if current_b == 0:
            return False
        current_ratio = current_a / current_b
        return abs(current_ratio - target_ratio) <= tolerance


def main():
    ip, port = retrieve_args()
    server = P3Server(ip, port)
    server.start()


if __name__ == '__main__':
    main()
