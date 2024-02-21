import random
import time
import threading

from pymodbus.datastore import ModbusServerContext, ModbusSlaveContext
from pymodbus.server.async_io import StartTcpServer
from pymodbus.datastore import ModbusSparseDataBlock


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


def update_control_logic(store):
    while True:
        time.sleep(0.5)
        flow_rate_a_int, flow_rate_a_decimal, flow_rate_b_int, flow_rate_b_decimal = store.getValues(0x04, 0, count=4)
        flow_rate_a = float(f"{flow_rate_a_int}.{flow_rate_a_decimal}")
        flow_rate_b = float(f"{flow_rate_b_int}.{flow_rate_b_decimal}")
        flow_rate_a, flow_rate_b = adjust_flows(flow_rate_a, flow_rate_b, 3, 0.01, 0.5)

        if is_ratio_within_tolerance(flow_rate_a, flow_rate_b, 3, 0.05):

            random_num = random.randint(0, 10)
            if random_num > 7:
                flow_rate_a = random.randint(1, 10)
                flow_rate_b = random.randint(1, 10)

        new_flow_rate_a, new_flow_rate_b = flow_rate_a, flow_rate_b
        store.setValues(0x04, 0, [int(str(new_flow_rate_a).split('.')[0])])
        store.setValues(0x04, 1, [int(str('{0:.2f}'.format(new_flow_rate_a)).split('.')[1])])
        store.setValues(0x04, 2, [int(str(new_flow_rate_b).split('.')[0])])
        store.setValues(0x04, 3, [int(str('{0:.2f}'.format(new_flow_rate_b)).split('.')[1])])


def main():
    input_reg_block = ModbusSparseDataBlock({1: [2, 0, 3, 0]})
    holding_reg_block = ModbusSparseDataBlock({1: [0, 0]})
    discrete_block = ModbusSparseDataBlock({0: 0})  # mixing_process_status (Start/Stop)
    coil_block = ModbusSparseDataBlock({})
    store = ModbusSlaveContext(ir=input_reg_block, hr=holding_reg_block, di=discrete_block, co=coil_block)

    context = ModbusServerContext(slaves=store, single=True)

    logic_thread = threading.Thread(target=update_control_logic, args=[store], daemon=True)
    logic_thread.start()

    StartTcpServer(context=context, address=("localhost", 5020))


if __name__ == '__main__':
    main()

