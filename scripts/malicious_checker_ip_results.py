import argparse
import json

import requests

from cfg import PROJECT_ROOT_DIR

ABUSEIPDB_API_KEY = 'f1c4f9f70a8bf7eb392e86ff3439284fc4a23041aa54ef7b23ae6d42798a0826b4c756bd1e624f20'


def check_abuseipdb(ip_address):
    url = 'https://api.abuseipdb.com/api/v2/check'
    querystring = {
        'ipAddress': ip_address,
        'maxAgeInDays': '180'
    }
    headers = {
        'Accept': 'application/json',
        'Key': ABUSEIPDB_API_KEY
    }
    response = requests.get(url, headers=headers, params=querystring, timeout=5)
    if response.status_code == 200:
        data = response.json()
        return data

    print(f"Error {response.status_code}: Unable to fetch data from AbuseIPDB")
    return None


def main(ip_address, database):
    print(f"Checking IP address: {ip_address}\n")

    with open(f"{PROJECT_ROOT_DIR}/scripts/results/malicious_ip_{database}.jsonl", 'a') as f:
        abuseipdb_data = check_abuseipdb(ip_address)
        if abuseipdb_data:
            abuse_score = abuseipdb_data['data']['abuseConfidenceScore']
            f.write(json.dumps(abuseipdb_data))
            f.write("\n")
            print(f"AbuseIPDB Abuse Confidence IP:{ip_address} Score: {abuse_score}")
        else:
            f.write("\n")
            print("AbuseIPDB data not available.")


if __name__ == '__main__':

    parser = argparse.ArgumentParser(description='Check IP addresses for malicious activity using AbuseIPDB.')
    parser.add_argument('--database', type=str, required=True, help='The name of the database to use')
    args = parser.parse_args()

    with open(f"{PROJECT_ROOT_DIR}/scripts/results/distinct_ips_{args.database}.txt", 'r') as file:
        ip_list = file.readlines()

        for entry in ip_list:
            main(entry, database=args.database)
