import argparse
import datetime
import json
import os
import sys
import time
from typing import Dict

from lightning.pytorch.loggers import CSVLogger, TensorBoardLogger

from cfg import EXPERIMENTS
from finetune.byt5 import Byt5
from finetune.llama2 import Llama2
from finetune.model.finetuner_model import FinetunerModel
from utilities.logger import TheLogger


def main(model: str, experiment: str, pairs: Dict[int, int]):
    print(f"Experiment: {model}  / {experiment} / Pairs: {pairs} / CUDA: {os.environ.get('CUDA_VISIBLE_DEVICES')}")
    with open(f"{EXPERIMENTS}/{model}/{experiment}", "r") as cfg:
        config = cfg.read()
        config = json.loads(config)
        finetuner_model = FinetunerModel(experiment, **config)


    for dataset in finetuner_model.datasets:
        for it in range(0, pairs[dataset.size]):
            print(f"Dataset: {dataset} - {it}")
            try:
                finetuner_model.current_dataset = dataset
                log = TheLogger(str(finetuner_model), finetuner_model.log_output_dir)
                if os.path.exists(f"{finetuner_model.experiment_dataset_result_path}/{finetuner_model.start_datetime}"):
                    log.warning(f'Experiment {dataset} already exists.')
                    continue
                log.info(f'Fine tuning {dataset}, instance: {finetuner_model.start_datetime}')
                log.info(f"Start time: {finetuner_model.start_time} - {datetime.datetime.fromtimestamp(finetuner_model.start_time)}")

                tensor_logger = TensorBoardLogger(finetuner_model.experiment_result_path, name=finetuner_model.the_name, version=finetuner_model.start_datetime)
                csv_logger = CSVLogger(finetuner_model.experiment_result_path, name=finetuner_model.the_name, version=f"csv/{finetuner_model.start_datetime}", prefix="csv")

                if finetuner_model.model_type == "meta-llama":
                    finetuner = Llama2(finetuner_model)
                    finetuner.train([tensor_logger, csv_logger])
                elif finetuner_model.model_type == "google":
                    finetuner = Byt5(finetuner_model)
                    finetuner.train([tensor_logger, csv_logger])

                end_time = time.time()
                log.info(f"End time: {end_time} - {datetime.datetime.fromtimestamp(end_time)}")
                duration = end_time - finetuner_model.start_time
                log.info(f"Duration: {duration}")
                log.info(f"DurationTime: {datetime.timedelta(seconds=duration)}")
            except KeyboardInterrupt:
                print("User interrupted the process.")
                sys.exit(1)

def args_to_dict(pairs: str) -> Dict[int, int]:
    pairs_list = pairs.split(',')
    result = {}
    for pair in pairs_list:
        key, value = pair.split(':')
        key = int(key)
        result[key] = int(value)

    return result

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-p', type=str, default="200:1,400:1,800:1,1600:1,3200:1,6400", help='Input in the format key1:value1,key2:value2,...', required=False)
    parser.add_argument('-model', type=str, default="byt5-small", required=False)
    parser.add_argument('-cfg', type=str, default="mbtcp-protocol-emulation-lora.json", required=False)
    args = parser.parse_args()

    args.p = args_to_dict(args.p)

    main(args.model, args.cfg, args.p)
