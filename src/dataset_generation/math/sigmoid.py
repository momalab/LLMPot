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


FONT_FAMILY = "Times New Roman"
SAMPLES = 5000
LOW = -10
HIGH = 10

def remove_decimals(x, y, dec_num = 4):
    x = [round(x, dec_num) for x in x]
    y = [round(x, dec_num) for x in y]

    return x, y

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def sigmoid_derivative(x):
    return sigmoid(x) * (1 - sigmoid(x))

def sigmoid_values():
    x = np.linspace(LOW, HIGH, SAMPLES)
    y = [sigmoid(x) for x in x]
    
    return x, y

def sigmoid_values_sampled(x):
    derivative_values = sigmoid_derivative(x)

    power = 0.8
    pdf = np.power(derivative_values, power)
    pdf /= np.sum(pdf * np.diff(x)[0])
    
    mix_ratio = 0.5
    uniform_pdf = np.ones_like(pdf) / len(pdf)
    adjusted_pdf = (1 - mix_ratio) * pdf + mix_ratio * uniform_pdf
    adjusted_pdf /= np.sum(adjusted_pdf * np.diff(x)[0])
    cdf = cumtrapz(adjusted_pdf, x, initial=0)
    cdf /= cdf[-1]
    
    uniform_random_samples = np.random.rand(SAMPLES)
    inverse_cdf = interp1d(cdf, x, kind='linear')
    sampled_x_values = inverse_cdf(uniform_random_samples)
    sampled_x_values = np.sort(sampled_x_values)
    
    y = [sigmoid(x) for x in sampled_x_values]
    y_orig = [sigmoid(x) for x in x]
    
    scale_factor_pdf = max(y) / max(pdf)

    fig_combined = go.Figure()

    fig_combined.add_trace(go.Scatter(x=x, y=y_orig, mode='lines', name='Sigmoid', line=dict(color='#272635')))
    fig_combined.add_trace(go.Scatter(x=x, y=pdf * scale_factor_pdf, mode='lines', name='PDF', line=dict(color='#A6A6A8', dash='dash')))
    fig_combined.add_trace(go.Histogram(x=sampled_x_values, nbinsx=100, name='Sampled Points', opacity=0.5, marker_color='#B1E5F2', yaxis='y2'))

    fig_combined.update_layout(
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)',
        xaxis_title='x',
        yaxis=dict(
            title='Sigmoid Value / Scaled Density',
            side='left',
            showgrid=False
        ),
        yaxis2=dict(
            title='X values Histogram',
            overlaying='y',
            side='right',
            showgrid=False,
        ),
        font=dict(family=FONT_FAMILY, size=26, color="black"),
        legend=dict(
            orientation="h",
            xanchor="center",
            x=0.5,
            y=1.1
        )
    )

    fig_combined.show()
    os.makedirs(f"{ASSETS}/math_functions/", exist_ok=True)
    fig_combined.write_image(f"{ASSETS}/math_functions/sigmoid.png")

    
    return sampled_x_values, y

def sigmoid_values_with_noise(x):
    noise = np.random.uniform(-0.0005, 0.0005, SAMPLES)
    x_noise = x + noise
    y_noise = [sigmoid(x) for x in x_noise]

    return x_noise ,y_noise


def main():
    x, y = sigmoid_values()
    x_sampled, y_sampled = sigmoid_values_sampled(x)
    x_noise, y_noise = sigmoid_values_with_noise(x)
    
    x, y = remove_decimals(x, y)
    x_sampled, y_sampled = remove_decimals(x_sampled, y_sampled)
    x_noise, y_noise = remove_decimals(x_noise, y_noise)
    
    df = pd.DataFrame({'source_text': x, 'target_text': y})
    df_sampled = pd.DataFrame({'source_text': x_sampled, 'target_text': y_sampled})
    df_noise = pd.DataFrame({'source_text': x_noise, 'target_text': y_noise})

    # df.to_csv(f"{DATASET_PARSED}/mbtcp-sigmoid-simple-c0-s{SAMPLES}.csv", index=False)
    df_sampled.to_csv(f"{DATASET_PARSED}/mbtcp-sigmoid-sampled3-c0-s{SAMPLES}.csv", index=False)
    # df_noise.to_csv(f"{DATASET_PARSED}/mbtcp-sigmoid-noise-c0-s{SAMPLES}-test.csv", index=False)


if __name__ == '__main__':
    main()
