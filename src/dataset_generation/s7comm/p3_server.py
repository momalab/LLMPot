import random
import time
import logging
from snap7.server import Server
from snap7.types import wordlen_to_ctypes, WordLen, srvAreaDB, srvAreaMK


def setup_logging():
    logging.basicConfig(format='%(asctime)s %(levelname)-8s %(message)s',
                        level=logging.DEBUG,
                        datefmt='%Y-%m-%d %H:%M:%S')


def adjust_flows(current_a, current_b, target_ratio, min_step, max_step):
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


def is_ratio_within_tolerance(current_a, current_b, target_ratio, tolerance):
    if current_b == 0:
        return False
    current_ratio = current_a / current_b
    return abs(current_ratio - target_ratio) <= tolerance


def start_server():

    setup_logging()
    logging.info("Starting S7comm Server..")
    server = Server()

    size = 2
    DBdata = (wordlen_to_ctypes[WordLen.Byte.value] * size)()
    server.register_area(srvAreaDB, 3, DBdata)

    try:
        server.start_to('127.0.0.1', 102)
        server.get_status()
    except Exception as e:
        logging.error(f"Failed to start server: {e}")
        raise

    try:
        while True:
            time.sleep(0.5)
            flow_rate_a_int =  int.from_bytes(DBdata[0], byteorder='big')
            flow_rate_a_decimal = int.from_bytes(DBdata[1], byteorder='big')
            flow_rate_b_int = int.from_bytes(DBdata[2], byteorder='big')
            flow_rate_b_decimal = int.from_bytes(DBdata[3], byteorder='big')

            flow_rate_a = float(f"{flow_rate_a_int}.{flow_rate_a_decimal}")
            flow_rate_b = float(f"{flow_rate_b_int}.{flow_rate_b_decimal}")
            flow_rate_a, flow_rate_b = adjust_flows(flow_rate_a, flow_rate_b, 3, 0.01, 0.5)

            if is_ratio_within_tolerance(flow_rate_a, flow_rate_b, 3, 0.05):

                random_num = random.randint(0, 10)
                if random_num > 7:
                    flow_rate_a = random.randint(1, 10)
                    flow_rate_b = random.randint(1, 10)

            new_flow_rate_a, new_flow_rate_b = flow_rate_a, flow_rate_b
            DBdata[0] = int(str(new_flow_rate_a).split('.')[0])
            DBdata[1] = int(str('{0:.2f}'.format(new_flow_rate_a)).split('.')[1])
            DBdata[2] = int(str(new_flow_rate_b).split('.')[0])
            DBdata[3] = int(str('{0:.2f}'.format(new_flow_rate_b)).split('.')[1])

    except KeyboardInterrupt:
        print("Server is stopping...")
        server.stop()
        server.destroy()

if __name__ == '__main__':
    start_server()
