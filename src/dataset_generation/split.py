import argparse

import pandas as pd
from sklearn.model_selection import train_test_split

from cfg import OUTPUTS_DIR


def split(pcap: str):
    result_df = pd.read_csv(f"{OUTPUTS_DIR}/datasets/parsed/{pcap}.csv")

    train_df, val_test_df = train_test_split(result_df, test_size=0.2)
    val_df, test_df = train_test_split(val_test_df, test_size=0.5)

    train_df.to_csv(f"{OUTPUTS_DIR}/datasets/train/{pcap}.csv", index=True)
    test_df.to_csv(f"{OUTPUTS_DIR}/datasets/test/{pcap}.csv", index=True)
    val_df.to_csv(f"{OUTPUTS_DIR}/datasets/validation/{pcap}.csv", index=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-pcap', required=True)
    args = parser.parse_args()

    pcap = args.pcap

    split(pcap)


if __name__ == '__main__':
    main()
