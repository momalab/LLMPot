import os

from plotly.subplots import make_subplots
import plotly.graph_objects as go

from cfg import OUTPUTS_DIR
from utilities.model.filename import Filename


def calculate_loss(log_filename: str = "lala"):
    with open(f"{OUTPUTS_DIR}/logs/{log_filename}") as log_file:
        log_lines = log_file.readlines()

    train_loss: dict = {}
    val_loss: dict = {}
    train_loss_epoch_str = 'train_loss_epoch='
    val_loss_epoch_str = 'val_loss_epoch='

    for line in log_lines:
        if "Epoch" in line and "100%" in line:
            epoch = int(line[line.rindex("Epoch") + len("Epoch") + 1:line.index(':')])
            if val_loss_epoch_str and train_loss_epoch_str in line:
                train_part = line[line.rindex(train_loss_epoch_str):-1]
                val_part = line[line.rindex(val_loss_epoch_str):-1]
                train_loss[epoch] = float(train_part[train_part.rindex(train_loss_epoch_str) + len(train_loss_epoch_str):train_part.index(']')])
                val_loss[epoch] = float(val_part[val_part.rindex(val_loss_epoch_str) + len(val_loss_epoch_str):val_part.rindex(', ')])

    train_loss = dict(sorted(train_loss.items()))
    val_loss = dict(sorted(val_loss.items()))

    print(train_loss)
    print(val_loss)

    fig = make_subplots()
    fig.add_trace(go.Scatter(x=[*train_loss.keys()], y=[*train_loss.values()], mode='lines+markers', name='train', marker=dict(color="purple")))
    fig.add_trace(go.Scatter(x=[*val_loss.keys()], y=[*val_loss.values()], mode='lines+markers', name='val', marker=dict(color="green")))
    fig.update_layout(title=log_filename)
    fig.show()
    fig.write_image(f"{OUTPUTS_DIR}/plots/{log_filename}.svg")


def main():
    calculate_loss("google_byt5-small_mbtcp-nocontext-6k_fc-3-16_epochs-100_precision-32_20231128T1437")
    calculate_loss("google_byt5-small_mbtcp-nocontext-6k_fc-3-16_epochs-100_precision-32_20231128T1719")
    calculate_loss("google_byt5-small_mbtcp-nocontext-6k_fc-3-16_epochs-100_precision-32_20231128T1804")
    calculate_loss("google_byt5-small_mbtcp-nocontext-6k_fc-3-16_epochs-100_precision-32_20231128T1911")



if __name__ == '__main__':
    main()
