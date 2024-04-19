from matplotlib import pyplot as plt
import numpy as np
import pandas as pd
import math
from scipy.integrate import cumtrapz
from scipy.interpolate import interp1d

from cfg import DATASET_PARSED

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
    mix_ratio = 0.9
    uniform_pdf = np.ones_like(derivative_values) / len(derivative_values)
    adjusted_pdf = (1 - mix_ratio) * derivative_values + mix_ratio * uniform_pdf
    adjusted_pdf /= np.sum(adjusted_pdf * np.diff(x)[0])
    cdf = cumtrapz(adjusted_pdf, x, initial=0)
    cdf /= cdf[-1]
    
    uniform_random_samples = np.random.rand(SAMPLES)
    inverse_cdf = interp1d(cdf, x, kind='linear')
    sampled_x_values = inverse_cdf(uniform_random_samples)
    sampled_x_values = np.sort(sampled_x_values)
    sampled_x_values = np.append(sampled_x_values, 10)
    sampled_x_values = np.append(-10, sampled_x_values)
    
    y = [sigmoid(x) for x in sampled_x_values]
    
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
