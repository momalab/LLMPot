import csv
import json
import os
import random

import tqdm

from finetune.utils.inference_runner import ModelLoader

from cfg import DATASET_PARSED, EXPERIMENTS
from finetune.model.finetuner_model import DatasetModel, FinetunerModel
import argparse

EXPERIMENT_FILE_NAME = "mbtcp-testbed.json"
experiment_path = os.path.join(DATASET_PARSED, EXPERIMENT_FILE_NAME)

parser = argparse.ArgumentParser()
parser.add_argument("--sp", type=str, default="00", help="sp")
parser.add_argument("--cuda", type=int, default=0, help="cuda device")
parser.add_argument("--runs", nargs="+", default=[1], help="list of values")
parser.add_argument("--model", type=str, default="byt5-small", help="the model to use")
parser.add_argument("--timestamp", type=str, default="20240708T1621", help="timestamp of finetuning")
args = parser.parse_args()

EXPERIMENT_TIMESTAMP = args.timestamp

slots = [20, 40, 60, 80]

with open(f"{EXPERIMENTS}/{args.model}/{EXPERIMENT_FILE_NAME}", "r") as cfg:
    config = cfg.read()
    config = json.loads(config)
    finetuner_model = FinetunerModel(experiment=EXPERIMENT_FILE_NAME, **config)
    # finetuner_model.current_dataset = DatasetModel(protocol="mbtcp", size=args.size, client=f"testbed-sp{args.sp}", context=1)
    finetuner_model.start_datetime = EXPERIMENT_TIMESTAMP

    model_loader = ModelLoader(finetuner_model, cuda=args.cuda)
    model, tokenizer = model_loader.load_model(finetuner_model)

for csv_file in os.listdir(experiment_path):
    if not csv_file.endswith(".csv"):
        continue
    size = int(csv_file.split('-')[4].split('.')[0][1:])
    if "result" in csv_file or (f"sp{args.sp}-c2-s{size}" not in csv_file):
        print(f"Skipping {csv_file}")
        continue

    runs = [int(value) for value in args.runs]
    for i in runs:
        print(f"Processing {csv_file}")
        with open(os.path.join(experiment_path, csv_file), 'r') as file:
            reader = csv.reader(file)
            next(reader) # skip header
            rows = list(reader)

            new_lines = []
            for row in rows:
                time = float(row[0].split('|')[0].split('-')[1]) + random.choice([0.02, -0.02])
                sp = float(row[0].split('|')[0].split('-')[0])

                if time < slots[0]:
                    if sp != 80:
                        continue
                elif slots[0] <= time < slots[1]:
                    if sp != 70:
                        continue
                elif slots[1] <= time < slots[2]:
                    if sp != 85:
                        continue
                elif time >= slots[2]:
                    if sp != 75:
                        continue

                new_lines.append(str(sp) + "-" + str("{:.2f}".format(float(time))) + "|" + row[0].split('|')[1])
                if len(new_lines) > size:
                    break
        print(f"Total lines: {len(new_lines)}")
        with open(f"{file.name.split('.csv')[0]}_result_run_{i}.csv", 'w', newline='') as result_file:
            writer = csv.writer(result_file)
            for new_line in tqdm.tqdm(new_lines):
                result = model_loader.predict(new_line, model, tokenizer)
                writer.writerow([new_line, result])
