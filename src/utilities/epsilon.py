import dis
import json
import traceback

import pandas as pd
from typing import Tuple
from pymodbus.constants import Endian
from pymodbus.payload import BinaryPayloadDecoder

def calculate_error_margin(path: str, file: str) -> Tuple[float, float, float]:
    with open(f"{path}/{file}.jsonl", "r") as data:
        data = [json.loads(line) for line in data]

    return calculate(pd.DataFrame(data), path, file)

def calculate(df: pd.DataFrame, path, file):

    results_data = []
    for _, row in df.iterrows():
        distance = -1
        percentage = -1
        try:
            context: str = row['context']
            request: str = row['request']
            response: str = row['response']
            expected_response = row['expected_response']

            bytes.fromhex(response) # just check if it is a valid packet

            context = context.split(":")[0]
            i1 = int(context[-8:][0:4], 16)
            i2 = int(context[-8:][4:8], 16)

            r1 = int(response[-8:][0:4], 16)
            r2 = int(response[-8:][4:8], 16)

            er1 = int(expected_response[-8:][0:4], 16)
            er2 = int(expected_response[-8:][4:8], 16)

            i_dec = BinaryPayloadDecoder.fromRegisters([i1, i2], Endian.BIG, wordorder=Endian.LITTLE)
            r_dec = BinaryPayloadDecoder.fromRegisters([r1, r2], Endian.BIG, wordorder=Endian.LITTLE)
            er_dec = BinaryPayloadDecoder.fromRegisters([er1, er2], Endian.BIG, wordorder=Endian.LITTLE)

            i_dec = i_dec.decode_32bit_float()
            r_dec = r_dec.decode_32bit_float()
            er_dec = er_dec.decode_32bit_float()

            distance = r_dec - er_dec
            percentage = abs(distance) / er_dec
        except:
            traceback.print_exc()
            pass
        finally:
            results_data.append({
                'x': i_dec,
                'y': r_dec,
                'y_orig': er_dec,
                'request': request,
                'response': response,
                'expected_response': expected_response,
                'distance': distance,
                'percentage': percentage})


    results = pd.DataFrame(results_data)
    results.to_json(f"{path}/epsilon-{file}.jsonl", orient='records', lines=True)
    mean_value = results['distance'].mean()
    std_dev = results['distance'].std()
    mean_percentage = results['percentage'].mean()

    print(f"Mean: {mean_value}, std: {std_dev}, mean_percentage: {mean_percentage}")

    return mean_value, std_dev, mean_percentage


if __name__ == "__main__":
    calculate_error_margin("/media/shared/ICSPot/checkpoints/mbtcp-sigmoid-test.json/mbtcp-sigmoid_test-c1-s4096", "val_type_exact-model_mbtcp-sigmoid-c1-s4096")