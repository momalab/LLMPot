import argparse
import json
from ast import main

from cfg import PROJECT_ROOT_DIR

def parse(database, threshold):
    input_file = f'{PROJECT_ROOT_DIR}/scripts/results/malicious_ip_{database}.jsonl'
    output_file = f'{PROJECT_ROOT_DIR}/scripts/results/malicious_ip_{database}_over_{threshold}.txt'

    with open(input_file, 'r') as infile:
        with open(output_file, 'w') as outfile:
            for line in infile:
                json_line = json.loads(line)
                ip_data = json_line.get("data", {})
                if ip_data.get("abuseConfidenceScore", 0) > threshold:
                    outfile.write(ip_data.get("ipAddress") + "\n")

if __name__ == '__main__':

    parser = argparse.ArgumentParser(description='Check IP addresses for malicious activity using AbuseIPDB.')
    parser.add_argument('--database', type=str, required=True, help='The name of the database to use')
    parser.add_argument('--threshold', type=int, required=True, help='The malicious score threshold')
    args = parser.parse_args()

    parse(args.database, args.threshold)