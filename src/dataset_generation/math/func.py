import os
from matplotlib import pyplot as plt
from matplotlib.animation import adjusted_figsize
import numpy as np
import pandas as pd
import math
from regex import X
from scipy.integrate import cumtrapz
from scipy.interpolate import interp1d
import plotly.graph_objects as go

from cfg import ASSETS, DATASET_PARSED
from numpy.polynomial import Polynomial
import plotly.io as pio
pio.kaleido.scope.mathjax = None

FONT_FAMILY = "Serif"

def sgn(x):
    return np.sign(x)

def sgn_derivative(x): #2*Dirac delta function
    if x == 0:
        return np.inf  # Represents the Dirac delta spike at x = 0
    else:
        return 0

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def sigmoid_derivative(x):
    return sigmoid(x) * (1 - sigmoid(x))

def expo10(x):
    return  np.power(10, x)

def expo10_derivative(x):
    return np.power(10, x) * np.log(10)

def cauchy(x):
    return 1 / (np.pi * (1 + x ** 2))

def cauchy_derivative(x, x0=0, gamma=1):
    numerator = -2 * (x - x0)
    denominator = np.pi * gamma**3 * (1 + ((x - x0) / gamma) ** 2) ** 2
    return numerator / denominator

THE_FUNC = cauchy
DF = cauchy_derivative

def remove_decimals(x, y, dec_num = 4):
    x = [round(x, dec_num) for x in x]
    y = [round(y, dec_num) for y in y]
    return x, y

def func(x):
    return THE_FUNC(x)

def derivative(x):
    return DF(x)

def func_values(low, high, samples):
    x = np.linspace(low, high, samples)
    y = func(x)
    return x, y

def func_values_sampled(x, samples):
    derivative_values = derivative(x)

    power = 0.8
    pdf = np.power(abs(derivative_values), power)
    pdf /= np.sum(pdf * np.diff(x)[0])

    mix_ratio = 0.5
    uniform_pdf = np.ones_like(pdf) / len(pdf)
    adjusted_pdf = (1 - mix_ratio) * pdf + mix_ratio * uniform_pdf
    adjusted_pdf /= np.sum(adjusted_pdf * np.diff(x)[0])
    cdf = cumtrapz(adjusted_pdf, x, initial=0)
    cdf /= cdf[-1]

    uniform_random_samples = np.random.rand(samples)
    inverse_cdf = interp1d(cdf, x, kind='linear')
    sampled_x_values = inverse_cdf(uniform_random_samples)
    sampled_x_values = np.sort(sampled_x_values)

    y = [func(x) for x in sampled_x_values]
    y_orig = [func(x) for x in x]

    scale_factor_pdf = max(y) / max(pdf)

    fig_combined = go.Figure()

    NATURE = ['#C03221', '#87BCDE', '#EDB88B', '#545E75', '#3F826D', '#88498F']

    fig_combined.add_trace(go.Scatter(x=x, y=y_orig, mode='lines', name=THE_FUNC.__name__, line=dict(color=NATURE[0])))
    fig_combined.add_trace(go.Scatter(x=x, y=pdf * scale_factor_pdf, mode='lines', name='PDF', line=dict(color=NATURE[1], dash='dash')))
    fig_combined.add_trace(go.Histogram(x=sampled_x_values, nbinsx=100, name='PDF', opacity=0.8, marker_color=NATURE[2], yaxis='y2'))
    fig_combined.add_trace(go.Histogram(x=x, nbinsx=100, name='uniform', opacity=0.6, marker_color=NATURE[3], yaxis='y2'))

    fig_combined.update_layout(
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)',
        xaxis_title='<b>x</b>',
        yaxis=dict(
            title=f'<b>{THE_FUNC.__name__} / scaled density</b>',
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

    fig_combined.show()
    os.makedirs(f"{ASSETS}/math_functions/", exist_ok=True)
    fig_combined.write_image(f"{ASSETS}/math_functions/{THE_FUNC.__name__}.pdf")

    return sampled_x_values, y

def func_values_with_noise(x, samples):
    noise = np.random.uniform(-0.05, 0.05, samples)
    x_noise = x + noise
    y_noise = [func(x) for x in x_noise]

    return x_noise ,y_noise


def main():
    samples = 10000
    x, y = func_values(-10, 10, samples)
    x_sampled, y_sampled = func_values_sampled(x, samples)
    x_noise, y_noise = func_values_with_noise(x, samples)

    # x, y = remove_decimals(x, y)
    # x_sampled, y_sampled = remove_decimals(x_sampled, y_sampled)
    # x_noise, y_noise = remove_decimals(x_noise, y_noise)

    # df = pd.DataFrame({'source_text': x, 'target_text': y})
    # df_sampled = pd.DataFrame({'source_text': x_sampled, 'target_text': y_sampled})
    # df_noise = pd.DataFrame({'source_text': x_noise, 'target_text': y_noise})

    # df.to_csv(f"{DATASET_PARSED}/mbtcp-expo10_m_linear-c0-s{samples}.csv", index=False)
    # df_sampled.to_csv(f"{DATASET_PARSED}/mbtcp-expo10_m-c0-s{samples}.csv", index=False)
    # df_noise.to_csv(f"{DATASET_PARSED}/mbtcp-expo10_m_noise-c0-s{samples}.csv", index=False)


if __name__ == '__main__':
    main()
