import numpy as np
import pandas as pd
import math
from scipy.integrate import cumtrapz
from scipy.interpolate import interp1d

from cfg import DATASET_PARSED

SAMPLES = 5000
LOW = -12
HIGH = 11.08

def remove_decimals(x, y, dec_num = 4):
    x = [round(x, dec_num) for x in x]
    y = [round(x, dec_num) for x in y]

    return x, y

def expo(x):
    return np.exp(x)

def expo_values():
    x = np.linspace(LOW, HIGH, SAMPLES)
    y = [expo(x) for x in x]
    
    return x, y

def expo_values_sampled(x):
    derivative_values = expo(x)
    
    power = 0.3  # Adjusting to a less aggressive power reduction
    pdf = np.power(derivative_values, power)
    pdf /= np.sum(pdf * np.diff(x)[0])
    
    mix_ratio = 0.3
    uniform_pdf = np.ones_like(pdf) / len(pdf)
    adjusted_pdf = (1 - mix_ratio) * pdf + mix_ratio * uniform_pdf
    adjusted_pdf /= np.sum(adjusted_pdf * np.diff(x)[0])
    cdf = cumtrapz(adjusted_pdf, x, initial=0)
    cdf /= cdf[-1]
    
    uniform_random_samples = np.random.rand(SAMPLES)
    inverse_cdf = interp1d(cdf, x, kind='linear')
    sampled_x_values = inverse_cdf(uniform_random_samples)
    sampled_x_values = np.sort(sampled_x_values)
    
    y = [expo(x) for x in sampled_x_values]
    
    return sampled_x_values, y

def expo_values_with_noise(x):
    noise = np.random.uniform(-0.5, 0.5, SAMPLES)
    x_noise = x + noise
    y_noise = [expo(x) for x in x_noise]

    return x_noise ,y_noise


def main():
    x, y = expo_values()
    x_sampled, y_sampled = expo_values_sampled(x)
    x_noise, y_noise = expo_values_with_noise(x)
    
    x, y = remove_decimals(x, y)
    x_sampled, y_sampled = remove_decimals(x_sampled, y_sampled)
    x_noise, y_noise = remove_decimals(x_noise, y_noise)
    
    df = pd.DataFrame({'source_text': x, 'target_text': y})
    df_sampled = pd.DataFrame({'source_text': x_sampled, 'target_text': y_sampled})
    df_noise = pd.DataFrame({'source_text': x_noise, 'target_text': y_noise})

    # df.to_csv(f"{DATASET_PARSED}/mbtcp-expo-simple-c0-s{SAMPLES}.csv", index=False)
    df_sampled.to_csv(f"{DATASET_PARSED}/mbtcp-expo-sampled3-c0-s{SAMPLES}.csv", index=False)
    # df_noise.to_csv(f"{DATASET_PARSED}/mbtcp-expo-noise-c0-s{SAMPLES}-test.csv", index=False)


if __name__ == '__main__':
    main()
