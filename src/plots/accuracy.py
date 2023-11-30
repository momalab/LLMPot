import glob
import os

import pandas as pd
import plotly.express as px

from cfg import OUTPUTS_DIR
from utilities.model.validation_data_filename import ValidationDataFilename


def calculate_accuracy(model_name: str = ""):
    directory = f"{OUTPUTS_DIR}/validation_data/{model_name}"

    rows = []
    for filename in glob.glob(f"{directory}/*.jsonl"):
        filename_str = filename[filename.rindex("/") + 1:]
        filename_obj = ValidationDataFilename(filename_str)
        with open(filename) as log_file:
            df = pd.read_json(log_file, lines=True)

            accuracy = round(len(df.query(f"valid == {True}")) / len(df), 2)
            filename_fields_dict = dict(**filename_obj.__dict__, **{"accuracy": accuracy})
            rows.append(filename_fields_dict)

    df = pd.DataFrame(rows)

    flavors(df, "dataset_size == 6", model_name)


def flavors(df: pd.DataFrame, query: str = None, model_name: str = "accuracy"):
    df.sort_values(["epoch"], ascending=True)
    if query is not None:
        df = df.query(query)

    fig = px.scatter(df, x='epoch', y='accuracy', title="Accuracy",
                     hover_data=['model_name', 'dataset_size', 'validation_type', 'epoch', 'accuracy'])
    fig.show()
    fig.write_image(f"{OUTPUTS_DIR}/plots/{model_name}_accuracy.svg")


if __name__ == '__main__':
    calculate_accuracy("google_byt5-small_mbtcp-nocontext-6k_fc-3-16_epochs-100_precision-32_20231128T1437")
