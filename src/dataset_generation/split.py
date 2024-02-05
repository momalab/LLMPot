import argparse

import pandas as pd
from sklearn.model_selection import train_test_split

from cfg import OUTPUTS_DIR


def split(csv: str):
    result_df = pd.read_csv(f"{OUTPUTS_DIR}/datasets/parsed/{csv}.csv")

    train_df, val_test_df = train_test_split(result_df, test_size=0.2)
    val_df, test_df = train_test_split(val_test_df, test_size=0.5)

    train_df.to_csv(f"{OUTPUTS_DIR}/datasets/train/{csv}.csv", index=True)
    test_df.to_csv(f"{OUTPUTS_DIR}/datasets/test/{csv}.csv", index=True)
    val_df.to_csv(f"{OUTPUTS_DIR}/datasets/validation/{csv}.csv", index=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-csv', required=True)
    args = parser.parse_args()

    csv = args.csv

    split(csv)


if __name__ == '__main__':
    main()
