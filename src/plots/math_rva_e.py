import glob
import json
import os

import pandas as pd
import plotly.graph_objects as go
import plotly.io as pio

pio.kaleido.scope.mathjax = None
pd.options.mode.copy_on_write = True

from cfg import ASSETS, CHECKPOINTS, EXPERIMENTS
from finetune.model.finetuner_model import FinetunerModel


FONT_FAMILY = "Serif"
SYMBOL = ['cross', 'diamond-open', 'circle-dot', 'triangle-up-open', 'diamond-open', 'star-triangle-up']
NATURE = ['#C03221', '#87BCDE', '#EDB88B', '#545E75', '#3F826D', '#C03221', '#87BCDE', '#EDB88B', '#545E75']


class MathPlots:
    def __init__(self, experiment: str):
        self._finetuner = self._load_experiment(experiment)

    @staticmethod
    def _load_experiment(experiment: str):
        with open(f"{EXPERIMENTS}/{experiment}", "r") as cfg:
            config = cfg.read()
            config = json.loads(config)
            finetuner_model = FinetunerModel(**config)
            finetuner_model.experiment = f"{experiment}"

            return finetuner_model

    def rva_e(self):
        dfs = pd.DataFrame()
        colors = {dataset.client: NATURE[i] for i, dataset in enumerate(self._finetuner.datasets)}
        for dataset in self._finetuner.datasets:
            the_dir = f"{CHECKPOINTS}/{self._finetuner.experiment}/{dataset}"
            the_datetime = os.listdir(f"{the_dir}")[0]
            the_dir = the_dir + "/" + the_datetime
            epsilon_file = glob.glob(f"{the_dir}/epsilon*.jsonl")[0]

            with open(epsilon_file, 'r') as file:
                data = []
                for line in file:
                    data.append(json.loads(line))

            df = pd.DataFrame(data)
            df.loc[:, 'dataset'] = dataset.client
            dfs = pd.concat([dfs, df])

        fig = go.Figure()
        for dataset in self._finetuner.datasets:
            df2 = dfs.query(f"dataset == '{dataset.client}' and distance != 'invalid'")

            df2.sort_values(by='distance', inplace=True)

            # df = df[(df['distance'] > (mean - 2 * std_dev)) & (df['distance'] < (mean + 2 * std_dev))]
            # df = df[(df['distance'] < (mean + 0.1 * std_dev))]
            # df = df[(df['distance'] > 0)]
            df2 = df2[(df2['distance'] < 0.05)]

            mean = df2['distance'].mean()
            std_dev = df2['distance'].std()
            print(f"Dataset: {dataset} Mean: {mean} Std Dev: {std_dev}")

            df2['percintile'] = df2['distance'].apply(lambda x: (df2['distance'] <= x).mean())

            fig.add_trace(go.Scatter(x=df2['distance'], y=df2['percintile'],
                                     mode='lines',
                                     name="uniform" if "linear" in dataset.client else "adjusted",
                                     line=dict(width=5, color=colors[dataset.client], shape='spline'),
                                     )
                          )


        fig.update_layout(
            xaxis_title='<b>Epsilon</b>',
            yaxis_title='<b>RVA-ε</b>',
            yaxis=dict(range=[0.7, 1.02]),
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

        # fig.show()

        name = "-".join([dataset.client for dataset in self._finetuner.datasets])
        os.makedirs(f"{ASSETS}/{self._finetuner.experiment}/", exist_ok=True)
        fig.write_image(f"{ASSETS}/{self._finetuner.experiment}/{name}.pdf")


if __name__ == '__main__':
    plot = MathPlots("mbtcp-math-functions.json")
    plot.rva_e()
