import os

import pandas as pd

from cfg import OUTPUTS_DIR
import plotly.graph_objects as go


def calculate_accuracy(flavor: str):
    directory = f"{OUTPUTS_DIR}/validation_data/"

    validity = {}

    for filename in os.listdir(directory):
        with open(os.path.join(directory, filename)) as log_file:
            if flavor in filename:
                validity[filename] = {}
                df = pd.read_json(log_file, lines=True)

                validity[filename] = round(len(df.query(f"valid == {True}")) / len(df), 2)

    print(validity)

    fig = go.Figure()
    fig.add_trace(go.Bar(x=[*validity.keys()], y=[*validity.values()], text=[*validity.values()]))
    fig.update_layout(title=flavor)
    fig.show()


if __name__ == '__main__':
    calculate_accuracy("micro")
    calculate_accuracy("epochs-14")
    calculate_accuracy("epochs-9")
    calculate_accuracy("mbtcp-context")
    calculate_accuracy("mbtcp-nocontext")
    calculate_accuracy("300k")
    calculate_accuracy("100k")
    calculate_accuracy("30k")
    calculate_accuracy("mbtcp-both")
    calculate_accuracy("byt5")
