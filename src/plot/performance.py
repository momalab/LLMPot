import argparse
import datetime
import pandas as pd
import plotly.express as px
from cfg import OUTPUTS_DIR


def plot_performance(log_file, finetuned_model_name):
    a = datetime.datetime(2023, 10, 10, 11, 44)     # byt5-small-300k-no-context-epochs-9: 2023-10-10 11:44 - 2023-10-11 22:23 > duration= 1 day, 10 hours, 39 minutes
    b = datetime.datetime(2023, 10, 11, 22, 23)
    c1 = b-a
    a = datetime.datetime(2023, 10, 11, 16, 6)     # byt5-small-100k-no-context-epochs-9: 2023-10-11 16:06 - 2023-10-12 02:55 > duration= 0 day, 10 hours, 49 minutes
    b = datetime.datetime(2023, 10, 12, 2, 55)
    c2 = b-a
    a = datetime.datetime(2023, 10, 10, 11, 25)     # byt5-small-300k-no-context-epochs-14: 2023-10-10 11:25 - 2023-10-12 17:04 > duration= 2 days, 5 hours, 39 minutes
    b = datetime.datetime(2023, 10, 12, 17, 4)
    c3 = b-a

    data = {'duration': [c1, c2, c3], 
        'variations': ["byt5-small-300k-no-context-epochs-9", "byt5-small-100k-no-context-epochs-9", "byt5-small-300k-no-context-epochs-14"]} 
    df = pd.DataFrame(data)
    fig = px.bar(df, x='variations', y='duration', color='variations', text_auto=True, title = 'Performance Evaluation')
    fig.show()
    fig.write_image(f"{OUTPUTS_DIR}/plots/{finetuned_model_name}_performance.jpeg")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-mnf', required=True)
    args = parser.parse_args()

    finetuned_model_name = args.mnf

    with open(f"{OUTPUTS_DIR}/logs/{finetuned_model_name}.log") as data:
        log_file = data.readlines()
    plot_performance(log_file, finetuned_model_name)


if __name__ == '__main__':
    main()