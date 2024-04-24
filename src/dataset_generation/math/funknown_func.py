import numpy as np
from scipy.interpolate import interp1d
import plotly.graph_objects as go

# Example data
x = np.linspace(0, 10, 50)
y = np.sin(x) + np.log(x + 1)

# Compute the derivative
dydx = np.gradient(y, x)

# Determine where the derivatives are large
threshold = np.percentile(np.abs(dydx), 75)  # Example: 75th percentile
high_change_indices = np.where(np.abs(dydx) > threshold)[0]

# Generate new sample points in these high-change regions
new_x_points = []
for idx in high_change_indices:
    if idx < len(x) - 1:
        new_x_points.extend(np.linspace(x[idx], x[idx + 1], 5))  # Adding 5 points between samples

# Interpolate to find new y values at these x points
f = interp1d(x, y, kind='cubic')
new_y_points = f(new_x_points)

# Create Plotly plot
fig = go.Figure()

# Original data points
fig.add_trace(go.Scatter(x=x, y=y, mode='lines+markers', name='Original Points', marker=dict(color='blue')))

# Newly interpolated points
fig.add_trace(go.Scatter(x=new_x_points, y=new_y_points, mode='markers', name='New Points', marker=dict(color='red')))

fig.update_layout(title='Data Points and Interpolated Points in Regions of Rapid Change',
                  xaxis_title='X',
                  yaxis_title='Y',
                  legend_title='Legend')
fig.show()
