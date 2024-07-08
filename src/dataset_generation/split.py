import argparse
import os

import pandas as pd
from sklearn.model_selection import train_test_split

from cfg import DATASET_PARSED, DATASET_TRAIN, DATASET_TEST, DATASET_VAL


def split(csv: str, experiment: str):
    result_df = pd.read_csv(f"{DATASET_PARSED}/{experiment}/{csv}.csv")

    train_df, val_test_df = train_test_split(result_df, test_size=0.2)
    val_df, test_df = train_test_split(val_test_df, test_size=0.5)

    os.makedirs(f"{DATASET_TRAIN}/{experiment}", exist_ok=True)
    os.makedirs(f"{DATASET_TEST}/{experiment}", exist_ok=True)
    os.makedirs(f"{DATASET_VAL}/{experiment}", exist_ok=True)
    train_df.to_csv(f"{DATASET_TRAIN}/{experiment}/{csv}.csv", index=True)
    test_df.to_csv(f"{DATASET_TEST}/{experiment}/{csv}.csv", index=True)
    val_df.to_csv(f"{DATASET_VAL}/{experiment}/{csv}.csv", index=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-csv', default="mbtcp-testbed-sp85-c1-s6400", required=False)
    parser.add_argument('-exp', default="mbtcp-testbed.json", required=False)
    args = parser.parse_args()

    csv = args.csv
    experiment = args.exp

    split(csv, experiment)


if __name__ == '__main__':
    main()
