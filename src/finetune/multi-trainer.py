import argparse

from tqdm import tqdm

from cfg import EXPERIMENTS
from finetune import trainer


def main(model_type, model_name, experiment):
    with open(f"{EXPERIMENTS}/{experiment}", "r") as cfg:
        config = cfg.read().splitlines()
        for dataset in tqdm(config):
            trainer.main(model_type, model_name, dataset, experiment)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-mt', default="google", required=False)
    parser.add_argument('-mn', default="byt5-small", required=False)
    parser.add_argument('-cfg', default="p3-dataset_size-context_length", required=False)
    args = parser.parse_args()
    main(args.mt, args.mn, args.cfg)
