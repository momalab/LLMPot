import argparse
import json
import os

from tqdm import tqdm

from cfg import EXPERIMENTS, CHECKPOINTS
from finetune import trainer
from finetune.model.finetuner_model import FinetunerModel
from utilities.logger import TheLogger


def main(experiment: str):

    with open(f"{EXPERIMENTS}/{experiment}", "r") as cfg:
        config = cfg.read()
        config = json.loads(config)
        finetuner_model = FinetunerModel(**config)
        finetuner_model.experiment = experiment

        log = TheLogger(finetuner_model.__str__(), finetuner_model.log_output_dir)

        for dataset in tqdm(finetuner_model.datasets):
            finetuner_model.current_dataset = dataset
            if os.path.exists(f"{CHECKPOINTS}/{experiment}/{finetuner_model.model_type}_{finetuner_model.model_name}_{dataset}"):
                log.warning(f'Experiment {dataset} already exists. Skipping...')
                continue
            log.info(f'Fine tuning {dataset} ...')
            trainer.main(finetuner_model)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-cfg', default="mbtcp-protocol-emulation.json", required=False)
    args = parser.parse_args()
    main(args.cfg)
