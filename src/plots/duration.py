import os

import pandas as pd
import plotly.express as px

from cfg import OUTPUTS_DIR
from utilities.model.filename import Filename


def main():
    directory = f"{OUTPUTS_DIR}/logs/"

    duration_str = 'Duration: '
    duration_time_str = 'DurationTime: '

    rows = []
    for filename in os.listdir(f"{OUTPUTS_DIR}/logs/"):
        with open(os.path.join(directory, filename)) as log_file:
            for line in log_file:
                if "Duration" in line:
                    if duration_str in line:
                        duration = round(float(line[line.rindex(duration_str) + len(duration_str):-1]), 0)
                    if duration_time_str in line:
                        duration_time = line[line.rindex(duration_time_str) + len(duration_time_str):-1]
        filename_fields_dict = dict(**Filename(filename).__dict__, **{"duration": duration, "duration_time": duration_time})
        rows.append(filename_fields_dict)

    df = pd.DataFrame(rows)
    flavors("epochs == 14", df)


def flavors(query: str, df: pd.DataFrame):
    df = df.sort_values(["duration"], ascending=True).query(query)
    fig = px.scatter(df, x='name', y='duration')
    fig.update_layout(
        yaxis=dict(
            tickmode='array',
            tickvals=df["duration"],
            ticktext=df["duration_time"],
        )
    )
    fig.show()


if __name__ == '__main__':
    main()
