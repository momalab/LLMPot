import json
from cfg import EXPERIMENTS
from finetune.model.finetuner_model import FinetunerModel


def load_cfg(model: str, experiment: str, timestamp: str = "") -> FinetunerModel:
    print(f"Experiment: {model}  / {experiment}")
    with open(f"{EXPERIMENTS}/{model}/{experiment}", "r") as cfg:
        config = cfg.read()
        config = json.loads(config)
        finetuner = FinetunerModel(experiment, **config)
        finetuner.start_datetime = timestamp

        return finetuner
