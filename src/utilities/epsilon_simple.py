import json
from typing import Tuple

import pandas as pd

from cfg import CHECKPOINTS


def calculate_error_margin(path: str, file: str) -> Tuple[float, float, float]:
    with open(f"{path}/{file}.jsonl", "r") as data:
        data = [json.loads(line) for line in data]

    return calculate(pd.DataFrame(data), path, file)

def calculate(df: pd.DataFrame, path: str, file: str) -> Tuple[float, float, float]:

    results_data = []
    for _, row in df.iterrows():
        distance = "invalid"
        percentage = "invalid"
        x, y, y_orig = "invalid", "invalid", "invalid"
        try:
            x = float(row['request'])
            y = float(row['response'])
            y_orig = float(row['expected_response'])

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
                'distance': distance,
                'x': x,
                'y': y,
                'y_orig': y_orig,
                'percentage': percentage})


    results = pd.DataFrame(results_data)
    results.to_json(f"{path}/epsilon-{file}.jsonl", orient='records', lines=True)
    results.query("distance != 'invalid'", inplace=True)
    mean_value = results['distance'].sum() / len(results['distance'])
    std_dev = results['distance'].std()
    mean_percentage = results['percentage'].mean()


    print(f"Mean: {round(mean_value, 4)}, std: {round(std_dev, 4)}, mean_percentage: {mean_percentage}")

    return mean_value, std_dev, mean_percentage


if __name__ == "__main__":
    calculate_error_margin(f"{CHECKPOINTS}/mbtcp-testbed.json/mbtcp-none-c1-s1600/", "")
