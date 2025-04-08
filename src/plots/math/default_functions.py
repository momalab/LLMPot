import argparse
import os
import plotly.graph_objects as go

from cfg import ASSETS
from dataset_generation.math.func import Function
from plots.from_csv import FONT_FAMILY

NATURE = ['#C03221', '#87BCDE', '#EDB88B', '#545E75', '#3F826D', '#88498F']

def plot(func: Function, the_function:str, samples: int, low: int, high: int):
    x, _ = func.func_values(low, high, samples)
    x, _, sampled_x_values, y_orig, pdf, scale_factor_pdf = func.func_values_sampled(x, samples)

    fig_combined = go.Figure()
    fig_combined.add_trace(go.Scatter(x=x, y=y_orig, mode='lines', name=the_function, line=dict(color=NATURE[0])))
    fig_combined.add_trace(go.Scatter(x=x, y=pdf * scale_factor_pdf, mode='lines', name='PDF', line=dict(color=NATURE[1], dash='dash')))
    fig_combined.add_trace(go.Histogram(x=sampled_x_values, nbinsx=100, name='PDF', opacity=0.8, marker_color=NATURE[2], yaxis='y2'))
    fig_combined.add_trace(go.Histogram(x=x, nbinsx=100, name='uniform', opacity=0.6, marker_color=NATURE[3], yaxis='y2'))

    fig_combined.update_layout(
        margin=dict(l=0, r=0, b=0, t=0, pad=0),
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)',
        xaxis_title='<b>x</b>',
        yaxis=dict(
            title=f'<b>{the_function} / scaled density</b>',
            side='left',
            showgrid=False
        ),
        yaxis2=dict(
            title='<b># x samples</b>',
            overlaying='y',
            side='right',
            showgrid=False,
        ),
        font=dict(family=FONT_FAMILY, size=34, color="black"),
        legend=dict(
            orientation="h",
            xanchor="right",
            x=1,
            y=1.1,
            font=dict(family=FONT_FAMILY, size=28, color="black"),
        )
    )

    # fig_combined.show()
    os.makedirs(f"{ASSETS}/math_functions/", exist_ok=True)
    fig_combined.write_image(f"{ASSETS}/math_functions/{the_function}.pdf")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-func', default="sigmoid", required=False)
    parser.add_argument('-samples', default=1000, type=int, required=False)
    parser.add_argument('-low', default=-10, type=int, required=False)
    parser.add_argument('-high', default=10, type=int, required=False)
    args = parser.parse_args()

    func = Function(args.func)

    plot(func, args.func, args.samples, args.low, args.high)

if __name__ == '__main__':
    main()
