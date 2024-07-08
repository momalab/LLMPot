import csv
import json
import os
import random

import tqdm

from inference_runner import ModelLoader

from cfg import DATASET_PARSED, EXPERIMENTS
from finetune.model.finetuner_model import DatasetModel, FinetunerModel
import argparse

experiment_path = os.path.join(DATASET_PARSED, "mbtcp-testbed.json")

parser = argparse.ArgumentParser()
parser.add_argument("--sp", type=int, default=75, help="sp")
parser.add_argument("--size", type=int, default=1600, help="size")
parser.add_argument("--cuda", type=int, default=0, help="cuda device")
parser.add_argument("--runs", nargs="+", help="list of values")
args = parser.parse_args()

with open(f"{EXPERIMENTS}/mbtcp-testbed.json", "r") as cfg:
    config = cfg.read()
    config = json.loads(config)
    finetuner_model = FinetunerModel(**config)
    finetuner_model.experiment = "mbtcp-testbed.json"
    finetuner_model.current_dataset = DatasetModel(protocol="mbtcp", size=1600, client=f"testbed-sp{args.sp}", context=1)
    finetuner_model.start_datetime = "20240627T1455"

    model_loader = ModelLoader(finetuner_model, cuda=args.cuda)
    model, tokenizer = model_loader.load_model(finetuner_model)

for csv_file in os.listdir(experiment_path):
    if "result" in csv_file or ((f"sp{args.sp}-c1-s{args.size}") not in csv_file):
        print(f"Skipping {csv_file}")
        continue

    runs = [int(value) for value in args.runs]
    for i in runs:
        print(f"Processing {csv_file}")
        with open(os.path.join(experiment_path, csv_file), 'r') as file:
            reader = csv.reader(file)
            next(reader) # skip header
            rows = list(reader)

            for row in rows:
                if float(row[0].split('|')[0]) == 0.0:
                    continue
                time = float(row[0].split('|')[0]) + random.choice([0.01, -0.01])
                row[0] = str("{:.2f}".format(float(time))) + "|" + row[0].split('|')[1]

        with open(f"{file.name.split('.csv')[0]}_result_run_{i}.csv", 'w', newline='') as result_file:
            writer = csv.writer(result_file)
            for row in tqdm.tqdm(rows):
                result = model_loader.predict(row[0], model, tokenizer)
                writer.writerow([row[0], result])
