import argparse
import json
import os
import re
from typing import Tuple

import pandas as pd
from pymodbus.constants import Endian
from pymodbus.payload import BinaryPayloadDecoder

from finetune.model.finetuner_model import FinetunerModel
from utilities.utils import load_cfg


def calculate_error_margin(finetuner_model: FinetunerModel, file: str, output_registers: int, input_registers: int, func) -> Tuple[float, float, float]:
    with open(f"{finetuner_model.experiment_instance_result_path}/{file}", "r") as data:
        data = [json.loads(line) for line in data]

    return calculate(pd.DataFrame(data), finetuner_model.experiment_instance_result_path, file, output_registers, input_registers, func)

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
    results.query("distance != 'invalid'", inplace=True)
    print(f"Total: {len(results)}")
    mean_value = results['distance'].mean()
    std_dev = results['distance'].std()
    mean_percentage = results['percentage'].mean()


    # for _, row in results.iterrows():
    #     if row['distance'] > 0.1:
    #         print(f"X: {row['x']}, Y: {row['y']}, Y_orig: {row['y_orig']}, distance: {row['distance']}, percentage: {row['percentage']}")

    print(f"Mean: {mean_value}, std: {std_dev}, mean_percentage: {mean_percentage}")

    return mean_value, std_dev, mean_percentage

def find_latest_jsonl_file(directory: str) -> str:
    jsonl_files = [f for f in os.listdir(directory) if f.endswith('.jsonl')]
    if not jsonl_files:
        raise FileNotFoundError("No .jsonl files found in the directory")

    def extract_epoch_number(filename: str) -> int:
        match = re.search(r'epoch-(\d+)_val_type-exact\.jsonl', filename)
        return int(match.group(1)) if match else -1

    latest_file = max(jsonl_files, key=extract_epoch_number)
    return latest_file

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-exp', default="mbtcp-math-functions.json", required=False)
    parser.add_argument('-timestamp', default="20240427T1812", required=False)
    args = parser.parse_args()

    finetuner_model = load_cfg("byt5-small", args.exp, timestamp=args.timestamp)


    latest_file = find_latest_jsonl_file(finetuner_model.experiment_instance_result_path)
    print(f"Latest file: {latest_file}")

    calculate_error_margin(finetuner_model, latest_file, 1, 1, "int")

if __name__ == "__main__":
    main()
