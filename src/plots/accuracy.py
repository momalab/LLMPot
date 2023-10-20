import glob
import os

import pandas as pd
import plotly.express as px

from cfg import OUTPUTS_DIR
from utilities.model.validation_data_filename import ValidationDataFilename


def calculate_accuracy(model_name: str = ""):
    directory = f"{OUTPUTS_DIR}/validation_data/"

    rows = []
    for filename in glob.glob(f"{directory}/*/*.jsonl"):
        filename_str = filename[filename.rindex("/") + 1:]
        filename_obj = ValidationDataFilename(filename_str)
        with open(filename) as log_file:
            df = pd.read_json(log_file, lines=True)

            accuracy = round(len(df.query(f"valid == {True}")) / len(df), 2)
            filename_fields_dict = dict(**filename_obj.__dict__, **{"accuracy": accuracy})
            rows.append(filename_fields_dict)

    df = pd.DataFrame(rows)

    flavors(df, "model_name == 'byt5-large'")


def flavors(df: pd.DataFrame, query: str = None):
    df.sort_values(["accuracy"], ascending=True)
    if query is not None:
        df = df.query(query)

    fig = px.scatter(df, x='epoch', y='accuracy', color="validation_type", title="Accuracy",
                     hover_data=['model_name', 'dataset_size', 'validation_type', 'epoch', 'accuracy'])
    fig.show()


if __name__ == '__main__':
    calculate_accuracy("byt5_byt5-small_mbtcp-both-40k_epochs-9_precision-32_20231016T1052")
