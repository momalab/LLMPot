import argparse
import os
import traceback

from datasets import load_dataset
from lightning import Trainer
from lightning.pytorch.callbacks import EarlyStopping, ModelCheckpoint
from lightning.pytorch.loggers import TensorBoardLogger
from transformers import ByT5Tokenizer, T5ForConditionalGeneration

from cfg import OUTPUTS_DIR
from finetune.callbacks.metrics_logger import MetricsLogger
from finetune.custom_lightning.byt5_lightning_data_module import Byt5LightningDataModule
from finetune.custom_lightning.byt5_lightning_module import Byt5LightningModule
from finetune.model.finetuner_model import FinetunerModel
from utilities import load_dataset
from utilities.file_tqdm_progress_bar import FileTQDMProgressBar


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-mt', default="google", required=False)
    parser.add_argument('-mn', default="byt5-small", required=False)
    parser.add_argument('-csv', default="mbtcp-deterministicContext-2k_fc-3-6", required=False)
    parser.add_argument('-p', default=32, required=False)
    parser.add_argument('-dt', default="20231221T1803", required=False)
    args = parser.parse_args()

    finetuner_model = FinetunerModel(model_type=args.mt, model_name=args.mn, dataset_filename=args.csv, precision=args.p, start_datetime=args.dt)

    try:
        with open(f"{finetuner_model.log_output_dir}/{finetuner_model.__str__()}", "a") as f:
            logger = TensorBoardLogger(f"{OUTPUTS_DIR}/checkpoints/", name=finetuner_model.the_name, version=finetuner_model.start_datetime)

            checkpoint_callback = ModelCheckpoint(
                monitor='val_loss',
                filename='best',
                save_top_k=1,
                mode='min',
                auto_insert_metric_name=False
            )
            callbacks = [FileTQDMProgressBar(f, refresh_rate=3), checkpoint_callback, MetricsLogger()]

            early_stop_callback = EarlyStopping(monitor="val_loss", min_delta=0.00,
                                                patience=10, verbose=True, mode="min")
            callbacks.append(early_stop_callback)

            trainer = Trainer(logger=logger,
                              callbacks=callbacks,
                              max_epochs=10,
                              precision=finetuner_model.precision,
                              log_every_n_steps=1,
                              accelerator="gpu",
                              devices=len(os.getenv('CUDA_VISIBLE_DEVICES').split(",")),
                              strategy="ddp",
                              )

            tokenizer = ByT5Tokenizer.from_pretrained("google/byt5-small")
            dataset = load_dataset.load_dataset_from_file(dataset_filename=finetuner_model.dataset_filename)
            model_orig = T5ForConditionalGeneration.from_pretrained("google/byt5-small")
            model = Byt5LightningModule.load_from_checkpoint(
                checkpoint_path=f"{OUTPUTS_DIR}/checkpoints/{finetuner_model.the_name}/{finetuner_model.start_datetime}/checkpoints/best.ckpt",
                finetuner_model=finetuner_model,
                tokenizer=tokenizer,
                dataset=dataset,
                model=model_orig)

            data_module = Byt5LightningDataModule(dataset=dataset,
                                                  tokenizer=tokenizer,
                                                  batch_size=8,
                                                  source_max_token_len=256,
                                                  target_max_token_len=256,
                                                  num_workers=2)

            trainer.fit(model=model, datamodule=data_module,
                        ckpt_path=f"{OUTPUTS_DIR}/checkpoints/{finetuner_model.the_name}/{finetuner_model.start_datetime}/checkpoints/best.ckpt")
    except:
        print(traceback.format_exc())
        exit(1)


if __name__ == '__main__':
    main()
