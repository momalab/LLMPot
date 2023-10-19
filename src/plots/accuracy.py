import os

import pandas as pd
import plotly.express as px

from cfg import OUTPUTS_DIR
from utilities.model.validation_data_filename import ValidationDataFilename


def calculate_accuracy(model_name: str):
    directory = f"{OUTPUTS_DIR}/validation_data/{model_name}"

    rows = []
    for filename in os.listdir(directory):
        filename_obj = ValidationDataFilename(filename)
        with open(os.path.join(directory, filename)) as log_file:
            df = pd.read_json(log_file, lines=True)

            accuracy = round(len(df.query(f"valid == {True}")) / len(df), 2)
            filename_fields_dict = dict(**filename_obj.__dict__, **{"accuracy": accuracy})
            rows.append(filename_fields_dict)

    df = pd.DataFrame(rows)

    flavors(df)
    # flavors(df, "dataset_size == 300 and model_name == 'byt5-large'")


def flavors(df: pd.DataFrame, query: str = None):
    df.sort_values(["accuracy"], ascending=True)
    if query is not None:
        df = df.query(query)

    fig = px.bar(df, x='epoch', y='accuracy', barmode='group', title=f"Accuracy for {df.iloc[0]['name']}")
    fig.show()


if __name__ == '__main__':
    calculate_accuracy("/byt5_byt5-small_mbtcp-context-6k_epochs-200_precision-32_20231019T1300")
