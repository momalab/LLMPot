import json
from enum import auto
from tkinter import font
from turtle import title

import plotly.graph_objects as go
import plotly.io as pio
from numpy import size
from plotly.subplots import make_subplots

from cfg import ASSETS

pio.kaleido.scope.mathjax = None

FONT_FAMILY = "Serif"

with open(f"{ASSETS}/country_counts.json", "r") as fp:
    country = json.load(fp)

keys = sorted(country.keys())
values = [country[key] for key in keys]

print("Sum: ", sum(values))

fig = make_subplots(rows=2, cols=1, shared_xaxes=True,
                    vertical_spacing=0.10,
                    subplot_titles=('<b>Countries</b>', ''),
                    row_heights=[0.3, 0.7],
                    )
fig.add_shape(type="line", xref="paper", yref="paper", x0=0, y0=0.695, x1=1, y1=0.695,
              line=dict(color="black", width=1, dash="dot"))

fig.add_trace(go.Bar(x=keys, y=values, marker=dict(color='#EDB88B')), row=1, col=1)
fig.add_trace(go.Bar(x=keys, y=values, marker=dict(color='#EDB88B')), row=2, col=1)

fig.update_yaxes(range=[800, 1400], row=1, col=1)
fig.update_yaxes(range=[0, 300], row=2, col=1)
fig.update_annotations(font=dict(size=32))

fig.update_layout(
    margin=dict(pad=0, r=0, b=0, t=35, l=100),
    font=dict(family=FONT_FAMILY, size=26, color="Black"),
    paper_bgcolor='rgba(0,0,0,0)',
    plot_bgcolor='rgba(0,0,0,0)',
    showlegend=False,
    width=1600,
    height=400,
    autosize=False,
)

fig.add_annotation(
    text='<b># Distinct IPs</b>',
    xref="paper", yref="paper",
    x=-0.07, y=0.5,
    showarrow=False,
    textangle=-90,  # Vertical text
    font=dict(size=32)
)

# fig.show()
fig.write_image(f"{ASSETS}/interaction.pdf")
