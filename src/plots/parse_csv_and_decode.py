import csv
import json
import os

import numpy as np
import plotly.graph_objects as go
import plotly.io as pio
from scipy.stats import ks_2samp, levene, mannwhitneyu, pearsonr, spearmanr
from sklearn.metrics import euclidean_distances
from sympy import centroid

pio.kaleido.scope.mathjax = None

from sklearn.cluster import KMeans

from cfg import ASSETS, CHECKPOINTS, DATASET_PARSED

NATURE = ['#C03221', '#87BCDE', '#EDB88B', '#545E75', '#3F826D', '#88498F']
FONT_FAMILY = "Serif"

def make_plots(experiment: str, csv_file: str, version: str, jsonl_file: str, spacing: int):
    with open(f"{DATASET_PARSED}/{experiment}/{csv_file}.csv", 'r') as orig_data_file:
        # with open(f"{CHECKPOINTS}/{experiment}/{csv_file}/{version}/{jsonl_file}", 'r') as predictions_file:
        orig_data = csv.reader(orig_data_file)

        # predictions = []
        # for prediction in predictions_file:
        #     predictions.append(json.loads(prediction))

        next(orig_data) #skip header

        values_dict = {}
        for row in orig_data:
            time = row[0].split('|')[0]
            hex_value = row[1][len(row[1])-4:]
            decimal_value = int(hex_value, 16)

            values_dict[time] = {'ws': decimal_value, 'ws_ai': None}

        # for line in predictions:
        #     hex_value = line['response'][len(line['response'])-4:]
        #     decimal_value = int(hex_value, 16)
            # values_dict[line['context']] = {'ws': values_dict[line['context']]['ws'], 'ws_ai': decimal_value}

        x = list(values_dict.keys())
        x = [float(value) for value in x]
        y = [float(value['ws']) for value in values_dict.values()]
        # y_ai = [value['ws_ai'] for value in values_dict.values()]

        # pairs = [(key, value['ws_ai']) for key, value in values_dict.items() if value['ws_ai'] is not None]
        # x_ai = [pair[0] for pair in pairs]
        # y_ai = [pair[1] for pair in pairs]

        fig = go.Figure()
        fig.add_trace(go.Scatter(x=x, y=y, mode='markers', name='actual', marker=dict(color=NATURE[2], size=10, symbol='circle-dot')))
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
        # os.makedirs(f"{ASSETS}/{experiment}", exist_ok=True)
        # fig.write_image(f"{ASSETS}/{experiment}/{csv_file}.pdf")

        return x, y

def elbow_method(x, y):
    data = list(zip(x, y))

    inertias = []

    for i in range(1,11):
        kmeans = KMeans(n_clusters=i)
        kmeans.fit(data)
        inertias.append(kmeans.inertia_)

    fig = go.Figure()
    fig.add_trace(go.Scatter(x=list(range(1, 11)), y=inertias, mode='markers', marker=dict(symbol='circle', size=10)))
    fig.update_layout(
        title='Elbow method',
        xaxis_title='Number of clusters',
        yaxis_title='Inertia',
        font=dict(family=FONT_FAMILY, size=32, color="Black"),
        legend=dict(yanchor="top", y=1.12, xanchor="right", x=0.9, orientation='h', font=dict(family=FONT_FAMILY, size=28)),
    )

    # fig.show()



def calculate_and_plot_kmeans_clusters(x, y, num_clusters):
    data = list(zip(x, y))
    data = np.array(data, dtype=float)
    kmeans = KMeans(n_clusters=num_clusters)
    kmeans.fit(data)

    custom_colorscale = create_custom_colorscale(NATURE)

    fig = go.Figure()
    fig.add_trace(go.Scatter(x=x, y=y, mode='markers', marker=dict(size=12, color=kmeans.labels_, colorscale=custom_colorscale, showscale=True)))

    fig.update_layout(
        legend=dict(yanchor="top", y=1.12, xanchor="right", x=0.9, orientation='h', font=dict(family=FONT_FAMILY, size=28)),
    )

    centroids = kmeans.cluster_centers_
    labels = kmeans.labels_

    print("#############################")

    print(centroids)

    print("#############################")

    for index, centroid in enumerate(centroids):
        cluster_data = data[labels == index]
        print(f"Cluster {index + 1} has {len(cluster_data)} data points")
        mean_distance(cluster_data, centroid)

    # fig.show()
    return data, centroids


def mean_distance(cluster_data, centroid):
    distances = np.sqrt(np.sum((cluster_data - centroid)**2, axis=1))
    print(f"Centroid: {centroid}, distance: {np.mean(distances)}")

def create_custom_colorscale(colors):
    num_colors = len(colors)
    colorscale = []
    for i in range(num_colors):
        colorscale.append([i / (num_colors - 1), colors[i]])
    return colorscale


def strip_file_blank_space(experiment: str, filename: str):
    with open(f"{DATASET_PARSED}/{experiment}/{filename}", "rb") as f:
        data = f.read().replace(b'\x00', b'')
    with open(f"{DATASET_PARSED}/{experiment}/{filename}", "wb") as f:
        f.write(data)


def main():
    # make_plots("mbtcp-testbed.json", "mbtcp-testbed-sp75-c1-s1600", "20240627T1455", "epoch-99_val_type-validator.jsonl", 200)

    x, y = make_plots("mbtcp-testbed.json", "mbtcp-testbed-sp75-c1-s1600", "20240627T1455", "epoch-40_val_type-validator.jsonl", 400)
    # elbow_method(x, y)
    data, centroids = calculate_and_plot_kmeans_clusters(x, y, 4)

    # strip_file_blank_space("mbtcp-testbed.json", "mbtcp-testbed-sp75-c1-s1600.csv_result.csv")
    x_ai, y_ai = make_plots("mbtcp-testbed.json", "mbtcp-testbed-sp75-c1-s1600.csv_result", "20240627T1455", "epoch-40_val_type-validator.jsonl", 400)
    # elbow_method(x, y)
    data_ai, centroids_ai = calculate_and_plot_kmeans_clusters(x_ai, y_ai, 4)

    std_dev = np.std(data_ai[:, 1])
    distances = euclidean_distances(centroids, centroids_ai)

    # Print the distances and compare with standard deviation
    for i in range(len(centroids)):
        distance = distances[i][i]
        print(f"Distance between centroid {i} of actual data and centroid {i} of predicted data: {distance}")
        if distance < std_dev:
            print(f"Distance is within acceptable range (std_dev: {std_dev})")
        else:
            print(f"Distance is NOT within acceptable range (std_dev: {std_dev})")

    # Statistical test for distribution
    ks_stat, ks_p = ks_2samp(y, y_ai)
    print(f"KS-test statistic: {ks_stat}, P-value: {ks_p}")

    # Correlation coefficients
    pearson_corr, _ = pearsonr(x, y)
    print(f"Pearson Correlation (Dataset 1): {pearson_corr}")
    pearson_corr, _ = pearsonr(x_ai, y_ai)
    print(f"Pearson Correlation (Dataset 2): {pearson_corr}")
    spearman_corr, _ = spearmanr(x, y)
    print(f"Spearman Correlation (Dataset 1): {spearman_corr}")
    spearman_corr, _ = spearmanr(x_ai, y_ai)
    print(f"Spearman Correlation (Dataset 2): {spearman_corr}")

    # Test for equality of variance
    var_stat, var_p = levene(y, y_ai)
    print(f"Levene's test for equal variances: Statistic={var_stat}, P-value={var_p}")

    stat, p = mannwhitneyu(data, data_ai, alternative='two-sided')
    print(f'Mann-Whitney U stat={stat}, P-value={p}')

    # make_plots("mbtcp-testbed.json", "mbtcp-testbed-sp80-c1-s1600", "20240627T1455", "epoch-41_val_type-validator.jsonl", 200)
    # make_plots("mbtcp-testbed.json", "mbtcp-testbed-sp80-c1-s3200", "20240627T1455", "epoch-99_val_type-validator.jsonl", 400)
    # make_plots("mbtcp-testbed.json", "mbtcp-testbed-sp85-c1-s1600", "20240627T1455", "epoch-30_val_type-validator.jsonl", 200)
    # make_plots("mbtcp-testbed.json", "mbtcp-testbed-sp85-c1-s3200", "20240627T1455", "epoch-47_val_type-validator.jsonl", 400)

if __name__ == '__main__':
    main()