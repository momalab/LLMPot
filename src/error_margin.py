import json
import argparse
import pandas as pd
from cfg import VALIDATION


def calculate_error_margin(file_name):

    with open(f"{VALIDATION}/{file_name}.jsonl", "r") as file:
        data = [json.loads(line) for line in file]

    df = pd.DataFrame(data)
    invalid = df.query('valid == False')
    if not invalid.empty:
        invalid_df = invalid.copy()
    print(f"Total invalids = {len(invalid_df)}")

    for i, row in invalid_df.iterrows():
        response = row['response']
        expected_response = row['expected_response']

        if len(response) == len(expected_response):
            differences = sum(1 for resp, exp_resp in zip(response, expected_response) if resp != exp_resp)
            print(f"Response: {response}, Expected Response: {expected_response}, Digits Different: {differences}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-name', default="mbtcp-process2-1.2k_20240208T1631_epoch-55", required=False)
    args = parser.parse_args()

    file_name = args.name
    calculate_error_margin(file_name)


if __name__ == '__main__':
    main()
