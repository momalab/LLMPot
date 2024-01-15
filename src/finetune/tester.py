import argparse
import os
import traceback

import torch
from datasets import load_dataset
from lightning import Trainer
from lightning.pytorch.loggers import TensorBoardLogger
from torch.utils.data import DataLoader
from transformers import ByT5Tokenizer, T5ForConditionalGeneration

from cfg import OUTPUTS_DIR
from finetune.custom_lightning.byt5_dataset import Byt5Dataset
from finetune.custom_lightning.byt5_lightning_module import Byt5LightningModule
from finetune.model.finetuner_model import FinetunerModel

torch.set_float32_matmul_precision('medium')

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-mt', default="google", required=False)
    parser.add_argument('-mn', default="byt5-small", required=False)
    parser.add_argument('-base', default="mbtcp-deterministic-2k_fc-3-6", required=False)
    parser.add_argument('-csv', default="mbtcp-deterministic-2k_fc-3-6", required=False)
    parser.add_argument('-e', default=100, required=False)
    parser.add_argument('-p', default=32, required=False)
    parser.add_argument('-dt', default="20231213T1449", required=False)
    parser.add_argument('-ds', default="mbtcp-deterministic-2k_fc-3-6", required=False)
    args = parser.parse_args()

    finetuner_model = FinetunerModel(model_type=args.mt, model_name=args.mn, dataset_filename=args.base,
                                     precision=args.p, start_datetime=args.dt)

    try:
        logger = TensorBoardLogger(f"{OUTPUTS_DIR}/checkpoints/", name=finetuner_model.the_name, version=finetuner_model.start_datetime)

        trainer = Trainer(logger=logger,
                          log_every_n_steps=1,
                          accelerator="gpu",
                          devices=len(os.getenv('CUDA_VISIBLE_DEVICES').split(",")),
                          strategy="ddp",
                          )

        tokenizer = ByT5Tokenizer.from_pretrained(finetuner_model.base_model_id())
        model_orig = T5ForConditionalGeneration.from_pretrained(finetuner_model.base_model_id())
        model = Byt5LightningModule.load_from_checkpoint(
            checkpoint_path=f"{OUTPUTS_DIR}/checkpoints/{finetuner_model.the_name}/{finetuner_model.start_datetime}/checkpoints/{args.csv}.ckpt",
            finetuner_model=finetuner_model,
            tokenizer=tokenizer,
            model=model_orig)
        model.eval()

        dataset = load_dataset('csv', data_files={'test': f"{OUTPUTS_DIR}/datasets/test/{args.ds}.csv"})
        dataset = dataset.rename_columns({'source_text': 'request', 'target_text': 'response'})
        if dataset.column_names.keys().__contains__("Unnamed: 0"):
            dataset = dataset.remove_columns("Unnamed: 0")

        dataloader = DataLoader(dataset["test"], batch_size=10, shuffle=True, num_workers=1)
        trainer.test(model=model, dataloaders=dataloader)

    except:
        print(traceback.format_exc())
        exit(1)


if __name__ == '__main__':
    main()
