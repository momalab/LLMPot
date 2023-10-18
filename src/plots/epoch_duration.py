import datetime
import os
import time

import pandas as pd
import plotly.express as px

from cfg import OUTPUTS_DIR
from utilities.model.filename import Filename


def main():
    directory = f"{OUTPUTS_DIR}/logs/"

    train_loss_epoch_str = 'train_loss_epoch='
    val_loss_epoch_str = 'val_loss_epoch='

    rows = []
    for filename in os.listdir(directory):
        filename_obj = Filename(filename)
        with open(os.path.join(directory, filename)) as log_file:
            prev_epoch = 0
            for line in log_file:
                if "Epoch" in line and "100%" in line and train_loss_epoch_str in line and val_loss_epoch_str in line:
                    parts = line[line.index("|") + 1:line.index("[") - 1]
                    parts.split("/")
                    if parts[0] == parts[1]:
                        epoch = int(line[line.rindex("Epoch ") + len("Epoch "):line.index(':')])
                        if prev_epoch == epoch:
                            continue
                        prev_epoch = epoch
                        try:
                            hours, minutes, seconds = map(int, line[line.index("[") + 1:line.index("<")].split(":"))
                            epoch_duration = datetime.timedelta(hours=hours, minutes=minutes, seconds=seconds)
                        except ValueError:
                            minutes, seconds = map(int, line[line.index("[") + 1:line.index("<")].split(":"))
                            epoch_duration = datetime.timedelta(minutes=minutes, seconds=seconds)

                        epoch_duration_seconds = epoch_duration.total_seconds()

                        filename_fields_dict = dict(**filename_obj.__dict__,
                                                    **{"epoch": epoch, "epoch_duration": epoch_duration,
                                                       "epoch_duration_seconds": epoch_duration_seconds})
                        rows.append(filename_fields_dict)

    df = pd.DataFrame(rows)
    flavors(df)


def flavors(df: pd.DataFrame, query: str = None):
    if query is not None:
        df = df.query(query)

    fig = px.scatter(df, x='epoch', y='epoch_duration_seconds', color='name')
    # fig.update_layout(
    #     yaxis=dict(
    #         tickmode='array',
    #         tickvals=df["duration"],
    #         ticktext=df["duration_time"],
    #     )
    # )
    fig.show()


if __name__ == '__main__':
    main()
