import pandas as pd
from datasets import load_dataset, Dataset

from cfg import OUTPUTS_DIR


def load_train_val_dfs(csv_filename):
    train_df = pd.read_csv(f"{OUTPUTS_DIR}/datasets/train/{csv_filename}.csv")
    train_df = train_df[['source_text', 'target_text']]

    val_df = pd.read_csv(f"{OUTPUTS_DIR}/datasets/validation/{csv_filename}.csv")
    val_df = val_df[['source_text', 'target_text']]

    return train_df, val_df


def load_dataset_from_file(dataset_filename: str) -> Dataset:
    dataset = load_dataset('csv', data_files={
        'train': f"{OUTPUTS_DIR}/datasets/train/{dataset_filename}.csv",
        'val': f"{OUTPUTS_DIR}/datasets/validation/{dataset_filename}.csv",
        'test': f"{OUTPUTS_DIR}/datasets/test/{dataset_filename}.csv"})
    dataset = dataset.rename_columns({'source_text': 'request', 'target_text': 'response'})
    return dataset.remove_columns("Unnamed: 0")
