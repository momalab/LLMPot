import json
import argparse
import pandas as pd
from cfg import VALIDATION


def calculate_error_margin(folder_name, file_name):

    with open(f"{VALIDATION}/{folder_name}/{file_name}.jsonl", "r") as file:
        data = [json.loads(line) for line in file]

    df = pd.DataFrame(data)

    results_data = []
    for i, row in df.iterrows():
        try:
            response = row['response']
            expected_response = row['expected_response']

            if len(response) != len(expected_response):
                print(f"Error in row {i}")
                continue

            hex_distance = 0
            differences = sum(1 for resp, exp_resp in zip(response, expected_response) if resp != exp_resp)
            hex_distance += abs(int(response, 16) - int(expected_response, 16))
            print(f"Response: {response}, Expected Response: {expected_response}, Digits Different: {differences}, Hex Distance: {hex_distance}")
            results_data.append({'Response': response,
                                 'Expected Response': expected_response,
                                 'Digits Different': differences,
                                 'Hex Distance': hex_distance})
        except:
            print(f"Error in row {i}")

    results = pd.DataFrame(results_data)
    results.to_json(f"{VALIDATION}/{folder_name}/result_file-{file_name}.jsonl", orient='records', lines=True)
    mae_value = results['Digits Different'].mean()
    std_dev = results['Digits Different'].std()
    print(f"MAE:{mae_value}, Std: {std_dev}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-fo', default="mbtcp-pid_client-c0-s2400_20240403T1209", required=False)
    parser.add_argument('-fi', default="epoch-27_val_type-micro", required=False)
    args = parser.parse_args()

    folder_name = args.fo
    file_name = args.fi
    calculate_error_margin(folder_name, file_name)


if __name__ == '__main__':
    main()
