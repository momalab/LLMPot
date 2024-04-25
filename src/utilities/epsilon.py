import json
import traceback

import pandas as pd
from typing import Tuple

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
            request: str = row['request']
            response: str = row['response']
            expected_response = row['expected_response']

            try:
                distance = abs(float(response) - float(expected_response))
                percentage = distance / float(response)
            except ValueError:
                distance_hex = hex_xor_difference(response, expected_response)
                distance = int(distance_hex, 16)
                percentage = int(distance_hex, 16) / int(response, 16)

        except:
            pass
        finally:
            results_data.append({'request': request,
                                 'response': response,
                                 'expected_response': expected_response,
                                 'distance': distance,
                                 'percentage': percentage})


    results = pd.DataFrame(results_data)
    results.to_json(f"{path}/epsilon-{file}.jsonl", orient='records', lines=True)
    mean_value = results['distance'].mean()
    std_dev = results['distance'].std()
    mean_percentage = results['percentage'].mean()

    return mean_value, std_dev, mean_percentage


def hex_xor_difference(hex1, hex2):
    bytes1 = bytes.fromhex(hex1)
    bytes2 = bytes.fromhex(hex2)

    max_len = max(len(bytes1), len(bytes2))
    bytes1 = bytes1.ljust(max_len, b'\x00')
    bytes2 = bytes2.ljust(max_len, b'\x00')

    xor_result = bytes(a ^ b for a, b in zip(bytes1, bytes2))
    return xor_result.hex()


if __name__ == "__main__":
    calculate_error_margin("/media/shared/ICSPot/checkpoints/mbtcp-protocol-emulation.json.old_new/mbtcp-boundaries_client-c0-s200-f1_5_15_3_6_16-v0_65535-a0_39-sc40-sr40/20240410T1729", "epoch-71_val_type-micro")