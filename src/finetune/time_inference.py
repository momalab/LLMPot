import csv
import json
import os
import random

import tqdm

from inference_runner import load_model, predict

from cfg import DATASET_PARSED, EXPERIMENTS
from finetune.model.finetuner_model import FinetunerModel

experiment_path = os.path.join(DATASET_PARSED, "mbtcp-testbed.json")

with open(f"{EXPERIMENTS}/mbtcp-testbed.json", "r") as cfg:
    config = cfg.read()
    config = json.loads(config)
    finetuner_model = FinetunerModel(**config)
    finetuner_model.experiment = "mbtcp-testbed.json"
    finetuner_model.current_dataset = finetuner_model.datasets[0]
    finetuner_model.start_datetime = "20240627T1455"

    model, tokenizer = load_model(finetuner_model)

for csv_file in os.listdir(experiment_path):
    print(f"Processing {csv_file}")
    with open(os.path.join(experiment_path, csv_file), 'r') as file:
        reader = csv.reader(file)
        next(reader) # skip header
        next(reader) # skip 0 time point
        rows = list(reader)

        for row in rows:
            time = float(row[0].split('|')[0]) + random.choice([0.01, -0.01])
            row[0] = str("{:.2f}".format(float(time))) + "|" + row[0].split('|')[1]

    with open(f"{file.name}_result.csv", 'w', newline='') as result_file:
        writer = csv.writer(result_file)
        for row in tqdm.tqdm(rows):
            result = predict(row[0], model, tokenizer)
            writer.writerow([row[0], result])
