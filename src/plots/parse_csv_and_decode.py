import csv
import json
import os

from matplotlib import pyplot as plt
import plotly.graph_objects as go

import plotly.io as pio
pio.kaleido.scope.mathjax = None

from cfg import ASSETS, CHECKPOINTS, DATASET_PARSED
from sklearn.cluster import KMeans

NATURE = ['#C03221', '#87BCDE', '#EDB88B', '#545E75', '#3F826D', '#88498F']
FONT_FAMILY = "Serif"

def make_plots(experiment: str, csv_file: str, version: str, jsonl_file: str, spacing: int):
    with open(f"{DATASET_PARSED}/{experiment}/{csv_file}.csv", 'r') as orig_data_file, open(f"{CHECKPOINTS}/{experiment}/{csv_file}/{version}/{jsonl_file}", 'r') as predictions_file:
        orig_data = csv.reader(orig_data_file)

        predictions = []
        for prediction in predictions_file:
            predictions.append(json.loads(prediction))

        next(orig_data) #skip header

        values_dict = {}
        for row in orig_data:
            time = row[0].split('|')[0]
            hex_value = row[1][len(row[1])-4:]
            decimal_value = int(hex_value, 16)

            values_dict[time] = {'ws': decimal_value, 'ws_ai': None}

        for line in predictions:
            hex_value = line['response'][len(line['response'])-4:]
            decimal_value = int(hex_value, 16)
            values_dict[line['context']] = {'ws': values_dict[line['context']]['ws'], 'ws_ai': decimal_value}

    x = list(values_dict.keys())
    y = [value['ws'] for value in values_dict.values()]
    y_ai = [value['ws_ai'] for value in values_dict.values()]

    pairs = [(key, value['ws_ai']) for key, value in values_dict.items() if value['ws_ai'] is not None]
    x_2 = [pair[0] for pair in pairs]
    y_2 = [pair[1] for pair in pairs]

    fig = go.Figure()
    # fig.add_trace(go.Scatter(x=x, y=y, mode='markers', name='actual', marker=dict(color=NATURE[2], size=10, symbol='circle-dot')))
    # fig.add_trace(go.Scatter(x=x, y=y_ai, mode='markers', name='llm_predicted', marker=dict(color=NATURE[0], size=10, symbol='cross')))


    fig.update_layout(
        xaxis_title='<b>Time(s)</b>',
        yaxis_title='<b>Steam Flow Rate(kg/min)</b>',
        plot_bgcolor='rgba(0,0,0,0)',
        paper_bgcolor='rgba(0,0,0,0)',
        margin=dict(l=0, r=0, b=0, t=5, pad=0),
        font=dict(family=FONT_FAMILY, size=32, color="Black"),
        xaxis=dict(type='category', categoryorder='array'),
        legend=dict(yanchor="top", y=1.12, xanchor="right", x=0.9, orientation='h', font=dict(family=FONT_FAMILY, size=28)),
    )

    fig.update_xaxes(showline=True, linewidth=1.5, linecolor='gray', gridcolor='gray', gridwidth=1, griddash="dot",
                     zeroline=False, zerolinewidth=3, zerolinecolor='black',
                     )
    fig.update_yaxes(showline=True, linewidth=1.5, linecolor='gray', gridcolor='gray', gridwidth=1, griddash="dot",
                     zeroline=False, zerolinewidth=3, zerolinecolor='black'
                     )

    fig.update_layout(
        xaxis=dict(
            type='category',
            categoryorder='array',
            tickmode='array',
            tickangle=30,
            tickvals=x[::spacing],
            ticktext=x[::spacing]
        )
    )

    # fig.show()
    os.makedirs(f"{ASSETS}/{experiment}", exist_ok=True)
    fig.write_image(f"{ASSETS}/{experiment}/{csv_file}.pdf")

    def calculate_and_plot_kmeans_clusters(x, y, num_clusters):
        data = list(zip(x, y))
        kmeans = KMeans(n_clusters=num_clusters)
        kmeans.fit(data)

        inertias = []

        # for i in range(1,11):
        #     kmeans = KMeans(n_clusters=i)
        #     kmeans.fit(data)
        #     inertias.append(kmeans.inertia_)

        fig2 = go.Figure()
        fig2.add_trace(go.Scatter(x=list(range(1, 11)), y=inertias, mode='markers', marker=dict(symbol='circle', size=10)))
        fig2.update_layout(
            title='Elbow method',
            xaxis_title='Number of clusters',
            yaxis_title='Inertia',
            font=dict(family=FONT_FAMILY, size=32, color="Black"),
            legend=dict(yanchor="top", y=1.12, xanchor="right", x=0.9, orientation='h', font=dict(family=FONT_FAMILY, size=28)),
        )
        # fig2.show()



        def create_custom_colorscale(colors):
            num_colors = len(colors)
            colorscale = []
            for i in range(num_colors):
                colorscale.append([i / (num_colors - 1), colors[i]])
            return colorscale

        custom_colorscale = create_custom_colorscale(NATURE)

        fig.add_trace(go.Scatter(x=x, y=y, mode='markers', marker=dict(size=12, color=kmeans.labels_, colorscale=custom_colorscale, showscale=True)))

        # Update the layout to include the cluster legend
        fig.update_layout(
            legend=dict(yanchor="top", y=1.12, xanchor="right", x=0.9, orientation='h', font=dict(family=FONT_FAMILY, size=28)),
        )

        # Get the centroid for each cluster
        centroids = kmeans.cluster_centers_

        print(centroids)

    # Call the function for each set of data
    calculate_and_plot_kmeans_clusters(x, y, 5)

    calculate_and_plot_kmeans_clusters(x_2, y_2, 4)

    fig.show()


def main():
    # make_plots("mbtcp-testbed.json", "mbtcp-testbed-sp75-c1-s1600", "20240627T1455", "epoch-99_val_type-validator.jsonl", 200)
    make_plots("mbtcp-testbed.json", "mbtcp-testbed-sp75-c1-s3200", "20240627T1455", "epoch-87_val_type-validator.jsonl", 400)
    # make_plots("mbtcp-testbed.json", "mbtcp-testbed-sp80-c1-s1600", "20240627T1455", "epoch-41_val_type-validator.jsonl", 200)
    # make_plots("mbtcp-testbed.json", "mbtcp-testbed-sp80-c1-s3200", "20240627T1455", "epoch-99_val_type-validator.jsonl", 400)
    # make_plots("mbtcp-testbed.json", "mbtcp-testbed-sp85-c1-s1600", "20240627T1455", "epoch-30_val_type-validator.jsonl", 200)
    # make_plots("mbtcp-testbed.json", "mbtcp-testbed-sp85-c1-s3200", "20240627T1455", "epoch-47_val_type-validator.jsonl", 400)

if __name__ == '__main__':
    main()