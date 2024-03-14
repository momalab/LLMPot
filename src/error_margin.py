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

    results_data = []
    for i, row in invalid_df.iterrows():
        response = row['response']
        expected_response = row['expected_response']
        hex_distance = 0
        if len(response) == len(expected_response):
            differences = sum(1 for resp, exp_resp in zip(response, expected_response) if resp != exp_resp)
            hex_distance += abs(int(response, 16) - int(expected_response, 16))
            print(f"Response: {response}, Expected Response: {expected_response}, Digits Different: {differences}, Hex Distance: {hex_distance}")

            results_data.append({'Response': response,
                            'Expected Response': expected_response,
                            'Digits Different': differences,
                            'Hex Distance': hex_distance})

    results = pd.DataFrame(results_data)
    results.to_json(f"{VALIDATION}/result_file-{file_name}.jsonl", orient='records', lines=True)
    mae_value = results['Hex Distance'].mean()
    std_dev = results['Hex Distance'].std()
    print(f"MAE:{mae_value}, Std: {std_dev}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-name', default="mbtcp-process3-2.4k_20240209T1204_epoch-50", required=False)
    # mbtcp-processContextException-1.2k_20240214T1232_epoch-89
    # mbtcp-process2-1.2k_20240208T1631_epoch-55
    # mbtcp-process3-2.4k_20240209T1204_epoch-50
    args = parser.parse_args()

    file_name = args.name
    calculate_error_margin(file_name)


if __name__ == '__main__':
    main()
