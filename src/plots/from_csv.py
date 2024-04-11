import json
import os

import plotly.express as px

import pandas as pd
import plotly.graph_objects as go
from plotly.colors import qualitative

from cfg import EXPERIMENTS, CHECKPOINTS, ASSETS
from finetune.model.finetuner_model import FinetunerModel


FONT_FAMILY = "Times New Roman"
SYMBOL = ['cross', 'diamond-open']


class Plots:
    def __init__(self, experiment: str):
        self._metric = 'csv-accuracy/validator'
        self._finetuner = self._load_experiment(experiment)

        self._protocol = set(map(lambda x: x.protocol, self._finetuner.datasets)).pop()
        self._sizes = list(set(map(lambda x: x.size, self._finetuner.datasets)))
        self._validation_type = self._metric.split('/')[1]

        self._functions_set = set(map(lambda x: x.functions_str(","), self._finetuner.datasets))

        palette = qualitative.Alphabet
        self._color_map = {dataset.size: palette[i] for i, dataset in enumerate(self._finetuner.datasets)}
        self._symbol_map = {functions_set: SYMBOL[i] for i, functions_set in enumerate(self._functions_set)}

    @staticmethod
    def get_symbol(key: str, keys: [], options: []):
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
            finetuner_model.experiment = experiment

            return finetuner_model

    def accuracy_per_epoch(self):
        fig = go.Figure()
        for dataset in self._finetuner.datasets:
            if not os.path.exists(f"{CHECKPOINTS}/{dataset}_metrics.csv"):
                continue

            df = pd.read_csv(f"{CHECKPOINTS}/{dataset}_metrics.csv")
            df = df.drop(columns=['csv-val_loss_step', 'csv-val_loss_epoch', 'csv-train_loss_step', 'csv-train_loss_epoch'])
            df = df.dropna()

            fig.add_trace(go.Scatter(x=df['csv-epoch'], y=df[self._metric],
                                     mode='lines+markers',
                                     name=f"{dataset.size}-{dataset.functions_str(',')}",
                                     line=dict(width=1.5, color=self._color_map[dataset.size], shape='spline'),
                                     marker=dict(size=6, symbol=self._symbol_map[dataset.functions_str(",")])))

        fig.update_layout(
            # title=f'Protocol: {self._protocol}, Model: {self._finetuner.model_name}, Validation: {self._metric.split("/")[1]}',
            title_font_size=28,
            xaxis_title='Epoch',
            yaxis_title='Accuracy',
            paper_bgcolor='rgba(0,0,0,0)',
            plot_bgcolor='rgba(0,0,0,0)',
            height=1200,
            margin=dict(l=0, r=0, b=0, pad=0),
            font=dict(family=FONT_FAMILY, size=26, color="Black"),
            legend=dict(yanchor="bottom", y=1, xanchor="right", x=1, orientation='h',
                        font=dict(family=FONT_FAMILY, size=26)),
            xaxis=dict(showgrid=False, showline=False),
            yaxis=dict(showgrid=False, showline=False, range=[0.3, 1.05])
        )

        fig.show()

        os.makedirs(f"{ASSETS}/{self._finetuner.experiment}/", exist_ok=True)
        fig.write_image(f"{ASSETS}/{self._finetuner.experiment}/{self._validation_type}.png")

    def loss_per_epoch(self):
        fig = go.Figure()
        self._symbol_map = {name: SYMBOL[i] for i, name in enumerate(['train', 'val'])}
        for dataset in self._finetuner.datasets:
            if not os.path.exists(f"{CHECKPOINTS}/{dataset}_metrics.csv"):
                continue
            df = pd.read_csv(f"{CHECKPOINTS}/{dataset}_metrics.csv")
            df.drop(columns=['csv-val_loss_step', 'csv-train_loss_step', 'csv-accuracy/validator', 'csv-accuracy/exact', 'step'], inplace=True)

            val_df = df.dropna(subset=["csv-val_loss_epoch"]).drop(columns=["csv-train_loss_epoch"])
            train_df = df.dropna(subset=["csv-train_loss_epoch"]).drop(columns=["csv-val_loss_epoch"])

            df = pd.merge(val_df, train_df, on="csv-epoch", how="inner")

            fig.add_trace(go.Scatter(x=df['csv-epoch'], y=df['csv-val_loss_epoch'],
                                     mode='lines+markers',
                                     name=f"val-{dataset.size}-{dataset.functions_str(',')}",
                                     line=dict(width=1.5, color=self.darken_hex_color(self._color_map[dataset.size]), shape='spline'),
                                     marker=dict(size=6, symbol=self.get_symbol('val', ['train', 'val'], SYMBOL))))

            fig.add_trace(go.Scatter(x=df['csv-epoch'], y=df['csv-train_loss_epoch'],
                                     mode='lines+markers',
                                     name=f"train-{dataset.size}-{dataset.functions_str(',')}",
                                     line=dict(width=1.5, color=self._color_map[dataset.size], shape='spline'),
                                     marker=dict(size=6, symbol=self.get_symbol('train', ['train', 'val'], SYMBOL))))

        fig.update_layout(
            # title=f'Train/Validation Loss - Protocol: {self._protocol}, Model: {self._finetuner.model_name}',
            title_font_size=28,
            yaxis_type='log',
            xaxis_title='Epoch',
            yaxis_title='Loss',
            height=1200,
            autosize=False,
            paper_bgcolor='rgba(0,0,0,0)',
            plot_bgcolor='rgba(0,0,0,0)',
            margin=dict(l=0, r=0, b=0, pad=0),
            font=dict(family=FONT_FAMILY, size=26, color="Black"),
            legend=dict(yanchor="bottom", y=1, xanchor="right", x=1, orientation='h',
                        font=dict(family=FONT_FAMILY, size=26)),
            xaxis=dict(showgrid=False, showline=False),
            yaxis=dict(showgrid=False, showline=False)
        )

        fig.show()

        os.makedirs(f"{ASSETS}/{self._finetuner.experiment}/", exist_ok=True)
        fig.write_image(f"{ASSETS}/{self._finetuner.experiment}/losses.png")

    def barchart_best_accuracy_of_each(self):
        df_plot = pd.DataFrame(columns=['size', 'accuracy', 'functions'])
        for index, dataset in enumerate(self._finetuner.datasets):
            if not os.path.exists(f"{CHECKPOINTS}/{dataset}_metrics.csv"):
                continue
            df = pd.read_csv(f"{CHECKPOINTS}/{dataset}_metrics.csv")
            df = df.drop(columns=['csv-val_loss_step', 'csv-val_loss_epoch', 'csv-train_loss_step', 'csv-train_loss_epoch'])
            df = df.dropna()

            df_plot.loc[index] = [dataset.size, round(df[self._metric].max(), 4), dataset.functions_str()]

        fig = px.bar(df_plot, x='size', y='accuracy', color='functions', barmode='group', color_discrete_sequence=['darkgreen', 'purple'])

        fig.update_layout(
            barmode='group',
            title=f'Protocol: {self._protocol}, Model: {self._finetuner.model_name}, Validation: {self._metric.split("/")[1]}',
            title_font_size=28,
            xaxis_title='Epoch',
            yaxis_title='Accuracy',
            paper_bgcolor='rgba(0,0,0,0)',
            plot_bgcolor='rgba(0,0,0,0)',
            margin=dict(l=0, r=0, b=0, t=60, pad=0),
            font=dict(family=FONT_FAMILY, size=26, color="Black"),
            legend=dict(yanchor="bottom", y=0.75, xanchor="right", x=0.4, orientation='v',
                        font=dict(family=FONT_FAMILY, size=26, color="black")),

            xaxis=dict(showgrid=False, showline=False, type='category', categoryorder='array'),
            yaxis=dict(showgrid=False, showline=False, range=[0.85, 1]),
        )

        fig.show()
        os.makedirs(f"{ASSETS}/{self._finetuner.experiment}/", exist_ok=True)
        fig.write_image(f"{ASSETS}/{self._finetuner.experiment}/max_accuracy_{self._validation_type}.png")


if __name__ == '__main__':
    plot = Plots("s7comm-protocol-emulation.json")
    plot.accuracy_per_epoch()
    plot.loss_per_epoch()
    # plot.barchart_best_accuracy_of_each()

    plot = Plots("mbtcp-protocol-emulation.json")
    plot.accuracy_per_epoch()
    plot.loss_per_epoch()
    # plot.barchart_best_accuracy_of_each()
