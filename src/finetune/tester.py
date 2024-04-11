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
        finetuner_test = FinetunerModel(**config)
        finetuner_test.experiment = experiment
        new_datetime = finetuner_test.start_datetime
        finetuner_test.start_datetime = os.listdir(f"{CHECKPOINTS}/{finetuner_test.experiment_filename}/{finetuner_test.test.__str__()}")[0]

    try:
        for test_dataset in finetuner_test.datasets:
            finetuner_test.current_dataset = test_dataset
            tensor_logger = TensorBoardLogger(f"{CHECKPOINTS}/{experiment}", name=test_dataset.__str__(), version=new_datetime)
            csv_logger = CSVLogger(f"{CHECKPOINTS}/{experiment}", name=test_dataset.__str__(), version=new_datetime)

            trainer = Trainer(logger=[tensor_logger, csv_logger],
                              log_every_n_steps=1,
                              accelerator=finetuner_test.accelerator,
                              devices=len(os.getenv('CUDA_VISIBLE_DEVICES').split(",")),
                              strategy="ddp",
                              )

            tokenizer = ByT5Tokenizer.from_pretrained(finetuner_test.base_model_id())
            model_orig = T5ForConditionalGeneration.from_pretrained(finetuner_test.base_model_id())

            with open(f"{EXPERIMENTS}/{finetuner_test.experiment_filename}", "r") as cfg:
                config_orig_experiment = cfg.read()
                config_orig_experiment = json.loads(config_orig_experiment)
                finetuner_orig_exp = FinetunerModel(**config_orig_experiment)
                finetuner_orig_exp.experiment = experiment
                new_datetime = finetuner_orig_exp.start_datetime
                finetuner_orig_exp.start_datetime = finetuner_test.start_datetime
            for _ in finetuner_orig_exp.datasets:
                model = Byt5LightningModule.load_from_checkpoint(
                    checkpoint_path=f"{CHECKPOINTS}/{finetuner_orig_exp.experiment}/{finetuner_orig_exp.start_datetime}/checkpoints/last.ckpt",
                    finetuner_model=finetuner_orig_exp,
                    tokenizer=tokenizer,
                    model=model_orig,
                    test_dataset=None,
                    map_location=torch.device("cuda")
                )
                model.eval()

                dataset = load_dataset('csv', data_files={'test': f"{DATASET_PARSED}/{test_dataset.__str__()}.csv"})
                dataset = dataset.rename_columns({'source_text': 'request', 'target_text': 'response'})

                dataloader = DataLoader(dataset["test"], batch_size=finetuner_test.batch_size, shuffle=False, num_workers=finetuner_test.workers)
                trainer.test(model=model, dataloaders=dataloader)

    except:
        print(traceback.format_exc())
        exit(1)


if __name__ == '__main__':
    main()
