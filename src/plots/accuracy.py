import os

import pandas as pd

from cfg import OUTPUTS_DIR
import plotly.graph_objects as go


def main():
    directory = f"{OUTPUTS_DIR}/validation_data/"

    validity = {}

    for filename in os.listdir(directory):
        validity[filename] = {}
        with open(os.path.join(directory, filename)) as log_file:
            df = pd.read_json(log_file, lines=True)

            validity[filename] = len(df.query(f"valid == {True}")) / len(df)

    print(validity)

    fig = go.Figure()
    fig.add_trace(go.Bar(x=[*validity.keys()], y=[*validity.values()]))
    fig.show()


if __name__ == '__main__':
    main()
