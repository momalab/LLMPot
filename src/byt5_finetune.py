import argparse
import datetime
import traceback

import pandas as pd
from simplet5 import SimpleT5

from cfg import OUTPUTS_DIR, PROJECT_ROOT_DIR
from utilities import logger


def finetune(model_type: str, model_name_path: str, model_name: str, csv_filename: str, epochs: int, precision: int, workers: int):
    model = SimpleT5()
    model.from_pretrained(model_type, f"{model_name_path}/{model_name}")

    train_df = pd.read_csv(f"{OUTPUTS_DIR}/datasets/train/{csv_filename}.csv")
    train_df = train_df[['source_text', 'target_text']]

    val_df = pd.read_csv(f"{OUTPUTS_DIR}/datasets/validation/{csv_filename}.csv")
    val_df = val_df[['source_text', 'target_text']]

    model.train(train_df=train_df,
                eval_df=val_df,
                source_max_token_len=512,
                target_max_token_len=128,
                batch_size=8,
                max_epochs=epochs,
                use_gpu=True,
                dataloader_num_workers=workers,
                outputdir=f"{PROJECT_ROOT_DIR}/models/{model_name}_{csv_filename}_epochs-{epochs}_precision-{precision}_{datetime.datetime.now().strftime('%Y%m%dT%H%M')}",
                early_stopping_patience_epochs=0,
                precision=precision,
                logger=False,
                save_only_last_epoch=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-mt', default="byt5", required=False)
    parser.add_argument('-mp', default="google", required=False)
    parser.add_argument('-mn', default="byt5-small", required=False)
    parser.add_argument('-csv', required=True)
    parser.add_argument('-e', default=10, required=False)
    parser.add_argument('-p', default=32, required=False)
    parser.add_argument('-w', default=2, required=False)
    args = parser.parse_args()

    model_type = args.mt
    model_name_path = args.mp
    model_name = args.mn
    csv_filename = args.csv
    epochs = int(args.e)
    precision = int(args.p)
    workers = int(args.w)

    print(model_type, model_name_path, model_name)

    log = logger.setup_custom_logger(f"{model_type}_{model_name}_epochs-{epochs}_precision-{precision}", f"{OUTPUTS_DIR}/logs")

    try:
        finetune(model_type, model_name_path, model_name, csv_filename, epochs, precision, workers)
    except:
        log.error(traceback.format_exc())
        exit(1)


if __name__ == '__main__':
    main()
