from enum import auto
import json
from tkinter import font
from numpy import size
import plotly.graph_objects as go
from plotly.subplots import make_subplots

from cfg import ASSETS
import plotly.io as pio
pio.kaleido.scope.mathjax = None


with open(f"{ASSETS}/country_counts.json", "r") as fp:
    country = json.load(fp)

keys = sorted(country.keys())
values = [country[key] for key in keys]

fig = make_subplots(rows=2, cols=1, shared_xaxes=True,
                    vertical_spacing=0.02,
                    subplot_titles=('<b>Countries</b>', ''),
                    y_title='<b># distinct IPs</b>',
                    row_heights=[0.3, 0.7],
                    )
fig.add_shape(type="line", xref="paper", yref="paper", x0=0, y0=0.695, x1=1, y1=0.695,
              line=dict(color="black", width=1, dash="dot"))

fig.add_trace(go.Bar(x=keys, y=values, marker=dict(color='#EDB88B')), row=1, col=1)
fig.add_trace(go.Bar(x=keys, y=values, marker=dict(color='#EDB88B')), row=2, col=1)

fig.update_yaxes(range=[200, 400], row=1, col=1)
fig.update_yaxes(range=[0, 55], row=2, col=1)
fig.update_annotations(font=dict(size=32))

fig.update_layout(
    margin=dict(pad=0, r=0, b=0, t=35, l=0),
    font=dict(family='Serif', size=26),
    yaxis=dict(tickfont=dict(size=26)),
    yaxis2=dict(tickfont=dict(size=26)),
    paper_bgcolor='rgba(0,0,0,0)',
    plot_bgcolor='rgba(0,0,0,0)',
    showlegend=False,
    width=1200,
    height=400,
    autosize=False,
)

# fig.show()
fig.write_image(f"{ASSETS}/interaction.pdf")

