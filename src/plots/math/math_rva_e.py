import argparse
import glob
import json
import os

import pandas as pd
import plotly.graph_objects as go
import plotly.io as pio

from cfg import ASSETS
from utilities.utils import load_cfg

pio.kaleido.scope.mathjax = None
pd.options.mode.copy_on_write = True


FONT_FAMILY = "Serif"
NATURE = ['#87BCDE', '#C03221', '#87BCDE', '#C03221', '#87BCDE', '#C03221', '#87BCDE', '#C03221', '#87BCDE', '#C03221']


class MathPlots:
    def __init__(self, experiment: str, timestamp: str):
        self._finetuner = load_cfg("byt5-small", experiment, timestamp=timestamp)
        self._colors = {dataset.client: NATURE[i] for i, dataset in enumerate(self._finetuner.datasets)}
        self._x_high = 0.0
        self._y_low = 0.0

    def rva_e(self):
        dfs = pd.DataFrame()
        for dataset in self._finetuner.datasets:
            self._finetuner.current_dataset = dataset
            epsilon_file = glob.glob(f"{self._finetuner.experiment_instance_result_path}/epsilon*.jsonl")[0]

            with open(epsilon_file, 'r') as file:
                data = []
                for line in file:
                    data.append(json.loads(line))

            df = pd.DataFrame(data)
            df.loc[:, 'dataset'] = dataset.client
            dfs = pd.concat([dfs, df])

        datasets = [dataset for dataset in self._finetuner.datasets if "linear" not in dataset.client]
        print("Clients in datasets:", [dataset.client for dataset in datasets])

        for dataset in datasets:
            fig = go.Figure()

            if "cauchy" == dataset.client:
                self._x_high = 0.025
                self._y_low = 0.7
            elif "sigmoid" == dataset.client:
                self._x_high = 0.05
                self._y_low = 0.7
            elif "expo10" == dataset.client:
                self._x_high = 70
                self._y_low = 0.5
            elif "cosh" == dataset.client:
                self._x_high = 0.3
                self._y_low = 0.5

            self.lala(dfs, dataset.client, fig)
            self.lala(dfs, f"{dataset.client}_linear", fig)

            fig.update_layout(
                xaxis_title='<b>Epsilon</b>',
                yaxis_title='<b>RVA-ε</b>',
                yaxis=dict(range=[self._y_low, 1.02]),
                # yaxis=dict(type='log', dtick=1),
                paper_bgcolor='rgba(0,0,0,0)',
                plot_bgcolor='rgba(0,0,0,0)',
                margin=dict(l=0, r=0, b=0, t=0, pad=0),
                font=dict(family=FONT_FAMILY, size=32, color="Black"),
                legend=dict(yanchor="bottom", y=1, xanchor="right", x=1, orientation='h', font=dict(family=FONT_FAMILY, size=24)),
                )

            fig.update_xaxes(showline=True, linewidth=1.5, linecolor='gray', gridcolor='gray', gridwidth=1, griddash="dot",
                            zeroline=False, zerolinewidth=3, zerolinecolor='black',
                            )
            fig.update_yaxes(showline=True,linewidth=1.5, linecolor='gray',gridcolor='gray', gridwidth=1, griddash="dot",
                            zeroline=False, zerolinewidth=3, zerolinecolor='black',
                            )

            name = "-".join([dataset.client, f"{dataset.client}_linear"])
            os.makedirs(f"{ASSETS}/{self._finetuner.experiment}/", exist_ok=True)
            fig.write_image(f"{ASSETS}/{self._finetuner.experiment}/{name}.pdf")

    def lala(self, dfs: pd.DataFrame, dataset_client: str, fig: go.Figure):
        df = dfs.query(f"dataset == '{dataset_client}' and distance != 'invalid'")

        df.sort_values(by='distance', inplace=True)

        # df = df[(df['distance'] > (mean - 2 * std_dev)) & (df['distance'] < (mean + 2 * std_dev))]
        # df = df[(df['distance'] < (mean + 0.1 * std_dev))]
        # df = df[(df['distance'] > 0)]
        df = df[(df['distance'] < self._x_high)]

        mean = df['distance'].mean()
        std_dev = df['distance'].std()
        print(f"Dataset: {dataset_client} Mean: {mean} Std Dev: {std_dev}")

        df['percintile'] = df['distance'].apply(lambda x: (df['distance'] <= x).mean())

        fig.add_trace(go.Scatter(x=df['distance'], y=df['percintile'],
                                mode='lines',
                                name="uniform" if "linear" in dataset_client else "adjusted",
                                line=dict(width=5, color=self._colors[dataset_client], shape='spline'),
                                )
                    )

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-exp', default="mbtcp-math-functions.json", required=False)
    parser.add_argument('-timestamp', default="20240427T1812", required=False)
    args = parser.parse_args()

    plot = MathPlots(args.exp, args.timestamp)
    plot.rva_e()

if __name__ == "__main__":
    main()
