import numpy as np
import pandas as pd
import math

from cfg import DATASET_PARSED

SAMPLES = 20000

def expo(x):
    return math.exp(x)

def expo_values(noise):
    x = np.linspace(-12, 11.08, SAMPLES)
    x_noise = x + noise

    y = [expo(x) for x in x]
    y_noise = [expo(x) for x in x_noise]

    x = [round(x, 5) for x in x]
    x_noise = [round(x, 5) for x in x_noise]
    y = [round(y, 5) for y in y]
    y_noise = [round(y, 5) for y in y_noise]

    return x, y, x_noise, y_noise


def main():
    noise = np.random.uniform(-0.0005, 0.0005, SAMPLES)
    x, y, x_noise, y_noise  = expo_values(noise)
    df = pd.DataFrame({'source_text': x, 'target_text': y})
    df_noise = pd.DataFrame({'source_text': x_noise, 'target_text': y_noise})
    print(df)
    print(df_noise)
    df.to_csv(f"{DATASET_PARSED}/mbtcp-expo-c1-s{SAMPLES}.csv", index=False)
    df_noise.to_csv(f"{DATASET_PARSED}/mbtcp-expo-c1-s{SAMPLES}-test.csv", index=False)


if __name__ == '__main__':
    main()
