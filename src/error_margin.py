import json
import argparse
import pandas as pd
from cfg import VALIDATION


def calculate_error_margin(folder_name, file_name):

    with open(f"{VALIDATION}/{folder_name}/{file_name}.jsonl", "r") as file:
        data = [json.loads(line) for line in file]

    df = pd.DataFrame(data)
    invalid = df.query('valid == False')
    if not invalid.empty:
        invalid_df = invalid.copy()
        print(f"Total invalids = {len(invalid_df)}")
    else:
        print("No invalid packets")
        exit(1)

    results_data = []
    for i, row in invalid_df.iterrows():
        response = row['response']
        expected_response = row['expected_response']
        hex_distance = 0
        if len(response) == len(expected_response):
            differences = sum(1 for resp, exp_resp in zip(response, expected_response) if resp != exp_resp)
            hex_distance += abs(int(response, 16) - int(expected_response, 16))
            # print(f"Response: {response}, Expected Response: {expected_response}, Digits Different: {differences}, Hex Distance: {hex_distance}")
            results_data.append({'Response': response,
                            'Expected Response': expected_response,
                            'Digits Different': differences,
                            'Hex Distance': hex_distance})
        else:
            print(f"The length is not the same")
            return

    results = pd.DataFrame(results_data)
    results.to_json(f"{VALIDATION}/google_byt5-small_mbtcp_s7comm-p1-c1-1200_20240311T1331/result_file-{file_name}.jsonl",
                    orient='records', lines=True)
    mae_value = results['Hex Distance'].mean()
    std_dev = results['Hex Distance'].std()
    print(f"MAE:{mae_value}, Std: {std_dev}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-fo', default="google_byt5-small_mbtcp-p3-c2-1200_20240329T1216", required=False)
    parser.add_argument('-fi', default="epoch-60_val_type-exactly", required=False)
    args = parser.parse_args()

    folder_name = args.fo
    file_name = args.fi
    calculate_error_margin(folder_name, file_name)


if __name__ == '__main__':
    main()
