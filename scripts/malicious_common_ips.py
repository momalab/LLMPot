import argparse

from torch import le
from cfg import PROJECT_ROOT_DIR


def read_ips_from_file(file_path):
    with open(file_path, 'r') as file:
        return set(line.strip() for line in file)

def find_common_ips(f1, f2):
    ips1 = read_ips_from_file(f1)
    ips2 = read_ips_from_file(f2)

    print(f"IPs in file1: {len(ips1)}")
    print(f"IPs in file2: {len(ips2)}")

    print(f"Common IPs: {len(ips1.intersection(ips2))}")

    return ips1.intersection(ips2)


if __name__ == '__main__':

    parser = argparse.ArgumentParser(description='Check IPs that are common between the more_than_1 and malicious ones.')
    parser.add_argument('--database', type=str, required=True, help='The name of the database to use')
    parser.add_argument('--threshold', type=int, required=True, help='Threshold of malicious score')
    args = parser.parse_args()

    file1 = f'{PROJECT_ROOT_DIR}/scripts/results/malicious_ip_{args.database}_over_{args.threshold}.txt'
    file2 = f'{PROJECT_ROOT_DIR}/scripts/results/more_than_1_{args.database}.txt'

    common_ips = find_common_ips(file1, file2)
    print(len(common_ips))
    for ip in common_ips:
        print(ip)
