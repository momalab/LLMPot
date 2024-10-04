import argparse
import os

import pandas as pd

from utilities.utils import load_cfg


def main(model: str, experiment: str):
    finetuner_model = load_cfg(model, experiment)

    print("model, size, accuracy/validator, accuracy/exact")
    matching_df  = pd.DataFrame()
    for dataset in finetuner_model.datasets:
        finetuner_model.current_dataset = dataset

        versions = os.listdir(finetuner_model.experiment_dataset_result_path)
        versions = [folder for folder in versions if not folder == 'csv']

        for version in versions:
            finetuner_model.start_datetime = version
            with open(f"{finetuner_model.experiment_csv_metrics_path}") as metrics:
                new_metrics = pd.read_csv(metrics)
                new_metrics['size'] = dataset.size
                new_metrics['version'] = version

            checkpoint_files = os.listdir(f"{finetuner_model.experiment_instance_result_path}/checkpoints/")
            best_checkpoints = [file for file in checkpoint_files if file.startswith('best-')][0]
            best_epoch = best_checkpoints.split('-')[1].split('.')[0]


            matching_row = new_metrics[new_metrics['csv-epoch'] == int(best_epoch)]
            matching_row = matching_row[matching_row['csv-accuracy/validator'].notna()]
            print(model, version, dataset.size, matching_row['csv-accuracy/validator'].values[0], matching_row['csv-accuracy/exact'].values[0])

            matching_df = pd.concat([matching_df, matching_row])



        pd.set_option('display.max_rows', None)
        # print(matching_df)

    grouped = matching_df.groupby(['size']).agg({
        'csv-accuracy/validator': ['mean', 'std'],
        'csv-accuracy/exact': ['mean', 'std'],
        'csv-epoch': ['mean', 'std'],
    }).reset_index()

    for size, row in grouped.iterrows():
        validator_mean = row[('csv-accuracy/validator', 'mean')]
        validator_std = row[('csv-accuracy/validator', 'std')]
        exact_mean = row[('csv-accuracy/exact', 'mean')]
        exact_std = row[('csv-accuracy/exact', 'std')]
        epoch_mean = row[('csv-epoch', 'mean')]
        epoch_std = row[('csv-epoch', 'std')]

        print(f"{size} & ${exact_mean * 100:.2f} \pm {exact_std * 100:.2f}$ & ${validator_mean * 100:.2f} \pm {validator_std * 100:.2f}$ & ${epoch_mean:.0f} \pm {epoch_std:.0f}$")

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-model', default="byt5-base", required=False)
    parser.add_argument('-cfg', default="mbtcp-protocol-emulation.json", required=False)
    args = parser.parse_args()
    main(args.model, args.cfg)
