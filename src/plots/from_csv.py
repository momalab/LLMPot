import glob
import json
import os
from typing import List

from matplotlib import legend
from matplotlib.patches import Shadow
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

VIOLET_PALETTE = ['#caa8f5', '#592e83', '#b27c66']
NATURE = ['#C03221', '#87BCDE', '#EDB88B', '#545E75', '#3F826D', '#88498F']


class Plots:
    def __init__(self, experiment: str):
        self._metrics = ['csv-accuracy/validator', 'csv-accuracy/exact']
        self._test_metrics = ['accuracy/validator', 'accuracy/exact']
        self._finetuner = self._load_experiment(experiment)

        self._protocol = set(map(lambda x: x.protocol, self._finetuner.datasets)).pop()
        self._sizes = list(set(map(lambda x: x.size, self._finetuner.datasets)))

        # self._server_cfg = set(map(lambda x: x.server.__str__(), self._finetuner.datasets))

        palette = qualitative.Alphabet

        self._color_map = {dataset.size: palette[i] for i, dataset in enumerate(self._finetuner.datasets)}
        # self._server_cfg_map = {server_cfg: SYMBOL[i] for i, server_cfg in enumerate(self._server_cfg)}
        self._dataset_size_map = {dataset.size: SYMBOL[i] for i, dataset in enumerate(self._finetuner.datasets)}
        self._client_map = {dataset.client: SYMBOL[i] for i, dataset in enumerate(self._finetuner.datasets)}

    @staticmethod
    def get_symbol(key: str, keys: List, options: List):
        return {key: options[i] for i, key in enumerate(keys)}[key]

    @staticmethod
    def darken_hex_color(hex_color, reduction_percentage=30):
        r, g, b = int(hex_color[1:3], 16), int(hex_color[3:5], 16), int(hex_color[5:], 16)

        r = max(0, r - (r * reduction_percentage // 100))
        g = max(0, g - (g * reduction_percentage // 100))
        b = max(0, b - (b * reduction_percentage // 100))

        return "#{:02X}{:02X}{:02X}".format(r, g, b)

    @staticmethod
    def _load_experiment(experiment: str):
        with open(f"{EXPERIMENTS}/{experiment}", "r") as cfg:
            config = cfg.read()
            config = json.loads(config)
            finetuner_model = FinetunerModel(**config)
            finetuner_model.experiment = f"{experiment}"

            return finetuner_model

    def accuracy_with_random_dataset(self):
        dfs = pd.DataFrame()
        for dataset in self._finetuner.datasets:
            the_dir = f"{CHECKPOINTS}/{self._finetuner.experiment}/{dataset}"
            start_datetime_path = [name for name in os.listdir(the_dir) if os.path.isdir(os.path.join(the_dir, name))][1]
            if not os.path.exists(f"{the_dir}/csv/{start_datetime_path}/metrics2.csv"):
                continue

            df = pd.read_csv(f"{the_dir}/csv/{start_datetime_path}/metrics2.csv")
            df.loc[:, 'test_dataset'] = dataset.server.datablock
            df.loc[:, 'plc_cfg'] = df['test_dataset'].apply(lambda x: "same" if x == 40 else "different")
            df.loc[:, 'size'] = df['dataset'].apply(lambda x: f"{x.split('-')[3]}")
            df.loc[:, 'functions'] = df['dataset'].apply(lambda x: f"{x.split('-')[4].split('f')[1]}")
            dfs = pd.concat([dfs, df])

        for metric in self._test_metrics:
            validation_type = metric.split("/")[1]
            df = dfs.query(f"functions == '1_5_15_3_6_16'")
            fig = px.bar(df, x='size', y=metric, color='plc_cfg', barmode='group',
                         color_discrete_sequence=['#EDB88B', '#545E75'])

            fig.update_layout(
                barmode='group',
                xaxis_title='<b>Model</b>',
                yaxis_title='<b>BCA</b>' if validation_type == 'exact' else '<b>RVA</b>',
                paper_bgcolor='rgba(0,0,0,0)',
                plot_bgcolor='rgba(0,0,0,0)',
                margin=dict(l=0, r=0, b=0, t=0, pad=0),
                font=dict(family=FONT_FAMILY, size=34, color="Black"),
                xaxis=dict(type='category', categoryorder='array'),
                legend=dict(yanchor="bottom", y=0.7, xanchor="right", x=0.2, orientation='v', font=dict(family=FONT_FAMILY, size=28)),

            )
            fig.update_xaxes(showline=True, linewidth=1.5, linecolor='gray', gridcolor='gray', gridwidth=1, griddash="dot",
                             zeroline=False, zerolinewidth=3, zerolinecolor='black',
                             )
            fig.update_yaxes(showline=True, linewidth=1.5, linecolor='gray',gridcolor='gray', gridwidth=1, griddash="dot",
                             zeroline=False, zerolinewidth=3, zerolinecolor='black', range=[0, 1.002]
                             )

            fig.show()

            os.makedirs(f"{ASSETS}/{self._finetuner.experiment}/", exist_ok=True)
            fig.write_image(f"{ASSETS}/{self._finetuner.experiment}/{validation_type}.pdf")

    def accuracy_per_epoch(self, ):
        # names =["[-120, -60]", "[-90, -30]", "[30, 90]", "[60, 120]"]
        names =["a-40_d-40", "a-100_d-100", "a-5000_d-5000"]
        dfs = pd.DataFrame()
        # colors = {dataset.size: NATURE[i] for i, dataset in enumerate(self._finetuner.datasets)}
        # colors = {dataset.server.__str__(): NATURE[i] for i, dataset in enumerate(self._finetuner.datasets)}
        colors = {dataset.client: NATURE[i] for i, dataset in enumerate(self._finetuner.datasets)}
        # colors = {name: NATURE[i] for i, name in enumerate(names)}
        for dataset in self._finetuner.datasets:
            start_datetime_path = os.listdir(f"{CHECKPOINTS}/{self._finetuner.experiment}/{dataset}")[0]
            if not os.path.exists(f"{CHECKPOINTS}/{self._finetuner.experiment}/{dataset}/{start_datetime_path}/metrics.csv"):
            # if not os.path.exists(f"{CHECKPOINTS}/{self._finetuner.experiment}/{dataset}/csv/{start_datetime_path}/metrics.csv"):
                continue

            df = pd.read_csv(f"{CHECKPOINTS}/{self._finetuner.experiment}/{dataset}/{start_datetime_path}/metrics.csv")
            # df = pd.read_csv(f"{CHECKPOINTS}/{self._finetuner.experiment}/{dataset}/csv/{start_datetime_path}/metrics.csv")
            df.drop(columns=['csv-val_loss_step', 'csv-val_loss_epoch', 'csv-train_loss_step', 'csv-train_loss_epoch'], inplace=True)
            df.dropna(subset=["csv-accuracy/validator", "csv-accuracy/exact"], inplace=True)
            df.loc[:, 'dataset'] = dataset.__str__()
            dfs = pd.concat([dfs, df])

        for metric in self._metrics:
            validation_type = metric.split("/")[1]
            fig = go.Figure()
            for index, dataset in enumerate(self._finetuner.datasets):
                df = dfs.query(f"dataset == '{dataset}'")
                fig.add_trace(go.Scatter(x=df['csv-epoch'], y=df[metric],
                                         mode='lines',
                                         name=dataset.client,
                                         line=dict(width=5, color=colors[dataset.client], shape='spline'),
                                         )
                              )

            fig.update_layout(
                xaxis_title='<b>Epoch</b>',
                yaxis_title='<b>BCA</b>' if validation_type == 'exact' else '<b>RVA</b>',
                paper_bgcolor='rgba(0,0,0,0)',
                plot_bgcolor='rgba(0,0,0,0)',
                margin=dict(l=0, r=0, b=0, pad=0),
                font=dict(family=FONT_FAMILY, size=32, color="Black"),
                legend=dict(yanchor="bottom", y=1, xanchor="right", x=1, orientation='h', font=dict(family=FONT_FAMILY, size=28)),
                )

            fig.update_xaxes(showline=True, linewidth=1.5, linecolor='gray', gridcolor='gray', gridwidth=1, griddash="dot",
                             zeroline=False, zerolinewidth=3, zerolinecolor='black',
                             )
            fig.update_yaxes(showline=True, linewidth=1.5, linecolor='gray',gridcolor='gray', gridwidth=1, griddash="dot",
                             zeroline=False, zerolinewidth=3, zerolinecolor='black', range=[0, 1.002]
                             )

            fig.show()

            os.makedirs(f"{ASSETS}/{self._finetuner.experiment}/", exist_ok=True)
            fig.write_image(f"{ASSETS}/{self._finetuner.experiment}/{validation_type}.pdf")

    def loss_per_epoch(self):
        dfs = pd.DataFrame()
        self._symbol_map = {name: SYMBOL[i] for i, name in enumerate(['train', 'val'])}
        colors = {dataset.client: NATURE[i] for i, dataset in enumerate(self._finetuner.datasets)}
        # colors = {dataset.size: NATURE[i] for i, dataset in enumerate(self._finetuner.datasets)}
        for dataset in self._finetuner.datasets:
            start_datetime_path = os.listdir(f"{CHECKPOINTS}/{self._finetuner.experiment}/{dataset}")[0]
            if not os.path.exists(f"{CHECKPOINTS}/{self._finetuner.experiment}/{dataset}/{start_datetime_path}/metrics.csv"):
                continue
            df = pd.read_csv(f"{CHECKPOINTS}/{self._finetuner.experiment}/{dataset}/{start_datetime_path}/metrics.csv")
            df.drop(columns=['csv-val_loss_step', 'csv-train_loss_step', 'csv-accuracy/validator', 'csv-accuracy/exact', 'step'], inplace=True)

            val_df = df.dropna(subset=["csv-val_loss_epoch"]).drop(columns=["csv-train_loss_epoch"])
            train_df = df.dropna(subset=["csv-train_loss_epoch"]).drop(columns=["csv-val_loss_epoch"])

            df = pd.merge(val_df, train_df, on="csv-epoch", how="inner")
            df.loc[:, 'dataset'] = dataset.__str__()
            df.loc[:, 'functions'] = dataset.functions_str()
            dfs = pd.concat([dfs, df])

        fig = go.Figure()
        for dataset in self._finetuner.datasets:
            df = dfs.query(f"dataset == '{dataset.__str__()}'")
            fig.add_trace(go.Scatter(x=df['csv-epoch'], y=df['csv-val_loss_epoch'],
                                     mode='lines',
                                     name=f"v-{dataset.client}",
                                     line=dict(width=5, color=colors[dataset.client], shape='spline', dash="dot"),
                                     legend="legend1",
                                     showlegend=False
                                     )
                          )

            fig.add_trace(go.Scatter(x=df['csv-epoch'], y=df['csv-train_loss_epoch'],
                                     mode='lines',
                                     name=f"{dataset.client}",
                                     line=dict(width=5, color=colors[dataset.client], shape='spline'),
                                     legend="legend2"
                                     )
                          )

        fig.update_layout(
            xaxis_title='<b>Epoch</b>',
            yaxis_title='<b>Loss</b>',
            # yaxis=dict(type='log', dtick=1),
            paper_bgcolor='rgba(0,0,0,0)',
            plot_bgcolor='rgba(0,0,0,0)',
            margin=dict(l=0, r=0, b=0, pad=0),
            font=dict(family=FONT_FAMILY, size=32, color="Black"),
            legend1=dict(yanchor="bottom", y=0.8, xanchor="right", x=1, orientation='h', font=dict(family=FONT_FAMILY, size=24)),
            legend2=dict(yanchor="bottom", y=0.9, xanchor="right", x=1, orientation='h', font=dict(family=FONT_FAMILY, size=24))
            )

        fig.update_xaxes(showline=True, linewidth=1.5, linecolor='gray', gridcolor='gray', gridwidth=1, griddash="dot",
                         zeroline=False, zerolinewidth=3, zerolinecolor='black',
                         )
        fig.update_yaxes(showline=True,linewidth=1.5, linecolor='gray',gridcolor='gray', gridwidth=1, griddash="dot",
                         zeroline=False, zerolinewidth=3, zerolinecolor='black',
                         )

        fig.add_annotation(text='solid: training loss, dot: validation loss',
                    align='left',
                    showarrow=False,
                    xref='paper',
                    yref='paper',
                    x=1,
                    y=0.9,
                    bordercolor='gray',
                    borderwidth=2)

        fig.show()

        os.makedirs(f"{ASSETS}/{self._finetuner.experiment}/", exist_ok=True)
        fig.write_image(f"{ASSETS}/{self._finetuner.experiment}/losses.pdf")


if __name__ == '__main__':
    # plot = Plots("mbtcp-protocol-test.json")
    # plot.accuracy_with_random_dataset()

    # plot = Plots("s7comm-protocol-test.json")
    # plot.accuracy_with_random_dataset()

    # plot = Plots("s7comm-protocol-emulation.json")
    # plot.accuracy_per_epoch()
    # plot.loss_per_epoch()

    # plot = Plots("mbtcp-protocol-emulation.json")
    # plot.accuracy_per_epoch()
    # plot.loss_per_epoch()

    plot = Plots("mbtcp-icspatch-processes.json")
    plot.accuracy_per_epoch()
    plot.loss_per_epoch()

    # plot = Plots("mbtcp-protocol-emulation-ablation-addresses.json")
    # plot.accuracy_per_epoch()

    # plot = Plots("s7comm-protocol-generalization.json")
    # plot.accuracy_per_epoch()

    # plot = Plots("mbtcp-anaerobic-variations.json")
    # plot.accuracy_per_epoch()
