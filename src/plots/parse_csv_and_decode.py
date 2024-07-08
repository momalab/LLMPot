import csv
import os
from typing import List

import numpy as np
import plotly.graph_objects as go
import plotly.io as pio
from scipy import stats
from scipy.stats import ks_2samp, levene, mannwhitneyu, pearsonr, spearmanr

pio.kaleido.scope.mathjax = None

from cfg import ASSETS, CHECKPOINTS, DATASET_PARSED

NATURE = ['#C03221', '#87BCDE', '#EDB88B', '#545E75', '#3F826D', '#88498F']
FONT_FAMILY = "Serif"

def make_plots(fig: go.Figure, experiment: str, csv_file: str, symbol: str = 'circle-dot', color: int = 2, name: str = 'actual', opacity: float = 1):
    with open(f"{DATASET_PARSED}/{experiment}/{csv_file}.csv", 'r') as orig_data_file:
        orig_data = csv.reader(orig_data_file)

        next(orig_data) #skip header

        x: List[float] = []
        y: List[float] = []
        for row in orig_data:
            x.append(float(row[0].split('|')[0]))

            hex_value = row[1][len(row[1])-4:]
            decimal_value = int(hex_value, 16)

            y.append(float(decimal_value))

        fig.add_trace(go.Scatter(x=x, y=y, mode='markers', name=name, opacity=opacity,
                                 marker=dict(color=NATURE[color], size=10, symbol=symbol)))

        return x, y


def update_plot(fig: go.Figure, x, x_ai, spacing: int, experiment: str, csv_file: str):
    fig.update_layout(
        xaxis_title='<b>Time(s)</b>',
        yaxis_title='<b>Steam Flow Rate(kg/min)</b>',
        plot_bgcolor='rgba(0,0,0,0)',
        paper_bgcolor='rgba(0,0,0,0)',
        margin=dict(l=0, r=0, b=0, t=5, pad=0),
        font=dict(family=FONT_FAMILY, size=32, color="Black"),
        xaxis=dict(type='linear', categoryorder='array'),
        legend=dict(yanchor="top", y=1.12, xanchor="right", x=0.9, orientation='h', font=dict(family=FONT_FAMILY, size=28)),
    )

    fig.update_xaxes(showline=True, linewidth=1.5, linecolor='gray', gridcolor='gray', gridwidth=1, griddash="dot",
                     zeroline=False, zerolinewidth=3, zerolinecolor='black'
                     )
    fig.update_yaxes(showline=True, linewidth=1.5, linecolor='gray', gridcolor='gray', gridwidth=1, griddash="dot",
                     zeroline=False, zerolinewidth=3, zerolinecolor='black'
                     )

    x = x + x_ai
    x.sort()

    fig.update_layout(
        xaxis=dict(
            tickmode='array',
            tickangle=30,
            tickvals=x[::spacing],
            ticktext=x[::spacing],
        )
    )

    fig.show()
    # os.makedirs(f"{ASSETS}/{experiment}", exist_ok=True)
    # fig.write_image(f"{ASSETS}/{experiment}/{csv_file}.pdf")


def strip_file_blank_space(experiment: str, filename: str):
    with open(f"{DATASET_PARSED}/{experiment}/{filename}", "rb") as f:
        data = f.read().replace(b'\x00', b'')
    with open(f"{DATASET_PARSED}/{experiment}/{filename}", "wb") as f:
        f.write(data)

def calculate_statistics(x, y, x_ai, y_ai):
    data = np.column_stack((x, y))
    data_ai = np.column_stack((x_ai, y_ai))

    ks_stat, ks_p = ks_2samp(y, y_ai)
    return ks_stat, ks_p
    print(f"KS-test statistic: {ks_stat}, P-value: {ks_p}")

    # spearman_corr, _ = spearmanr(x, y)
    # print(f"Spearman Correlation (Dataset 1): {spearman_corr}")
    # spearman_corr, _ = spearmanr(x_ai, y_ai)
    # print(f"Spearman Correlation (Dataset 2): {spearman_corr}")

    var_stat, var_p = levene(y, y_ai)
    print(f"Levene's test for equal variances: Statistic={var_stat}, P-value={var_p}")

    stat, p = mannwhitneyu(data, data_ai, alternative='two-sided')
    print(f'Mann-Whitney U stat={stat}, P-value={p}')


def main():
    # strip_file_blank_space("mbtcp-testbed.json", "mbtcp-testbed-sp75-c1-s1600.csv_result.csv")

    run = 1

    ks_arr = []
    p_arr = []
    fig_p = go.Figure()
    for sp in [75]:
        for size in [6400]:
            for run in range(12, 13):
                opacity = 0.5
                # print(f"Run: {run} - mbtcp-testbed-sp{sp}-c1-s{size}")
                fig = go.Figure()
                x, y = make_plots(fig, "mbtcp-testbed.json", f"mbtcp-testbed-sp{sp}-c1-s{size}")
                x_ai, y_ai = make_plots(fig, "mbtcp-testbed.json", f"mbtcp-testbed-sp{sp}-c1-s{size}_result_run_{run}", symbol="cross", color=3, name='predicted', opacity=opacity)
                update_plot(fig, x, x_ai, 400, "mbtcp-testbed.json", f"mbtcp-testbed-sp{sp}-c1-s{size}_result_run_{run}")
                ks, p = calculate_statistics(x, y, x_ai, y_ai)
                ks_arr.append(ks)
                p_arr.append(p)


            print(f"P: {' & '.join(map(lambda x: f'{x:.5f}', p_arr))}")
            print(f"KS: {' & '.join(map(lambda x: f'{x:.5f}', ks_arr))}")


            fig_p.add_trace(go.Scatter(x=[1,2,3,4,5,6,7,8,9,10], y=p_arr, mode='lines', name=f'sp: {sp} size: {size}', line_shape='spline'))

            ks_arr = []
            p_arr = []

    fig_p.add_shape(
        type="line",
        x0=1,
        y0=0.05,
        x1=10,
        y1=0.05,
        line=dict(color="black", width=2, dash="dash"),
    )

    fig_p.update_layout(
        xaxis_title='<b>Time Iteration</b>',
        yaxis_title='<b>P-value</b>',
        plot_bgcolor='rgba(0,0,0,0)',
        paper_bgcolor='rgba(0,0,0,0)',
        margin=dict(l=0, r=0, b=0, t=5, pad=0),
        font=dict(family=FONT_FAMILY, size=32, color="Black"),
        xaxis=dict(type='linear', categoryorder='array'),
        legend=dict(yanchor="top", y=1.12, xanchor="right", x=0.9, orientation='h', font=dict(family=FONT_FAMILY, size=28)),
    )
    fig_p.update_xaxes(showline=True, linewidth=1.5, linecolor='gray', gridcolor='gray', gridwidth=1, griddash="dot",
                        zeroline=False, zerolinewidth=3, zerolinecolor='black'
                        )
    fig_p.update_yaxes(showline=True, linewidth=1.5, linecolor='gray', gridcolor='gray', gridwidth=1, griddash="dot",
                        zeroline=False, zerolinewidth=3, zerolinecolor='black'
                        )
    # fig_p.show()

if __name__ == '__main__':
    main()