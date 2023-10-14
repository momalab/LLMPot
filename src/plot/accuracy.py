import json
import argparse
import pandas as pd
import plotly.graph_objects as go
from cfg import OUTPUTS_DIR


def test_accuracy(metric_file, finetuned_model_name):
    accuracy = [0.98, 0.88]
    variations = ['byt5-small', 'byt5-large']

    fig = go.Figure(data=[
        go.Bar(name='dumy', x=variations , y=accuracy, color='variations', text_auto=True),
        go.Bar(name='micro', x=variations , y=accuracy, color='variations', text_auto=True),
    ], title = 'Accuracy vs Model Size')
    fig.update_layout(barmode='group')
    fig.show()
    fig.write_image(f"{OUTPUTS_DIR}/plots/{finetuned_model_name}_accuracy.jpeg")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-mnf', required=True)
    args = parser.parse_args()

    finetuned_model_name = args.mnf

    with open(f"{OUTPUTS_DIR}/metrics/{finetuned_model_name}.jsonl") as data:
            result_file = json.load(data)
    metric_file = pd.read_json(result_file, orient ='index')
    test_accuracy(metric_file, finetuned_model_name)


if __name__ == '__main__':
    main()