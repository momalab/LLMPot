import argparse
import json
import os
import sys

from tqdm import tqdm

from cfg import EXPERIMENTS, CHECKPOINTS
from finetune import trainer
from finetune.model.finetuner_model import FinetunerModel
from utilities.logger import TheLogger


def main(experiment: str, resume: bool):

    try:
        with open(f"{EXPERIMENTS}/{experiment}", "r") as cfg:
            config = cfg.read()
            config = json.loads(config)
            finetuner_model = FinetunerModel(**config)
            finetuner_model.experiment = experiment

        for dataset in tqdm(finetuner_model.datasets):
            finetuner_model.current_dataset = dataset
            log = TheLogger(str(finetuner_model), finetuner_model.log_output_dir)
            if os.path.exists(f"{CHECKPOINTS}/{experiment}/{dataset}"):
                log.warning(f'Experiment {dataset} already exists.')
                if resume:
                    log.info(f'Resuming {dataset} ...')
                    finetuner_model.start_datetime = os.listdir(f"{CHECKPOINTS}/{experiment}/{dataset}")[0]
                else:
                    continue
            log.info(f'Fine tuning {dataset} ...')
            trainer.main(finetuner_model)
    except KeyboardInterrupt:
        print("User interrupted the process.")
        os.remove(f"{CHECKPOINTS}/{experiment}/{dataset}")
        sys.exit(0)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-cfg', default="mbtcp-diff-functions.json", required=False)
    parser.add_argument('-r', default=False, type=bool, required=False)
    args = parser.parse_args()
    main(args.cfg, args.r)
