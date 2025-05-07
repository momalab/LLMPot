import argparse
import csv
import os
from typing import List

import plotly.graph_objects as go
import plotly.io as pio
from scipy.stats import ks_2samp

from cfg import ASSETS, DATASET_PARSED

pio.kaleido.scope.mathjax = None


NATURE = ['#C03221', '#87BCDE', '#EDB88B', '#545E75', '#3F826D', '#88498F']
FONT_FAMILY = "Serif"


def make_plots(sp: int, fig: go.Figure, experiment: str, csv_file: str, symbol: str = 'circle-dot', color: int = 2, name: str = 'actual', opacity: float = 1):
    with open(f"{DATASET_PARSED}/{experiment}/{csv_file}.csv", 'r') as orig_data_file:
        orig_data = csv.reader(orig_data_file)

        next(orig_data)  # skip header

        x: List[float] = []
        y: List[float] = []
        for row in orig_data:
            if sp == "00":
                x.append(float(row[0].split('|')[0].split('-')[1]))
            else:
                x.append(float(row[0].split('|')[0]))

            hex_value = row[1][len(row[1])-4:]
            decimal_value = int(hex_value, 16)

            y.append(float(decimal_value))

        fig.add_trace(go.Scatter(x=x, y=y, mode='markers', name=name, opacity=opacity,
                                 marker=dict(color=NATURE[color], size=10, symbol=symbol)))

        return x, y


def update_plot(sp: int, fig: go.Figure, x, x_ai, y, y_ai, experiment: str, csv_file: str, slots: List[int]):

    if sp == 00:
        fig.add_shape(type="rect", opacity=0.2, x0=0, y0=32300, x1=slots[0], y1=32800, fillcolor="#C03221", line=dict(width=0))
        fig.add_annotation(x=slots[0] - slots[0]/2, y=32320, text="sp=80", showarrow=False, font=dict(size=22, color="black", family=FONT_FAMILY))
        fig.add_shape(type="rect", opacity=0.2, x0=slots[0], y0=32300, x1=slots[1], y1=32800, fillcolor="#87BCDE", line=dict(width=0))
        fig.add_annotation(x=slots[1] - slots[0]/2, y=32320, text="sp=70", showarrow=False, font=dict(size=22, color="black", family=FONT_FAMILY))
        fig.add_shape(type="rect", opacity=0.2, x0=slots[1], y0=32300, x1=slots[2], y1=32800, fillcolor="#C03221", line=dict(width=0))
        fig.add_annotation(x=slots[2] - slots[0]/2, y=32320, text="sp=85", showarrow=False, font=dict(size=22, color="black", family=FONT_FAMILY))
        fig.add_shape(type="rect", opacity=0.2, x0=slots[2], y0=32300, x1=slots[3], y1=32800, fillcolor="#87BCDE", line=dict(width=0))
        fig.add_annotation(x=slots[3] - slots[0]/2, y=32320, text="sp=75", showarrow=False, font=dict(size=22, color="black", family=FONT_FAMILY))

    fig.update_layout(
        xaxis_title='<b>Time (s)</b>',
        yaxis_title='<b>Steam Flow Rate (kg/min)</b>',
        plot_bgcolor='rgba(0,0,0,0)',
        paper_bgcolor='rgba(0,0,0,0)',
        margin=dict(l=0, r=0, b=0, t=5, pad=0),
        font=dict(family=FONT_FAMILY, size=32, color="Black"),
        xaxis=dict(type='linear', categoryorder='array'),
        legend=dict(yanchor="top", y=1.12, xanchor="right", x=0.9, orientation='h', font=dict(family=FONT_FAMILY, size=28)),
    )

    fig.update_xaxes(showline=True, linewidth=1.5, linecolor='gray', gridcolor='gray', gridwidth=1, griddash="dot",
                     zeroline=False, zerolinewidth=3, zerolinecolor='black', range=[0, slots[3]+4]
                     )
    fig.update_yaxes(showline=True, linewidth=1.5, linecolor='gray', gridcolor='gray', gridwidth=1, griddash="dot",
                     zeroline=False, zerolinewidth=3, zerolinecolor='black', range=[min(y, y_ai), max(y, y_ai)]
                     )

    x = x + x_ai
    x.sort()

    fig.update_layout(
        xaxis=dict(
            tickmode='array',
            tickangle=30,
            tickvals=[0, 20, 40, 60, 80],
            ticktext=[0, 20, 40, 60, 80],
        )
    )

    # fig.show()
    os.makedirs(f"{ASSETS}/{experiment}", exist_ok=True)
    fig.write_image(f"{ASSETS}/{experiment}/{csv_file}.pdf")


def strip_file_blank_space(experiment: str, filename: str):
    with open(f"{DATASET_PARSED}/{experiment}/{filename}", "rb") as f:
        data = f.read().replace(b'\x00', b'')
    with open(f"{DATASET_PARSED}/{experiment}/{filename}", "wb") as f:
        f.write(data)


def calculate_statistics(x, y, x_ai, y_ai):
    ks_stat, ks_p = ks_2samp(y, y_ai)
    print(f"KS-test statistic: {ks_stat}, P-value: {ks_p}")
    return ks_stat, ks_p


def main(sps: List[int], sizes: List[int], runs: List[int]):
    slots = [20, 40, 60, 80]

    c = 1

    ks_arr = []
    p_arr = []

    for sp in sps:
        if sp == "00":
            c = 2
        for size in sizes:
            for run in runs:
                opacity = 0.5
                print(f"Run: {run} - mbtcp-testbed-sp{sp}-c1-s{size}")
                fig = go.Figure()
                x, y = make_plots(sp, fig, "mbtcp-testbed.json", f"mbtcp-testbed-sp{sp}-c{c}-s{size}")
                x_ai, y_ai = make_plots(sp, fig, "mbtcp-testbed.json", f"/results/mbtcp-testbed-sp{sp}-c{c}-s{size}_result_run_{run}", symbol="cross", color=3, name='LLMPot', opacity=opacity)
                update_plot(sp, fig, x, x_ai, y, y_ai, "mbtcp-testbed.json", f"mbtcp-testbed-sp{sp}-c{c}-s{size}_result_run_{run}", slots)
                ks, p = calculate_statistics(x, y, x_ai, y_ai)
                ks_arr.append(ks)
                p_arr.append(p)

            print(f"P: {' & '.join(map(lambda x: f'{x:.5f}', p_arr))}")
            print(f"KS: {' & '.join(map(lambda x: f'{x:.5f}', ks_arr))}")

            ks_arr = []
            p_arr = []


if __name__ == '__main__':

    parser = argparse.ArgumentParser(description="Parse CSV and decode data for plotting.")
    parser.add_argument('-sps', nargs='+', type=str, required=True, help='sp values to plot')
    parser.add_argument('-sizes', nargs='+', type=int, required=True, help='dataset sizes to use')
    parser.add_argument('-runs', nargs='+', type=int, required=True, help='runs to use')
    args = parser.parse_args()

    main(args.sps, args.sizes, args.runs)
