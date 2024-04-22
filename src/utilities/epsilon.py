import json

import pandas as pd
from typing import Tuple

def calculate_error_margin(path: str, file: str) -> Tuple[float, float, float]:
    with open(f"{path}/{file}.jsonl", "r") as data:
        data = [json.loads(line) for line in data]

    df = pd.DataFrame(data)

    results_data = []
    for i, row in df.iterrows():
        try:
            response = row['response']
            request = row['request']
            expected_response = row['expected_response']

            distance = abs(float(response) - float(expected_response))
            percentage = distance / request
            results_data.append({'request': request,
                                 'response': response,
                                 'expected_response': expected_response,
                                 'distance': distance,
                                 'percentage': percentage})
        except:
            print(f"Error in row {i}")

    results = pd.DataFrame(results_data)
    results.to_json(f"{path}/epsilon-{file}.jsonl", orient='records', lines=True)
    mean_value = results['distance'].mean()
    std_dev = results['distance'].std()
    mean_percentage = results['percentage'].mean()

    return mean_value, std_dev, mean_percentage
