import numpy as np
from scipy.integrate import cumtrapz
from scipy.interpolate import interp1d

import plotly.io as pio
pio.kaleido.scope.mathjax = None

class Function:

    def __init__(self, the_function) -> None:
        self.the_function = the_function
        self.the_derivative = the_function + "_derivative"

    def func(self, x):
        func = getattr(Function, self.the_function)
        return func(x)

    def derivative(self, x):
        func = getattr(Function, self.the_derivative)
        return func(x)

    @staticmethod
    def sgn(x):
        return np.sign(x)

    @staticmethod
    def sgn_derivative(x): #2*Dirac delta function
        if x == 0:
            return np.inf  # Represents the Dirac delta spike at x = 0
        return 0

    @staticmethod
    def sigmoid(x):
        return 1 / (1 + np.exp(-x))

    @staticmethod
    def sigmoid_derivative(x):
        return Function.sigmoid(x) * (1 - Function.sigmoid(x))

    @staticmethod
    def expo10(x):
        return np.power(10, x)

    @staticmethod
    def expo10_derivative(x):
        return np.power(10, x) * np.log(10)

    @staticmethod
    def cauchy(x):
        return 1 / (np.pi * (1 + x ** 2))

    @staticmethod
    def cauchy_derivative(x, x0=0, gamma=1):
        numerator = -2 * (x - x0)
        denominator = np.pi * gamma**3 * (1 + ((x - x0) / gamma) ** 2) ** 2
        return numerator / denominator

    def remove_decimals(self, x, y, dec_num = 4):
        x = [round(x, dec_num) for x in x]
        y = [round(y, dec_num) for y in y]
        return x, y

    def func_values(self, low, high, samples):
        x = np.linspace(low, high, samples)
        y = self.func(x)
        return x, y

    def func_values_sampled(self, x, samples):
        derivative_values = self.derivative(x)

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

        y = [self.func(x) for x in sampled_x_values]
        y_orig = [self.func(x) for x in x]

        scale_factor_pdf = max(y) / max(pdf)

        return x, y, sampled_x_values, y_orig, pdf, scale_factor_pdf

    def func_values_with_noise(self, x, samples):
        noise = np.random.uniform(-0.05, 0.05, samples)
        x_noise = x + noise
        y_noise = [self.the_function(x) for x in x_noise]

        return x_noise ,y_noise
