import argparse

import pandas as pd
from sklearn.model_selection import train_test_split

from cfg import DATASET_PARSED, DATASET_TRAIN, DATASET_TEST, DATASET_VAL


def split(csv: str):
    result_df = pd.read_csv(f"{DATASET_PARSED}/{csv}.csv")

    train_df, val_test_df = train_test_split(result_df, test_size=0.2)
    val_df, test_df = train_test_split(val_test_df, test_size=0.5)

    train_df.to_csv(f"{DATASET_TRAIN}/{csv}.csv", index=True)
    test_df.to_csv(f"{DATASET_TEST}/{csv}.csv", index=True)
    val_df.to_csv(f"{DATASET_VAL}/{csv}.csv", index=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-csv', default="mbtcp-expo-sampled3-c0-s5000", required=False)
    args = parser.parse_args()

    csv = args.csv

    split(csv)


if __name__ == '__main__':
    main()
