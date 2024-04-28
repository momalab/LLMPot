import glob
import json
import os
from typing import List

from matplotlib import legend
import plotly
import plotly.express as px

import pandas as pd
import plotly.graph_objects as go
from plotly.colors import qualitative
from regex import F

from cfg import EXPERIMENTS, CHECKPOINTS, ASSETS, TEST_METRICS, TRAINING_METRICS
from finetune.model.finetuner_model import FinetunerModel
import plotly.io as pio
pio.kaleido.scope.mathjax = None

FONT_FAMILY = "Serif"
SYMBOL = ['cross', 'diamond-open', 'circle-dot', 'triangle-up-open', 'diamond-open', 'star-triangle-up']
NATURE = ['#C03221', '#87BCDE', '#EDB88B', '#545E75', '#3F826D', '#88498F', '#88498F']


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
        data = []
        for dataset in self._finetuner.datasets:
            the_dir = f"{CHECKPOINTS}/{self._finetuner.experiment}/{dataset}"
            the_datetime = os.listdir(f"{the_dir}")[0]
            the_dir = the_dir + "/" + the_datetime
            epsilon_file = glob.glob(f"{the_dir}/epsilon*.jsonl")[0]

            with open(epsilon_file, 'r') as file:
                for line in file:
                    data.append(json.loads(line))

            df = pd.DataFrame(data)
            df.loc[:, 'dataset'] = dataset.client
            dfs = pd.concat([dfs, df])

        dfs['distance'] = dfs['distance'].astype(float)

        fig = go.Figure()
        for dataset in self._finetuner.datasets:
            df = dfs.query(f"dataset == '{dataset.client}'")

            df.sort_values(by='distance', inplace=True)
            df['distance'] = df['distance'].abs()

            mean = df['distance'].mean()
            std_dev = df['distance'].std()

            print(mean, std_dev)

            # df = df[(df['distance'] > (mean - 0.1 * std_dev)) & (df['distance'] < (mean + 0.1 * std_dev))]
            df = df[(df['distance'] < (mean + 0.1 * std_dev))]


            df['percintile'] = df['distance'].apply(lambda x: (df['distance'] <= x).mean() * 100)

            fig.add_trace(go.Scatter(x=df['distance'], y=df['percintile'],
                                        mode='lines',
                                        name=f"{dataset.client}",
                                        line=dict(width=5, color=colors[dataset.client], shape='spline'),
                                        )
                            )



        fig.update_layout(
            # xaxis_type="log",
            xaxis_title='<b>Epsilon</b>',
            yaxis_title='<b>RVA-ε</b>',
            yaxis=dict(type='log', dtick=1),
            paper_bgcolor='rgba(0,0,0,0)',
            plot_bgcolor='rgba(0,0,0,0)',
            margin=dict(l=0, r=0, b=0, pad=0),
            font=dict(family=FONT_FAMILY, size=32, color="Black"),
            legend=dict(yanchor="bottom", y=1, xanchor="right", x=1, orientation='h', font=dict(family=FONT_FAMILY, size=24)),
            )

        fig.update_xaxes(showline=True, linewidth=1.5, linecolor='gray', gridcolor='gray', gridwidth=1, griddash="dot",
                        zeroline=False, zerolinewidth=3, zerolinecolor='black',
                        )
        fig.update_yaxes(showline=True,linewidth=1.5, linecolor='gray',gridcolor='gray', gridwidth=1, griddash="dot",
                        zeroline=False, zerolinewidth=3, zerolinecolor='black',
                        )

        fig.show()

        # os.makedirs(f"{ASSETS}/{self._finetuner.experiment}/", exist_ok=True)
        # fig.write_image(f"{ASSETS}/{self._finetuner.experiment}/losses.pdf")


if __name__ == '__main__':
    plot = MathPlots("mbtcp-math-functions.json")
    plot.rva_e()
