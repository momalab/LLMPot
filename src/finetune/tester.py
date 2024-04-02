import argparse
import json
import os
import traceback

import torch
from datasets import load_dataset
from lightning import Trainer
from lightning.pytorch.loggers import TensorBoardLogger
from lightning_fabric.loggers import CSVLogger
from torch.utils.data import DataLoader
from transformers import ByT5Tokenizer, T5ForConditionalGeneration

from cfg import EXPERIMENTS, CHECKPOINTS, DATASET_PARSED
from finetune.custom_lightning.byt5_lightning_module import Byt5LightningModule
from finetune.model.finetuner_model import FinetunerModel


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-t', default="mbtcp-protocol-test.json", required=False)
    args = parser.parse_args()

    experiment = args.t

    with open(f"{EXPERIMENTS}/{experiment}", "r") as cfg:
        config = cfg.read()
        config = json.loads(config)
        finetuner_model = FinetunerModel(**config)
        finetuner_model.experiment = experiment
        finetuner_model.current_dataset = finetuner_model.test
        new_datetime = finetuner_model.start_datetime
        finetuner_model.start_datetime = os.listdir(f"{CHECKPOINTS}/{finetuner_model.experiment_filename}/{finetuner_model.the_name}")[0]

    try:
        for test_dataset in finetuner_model.datasets:
            finetuner_model.current_dataset = test_dataset
            tensor_logger = TensorBoardLogger(f"{CHECKPOINTS}/{experiment}", name=test_dataset.__str__(), version=new_datetime)
            csv_logger = CSVLogger(f"{CHECKPOINTS}/{experiment}", name=test_dataset.__str__(), version=new_datetime, prefix="test.csv")

            trainer = Trainer(logger=[tensor_logger, csv_logger],
                              log_every_n_steps=1,
                              accelerator="gpu",
                              devices=len(os.getenv('CUDA_VISIBLE_DEVICES').split(",")),
                              strategy="ddp",
                              )

            tokenizer = ByT5Tokenizer.from_pretrained(finetuner_model.base_model_id())
            model_orig = T5ForConditionalGeneration.from_pretrained(finetuner_model.base_model_id())
            model = Byt5LightningModule.load_from_checkpoint(
                checkpoint_path=f"{CHECKPOINTS}/{finetuner_model.experiment_filename}/{finetuner_model.current_dataset.__str__()}/{finetuner_model.start_datetime}/checkpoints/last.ckpt",
                finetuner_model=finetuner_model,
                tokenizer=tokenizer,
                model=model_orig,
                test_dataset=None,
                map_location=torch.device("cuda")
            )
            model.eval()

            dataset = load_dataset('csv', data_files={'test': f"{DATASET_PARSED}/{test_dataset.__str__()}.csv"})
            dataset = dataset.rename_columns({'source_text': 'request', 'target_text': 'response'})

            dataloader = DataLoader(dataset["test"], batch_size=finetuner_model.batch_size, shuffle=False, num_workers=finetuner_model.workers)
            trainer.test(model=model, dataloaders=dataloader)

    except:
        print(traceback.format_exc())
        exit(1)


if __name__ == '__main__':
    main()
