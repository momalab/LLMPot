import pandas as pd

from cfg import OUTPUTS_DIR


def load_train_val_dfs(csv_filename):
    train_df = pd.read_csv(f"{OUTPUTS_DIR}/datasets/train/{csv_filename}.csv")
    train_df = train_df[['source_text', 'target_text']]

    val_df = pd.read_csv(f"{OUTPUTS_DIR}/datasets/validation/{csv_filename}.csv")
    val_df = val_df[['source_text', 'target_text']]

    return train_df, val_df
