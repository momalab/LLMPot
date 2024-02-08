import time
import threading
from pymodbus.datastore import ModbusServerContext, ModbusSlaveContext
from pymodbus.server.async_io import StartTcpServer
from pymodbus.datastore import ModbusSparseDataBlock

class PIDController:
    def __init__(self, kp, ki, kd, setpoint):
        self.kp = kp
        self.ki = ki
        self.kd = kd
        self.setpoint = setpoint #setpoints for the desired mixture composition
        self.previous_error = 0
        self.integral = 0

    def update(self, measured_value, dt):
        error = self.setpoint - measured_value
        self.integral += error * dt
        derivative = (error - self.previous_error) / dt
        output = self.kp * error + self.ki * self.integral + self.kd * derivative
        self.previous_error = error
        return output


def adjust_flow_rates(flow_rate_a, flow_rate_b, flow_rate_adjustment):
    proportion_a = flow_rate_a / (flow_rate_a + flow_rate_b)
    proportion_b = flow_rate_b / (flow_rate_a + flow_rate_b)
    new_flow_rate_a = abs(flow_rate_a + (flow_rate_adjustment * proportion_a))
    new_flow_rate_b = abs(flow_rate_b + (flow_rate_adjustment * proportion_b))
    return new_flow_rate_a, new_flow_rate_b


def adjust_valve_positions(valve_position_a, valve_position_b, flow_rate_adjustment):
    # Assuming you want to adjust both valves inversely related to the adjustment
    valve_position_a += flow_rate_adjustment
    valve_position_b -= flow_rate_adjustment
    new_valve_position_a = max(0, min(100, valve_position_a))
    new_valve_position_b = max(0, min(100, valve_position_b))
    return new_valve_position_a, new_valve_position_b


def update_control_logic():
    while True:
        dt = 1
        desired_ratio = 3
        pid = PIDController(kp=1, ki=0.1, kd=0.05, setpoint=desired_ratio)
        flow_rate_a, flow_rate_b = store.getValues(0x03, 0, count=2)
        valve_position_a, valve_position_b = store.getValues(0x04, 0, count=2)

        # Assuming measured_composition is the ratio of flow_rate_a by flow_rate_b
        if flow_rate_b == 0:
            current_ratio = float('inf')  # Avoid division by zero
            store.setValues(0x02, 0, [False])
        else:
            current_ratio = int(flow_rate_a /flow_rate_b)*100

            if current_ratio != desired_ratio:
                store.setValues(0x02, 0, [True])
                print(f"current_ratio = {current_ratio}")
                flow_rate_adjustment = pid.update(current_ratio, dt)
                print(f"flow_rate_adjustment = {flow_rate_adjustment}")

                new_flow_rate_a, new_flow_rate_b = adjust_flow_rates(flow_rate_a, flow_rate_b, flow_rate_adjustment)
                print(f"new_flow_rate_a: {int(new_flow_rate_a)}")
                print(f"new_flow_rate_b: {int(new_flow_rate_b)}")
                store.setValues(0x03, 0, [int(new_flow_rate_a)])
                store.setValues(0x03, 1, [int(new_flow_rate_b)])

                new_valve_position_a, new_valve_position_b = adjust_valve_positions(valve_position_a, valve_position_b, flow_rate_adjustment)
                print(f"new_valve_position_a: {int(new_valve_position_a)}")
                print(f"new_valve_position_b: {int(new_valve_position_b)}")
                store.setValues(0x04, 0, [int(new_valve_position_a)])
                store.setValues(0x04, 1, [int(new_valve_position_b)])
            else:
                store.setValues(0x02, 0, [False])

        time.sleep(0.1)

input_reg_block = ModbusSparseDataBlock({1: [0, 0]})
holding_reg_block = ModbusSparseDataBlock({1: [0, 0]})
discrete_block = ModbusSparseDataBlock({0: 0}) # mixing_process_status (Start/Stop)
coil_block = ModbusSparseDataBlock({})
store = ModbusSlaveContext(ir=input_reg_block, hr=holding_reg_block, di=discrete_block, co=coil_block)

context = ModbusServerContext(slaves=store, single=True)

logic_thread = threading.Thread(target=update_control_logic)
logic_thread.start()

StartTcpServer(context=context, address=("localhost", 502))
