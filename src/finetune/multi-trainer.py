import argparse
import os

from tqdm import tqdm

from cfg import EXPERIMENTS, CHECKPOINTS
from finetune import trainer


def main(model_type, model_name, experiment):
    with open(f"{EXPERIMENTS}/{experiment}", "r") as cfg:
        config = cfg.read().splitlines()

        for dataset in tqdm(config):
            if os.path.exists(f"{CHECKPOINTS}/{experiment}/{model_type}_{model_name}_{dataset}"):
                print(f'Experiment {dataset} already exists. Skipping...')
                continue
            print(f'Fine tuning {dataset} ...')
            trainer.main(model_type, model_name, dataset, experiment)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-mt', default="google", required=False)
    parser.add_argument('-mn', default="byt5-small", required=False)
    parser.add_argument('-cfg', default="mbtcp-p3-dataset_size-context_length", required=False)
    args = parser.parse_args()
    main(args.mt, args.mn, args.cfg)
