import numpy as np
from scipy.interpolate import interp1d
import plotly.graph_objects as go

# Example data
x = np.linspace(0, 10, 50)
# y = np.sin(x) + np.log(x + 1)
y = np.exp(x)

# Compute the derivative
dydx = np.gradient(y, x)

# Normalize the derivative
norm_dydx = np.abs(dydx) / np.sum(np.abs(dydx))

# Minimum number of points between each original point
min_points = 3
# Additional points based on the normalized derivative
additional_points = (norm_dydx * 200).astype(int)  # Scale factor to adjust density

# Generate new sample points considering the derivative magnitude
new_x_points = []
new_y_points = []
for i in range(len(x)-1):
    num_points = min_points + additional_points[i]
    new_xs = np.linspace(x[i], x[i+1], num=num_points)
    new_x_points.extend(new_xs)

# Interpolate to find new y values at these x points
f = interp1d(x, y, kind='cubic')
new_y_points = f(new_x_points)

# Create Plotly plot
fig = go.Figure()

# Original data points
fig.add_trace(go.Scatter(x=x, y=y, mode='lines+markers', name='Original Points', marker=dict(color='blue')))

# Newly interpolated points
fig.add_trace(go.Scatter(x=new_x_points, y=new_y_points, mode='markers', name='New Points', marker=dict(color='red')))

fig.update_layout(title='Data Points and Interpolated Points Based on Derivative Magnitude',
                  xaxis_title='X',
                  yaxis_title='Y',
                  legend_title='Legend')
fig.show()
