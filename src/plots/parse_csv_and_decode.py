import csv
import json

import plotly.graph_objects as go

from cfg import CHECKPOINTS, DATASET_PARSED

NATURE = ['#C03221', '#87BCDE', '#EDB88B', '#545E75', '#3F826D', '#88498F']
FONT_FAMILY = "Serif"

def make_plots()
with open(f'{DATASET_PARSED}/mbtcp-testbed.json/mbtcp-testbed-sp75-c1-s1600.csv', 'r') as file:
    with open(f'{CHECKPOINTS}/mbtcp-testbed.json/mbtcp-testbed-sp75-c1-s1600/20240627T1455/epoch-99_val_type-validator.jsonl', 'r') as ai_file:
        reader = csv.reader(file)

        json_array = []
        for line in ai_file:
            print(line)
            json_array.append(json.loads(line))

        next(reader)

        values_dict = {}
        for row in reader:
            time = row[0].split('|')[0]
            hex_value = row[1][len(row[1])-4:]
            decimal_value = int(hex_value, 16)

            values_dict[row[0].split('|')[0]] = {'ws': decimal_value, 'ws_ai': None}

        for line in json_array:
            hex_value = line['response'][len(line['response'])-4:]
            decimal_value = int(hex_value, 16)
            values_dict[line['context']] = {'ws': values_dict[line['context']]['ws'], 'ws_ai': decimal_value}

print(values_dict)

x = list(values_dict.keys())
y = [value['ws'] for value in values_dict.values()]
y_ai = [value['ws_ai'] for value in values_dict.values()]

fig = go.Figure()
fig.add_trace(go.Scatter(x=x, y=y, mode='markers', name='actual', marker=dict(color=NATURE[2], size=10, symbol='circle-dot')))
fig.add_trace(go.Scatter(x=x, y=y_ai, mode='markers', name='llm_predicted', marker=dict(color=NATURE[0], size=10, symbol='cross')))


fig.update_layout(
    xaxis_title='<b>Time(s)</b>',
    yaxis_title='<b>Steam Flow Rate()</b>',
    plot_bgcolor='rgba(0,0,0,0)',
    paper_bgcolor='rgba(0,0,0,0)',
    margin=dict(l=0, r=0, b=0, t=0, pad=0),
    font=dict(family=FONT_FAMILY, size=34, color="Black"),
    xaxis=dict(type='category', categoryorder='array'),
    legend=dict(yanchor="bottom", y=0.2, xanchor="right", x=0.9, orientation='v', font=dict(family=FONT_FAMILY, size=28)),
)

fig.update_xaxes(showline=True, linewidth=1.5, linecolor='gray', gridcolor='gray', gridwidth=1, griddash="dot",
                 zeroline=False, zerolinewidth=3, zerolinecolor='black',
                 )
fig.update_yaxes(showline=True, linewidth=1.5, linecolor='gray', gridcolor='gray', gridwidth=1, griddash="dot",
                 zeroline=False, zerolinewidth=3, zerolinecolor='black', range=[32500, 32790]
                 )

fig.update_layout(
    xaxis=dict(
        type='category',
        categoryorder='array',
        tickmode='array',
        tickvals=x[::30],
        ticktext=x[::30]
    )
)

fig.show()


def main():
    make_plots(f"{DATASET_PARSED}/mbtcp-testbed.json/mbtcp-testbed-sp75-c1-s1600.csv", f"{CHECKPOINTS}/mbtcp-testbed.json/mbtcp-testbed-sp75-c1-s1600/20240627T1455/epoch-99_val_type-validator.jsonl")