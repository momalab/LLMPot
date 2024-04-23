import argparse
import json
import os

from tqdm import tqdm

from cfg import EXPERIMENTS, CHECKPOINTS
from finetune import trainer
from finetune.model.finetuner_model import FinetunerModel
from utilities.logger import TheLogger


def main(experiment: str):

    try:
        with open(f"{EXPERIMENTS}/{experiment}", "r") as cfg:
            config = cfg.read()
            config = json.loads(config)
            finetuner_model = FinetunerModel(**config)
            finetuner_model.experiment = experiment

        for dataset in tqdm(finetuner_model.datasets):
            finetuner_model.current_dataset = dataset
            log = TheLogger(finetuner_model.__str__(), finetuner_model.log_output_dir)
            if os.path.exists(f"{CHECKPOINTS}/{experiment}/{dataset.__str__()}"):
                log.warning(f'Experiment {dataset} already exists.')
                continue
            log.info(f'Fine tuning {dataset} ...')
            trainer.main(finetuner_model)
    except KeyboardInterrupt:
        print("User interrupted the process.")
        os.remove(f"{CHECKPOINTS}/{experiment}/{dataset.__str__()}")
        exit(0)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-cfg', default="sigmoid.json", required=False)
    args = parser.parse_args()
    main(args.cfg)
