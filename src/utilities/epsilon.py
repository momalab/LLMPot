import dis
import json
import traceback
from unittest import result

import pandas as pd
from typing import Tuple
from pymodbus.constants import Endian
from pymodbus.payload import BinaryPayloadDecoder
import sys

def calculate_error_margin(path: str, file: str, registers: int) -> Tuple[float, float, float]:
    with open(f"{path}/{file}", "r") as data:
        data = [json.loads(line) for line in data]

    return calculate(pd.DataFrame(data), path, file, registers)

def calculate(df: pd.DataFrame, path: str, file: str, registers: int) -> Tuple[float, float, float]:

    results_data = []
    for _, row in df.iterrows():
        distance = "invalid"
        percentage = "invalid"
        x, y, y_orig = "invalid", "invalid", "invalid"
        try:
            context: str = row['context']
            request: str = row['request']
            response: str = row['response']
            expected_response = row['expected_response']

            bytes.fromhex(response) # just check if it is a valid packet

            reg_values = context.split(":")[0][-4*registers:]
            context_chunks = [reg_values[i:i + 4] for i in range(0, len(reg_values), 4)]
            context_chunks = [int(chunk, 16) for chunk in context_chunks]

            reg_values = response[-4*registers:]
            response_chunks = [reg_values[i:i + 4] for i in range(0, len(reg_values), 4)]
            response_chunks = [int(chunk, 16) for chunk in response_chunks]

            reg_values = expected_response[-4*registers:]
            e_response_chunks = [reg_values[i:i + 4] for i in range(0, len(reg_values), 4)]
            e_response_chunks = [int(chunk, 16) for chunk in e_response_chunks]

            x = BinaryPayloadDecoder.fromRegisters(context_chunks, Endian.BIG, wordorder=Endian.LITTLE)
            y = BinaryPayloadDecoder.fromRegisters(response_chunks, Endian.BIG, wordorder=Endian.LITTLE)
            y_orig = BinaryPayloadDecoder.fromRegisters(e_response_chunks, Endian.BIG, wordorder=Endian.LITTLE)

            x = x.decode_32bit_float()
            y = y.decode_32bit_float()
            y_orig = y_orig.decode_32bit_float()

            distance = abs(y - y_orig)
            if y_orig != 0:
                percentage = distance / y_orig
            elif y != 0:
                percentage = distance / y
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
    mean_value = results['distance'].sum() / len(results['distance'])
    std_dev = results['distance'].std()
    mean_percentage = results['percentage'].mean()


    # for _, row in results.iterrows():
    #     if row['distance'] > 0.1:
    #         print(f"X: {row['x']}, Y: {row['y']}, Y_orig: {row['y_orig']}, distance: {row['distance']}, percentage: {row['percentage']}")

    print(f"Mean: {round(mean_value, 4)}, std: {round(std_dev, 4)}, mean_percentage: {mean_percentage}")

    return mean_value, std_dev, mean_percentage


if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python epsilon.py <experiment> <function> <epoch>")
        sys.exit(1)

    experiment = sys.argv[1]
    function = sys.argv[2]
    epoch = sys.argv[3]

    # calculate_error_margin(f"/media/shared/ICSPot/checkpoints/{experiment}.json/mbtcp-{function}-c1-s1024/20240429T0321/", f"epoch-{epoch}_val_type-exact.jsonl", 2)
    calculate_error_margin(f"/media/shared/ICSPot/checkpoints/{experiment}.json/mbtcp-{function}-c1-s4096", "val_type_exact-model_mbtcp-expo10_linear-c1-s1024.jsonl", 2)
