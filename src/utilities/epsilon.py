import dis
import json
import sys
import traceback
from typing import Tuple
from unittest import result

import pandas as pd
from param import Callable
from pymodbus.constants import Endian
from pymodbus.payload import BinaryPayloadDecoder

from cfg import CHECKPOINTS


def calculate_error_margin(path: str, file: str, output_registers: int, input_registers: int, func) -> Tuple[float, float, float]:
    with open(f"{path}/{file}.jsonl", "r") as data:
        data = [json.loads(line) for line in data]

    return calculate(pd.DataFrame(data), path, file, output_registers, input_registers, func)

def calculate(df: pd.DataFrame, path: str, file: str, output_registers: int, input_registers: int, func) -> Tuple[float, float, float]:

    results_data = []
    for _, row in df.iterrows():
        if func == "int":
            if input_registers == 4:
                input_func = BinaryPayloadDecoder.decode_64bit_int
            elif input_registers == 2:
                input_func = BinaryPayloadDecoder.decode_32bit_int
            else:
                input_func = BinaryPayloadDecoder.decode_16bit_uint
            if output_registers == 4:
                output_func = BinaryPayloadDecoder.decode_64bit_int
            elif output_registers == 2:
                output_func = BinaryPayloadDecoder.decode_32bit_int
            else:
                output_func = BinaryPayloadDecoder.decode_16bit_uint
        else:
            if input_registers == 4:
                input_func = BinaryPayloadDecoder.decode_64bit_float
            elif input_registers == 2:
                input_func = BinaryPayloadDecoder.decode_32bit_float
            else:
                input_func = BinaryPayloadDecoder.decode_16bit_float
            if output_registers == 4:
                output_func = BinaryPayloadDecoder.decode_64bit_float
            elif output_registers == 2:
                output_func = BinaryPayloadDecoder.decode_32bit_float
            else:
                output_func = BinaryPayloadDecoder.decode_16bit_float

        distance = "invalid"
        percentage = "invalid"
        x, y, y_orig = "invalid", "invalid", "invalid"
        context: str = row['context']
        request: str = row['request']
        response: str = row['response']
        expected_response = row['expected_response']
        try:

            bytes.fromhex(response) # just check if it is a valid packet

            # reg_values = context.split(":")[0][-4*input_registers:]
            # context_chunks = [reg_values[i:i + 4] for i in range(0, len(reg_values), 4)]
            # context_chunks = [int(chunk, 16) for chunk in context_chunks]

            reg_values = response[-4*output_registers:]
            response_chunks = [reg_values[i:i + 4] for i in range(0, len(reg_values), 4)]
            response_chunks = [int(chunk, 16) for chunk in response_chunks]

            reg_values = expected_response[-4*output_registers:]
            e_response_chunks = [reg_values[i:i + 4] for i in range(0, len(reg_values), 4)]
            e_response_chunks = [int(chunk, 16) for chunk in e_response_chunks]

            # x = BinaryPayloadDecoder.fromRegisters(context_chunks, Endian.BIG, wordorder=Endian.LITTLE)
            y = BinaryPayloadDecoder.fromRegisters(response_chunks, Endian.BIG, wordorder=Endian.LITTLE)
            y_orig = BinaryPayloadDecoder.fromRegisters(e_response_chunks, Endian.BIG, wordorder=Endian.LITTLE)

            # x = input_func(x)
            y = output_func(y)
            y_orig = output_func(y_orig)

            distance = abs(y - y_orig)
            if y_orig != 0:
                percentage = abs(distance / y_orig)
            elif y != 0:
                percentage = abs(distance / y)
            else:
                percentage = 0
        except:
            # traceback.print_exc()
            pass
        finally:
            results_data.append({
                'context': context,
                'request': request,
                'response': response,
                'expected_response': expected_response,
                'distance': distance,
                'x': x,
                'y': y,
                'y_orig': y_orig,
                'percentage': percentage})


    results = pd.DataFrame(results_data)
    results.to_json(f"{path}/epsilon-{file}.jsonl", orient='records', lines=True)
    results.query(f"distance != 'invalid'", inplace=True)
    print(f"Total: {len(results)}")
    mean_value = results['distance'].mean()
    std_dev = results['distance'].std()
    mean_percentage = results['percentage'].mean()


    # for _, row in results.iterrows():
    #     if row['distance'] > 0.1:
    #         print(f"X: {row['x']}, Y: {row['y']}, Y_orig: {row['y_orig']}, distance: {row['distance']}, percentage: {row['percentage']}")

    print(f"Mean: {mean_value}, std: {std_dev}, mean_percentage: {mean_percentage}")

    return mean_value, std_dev, mean_percentage


if __name__ == "__main__":
    calculate_error_margin(f"{CHECKPOINTS}/mbtcp-testbed.json/mbtcp-none-c1-s1600/20240626T1729", "epoch-99_val_type-exact", 1, 1, "int")
