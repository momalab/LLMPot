import datetime
import traceback
import sys

import pandas as pd
from simplet5 import SimpleT5
from utilities import logger
from init import OUTPUTS_DIR, PROJECT_ROOT_DIR

# 1: byt5, 2: google 3: byt5-small or byt5-large, 4: read csv file, 5:epochs, 6:precision, 7: workers

def finetune(model_type: str, model_name_path: str, model_name: str, csv_filename: str, epochs: int, precision: int, workers: int, log: Logger):
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
                logger=log,
                precision=precision,
                save_only_last_epoch=True)


def main():
    model_type = sys.argv[1]
    model_name_path = sys.argv[2]
    model_name = sys.argv[3]
    csv_filename = sys.argv[4]
    epochs = int(sys.argv[5])
    precision = int(sys.argv[6])
    workers = int(sys.argv[7])

    log = logger.setup_custom_logger(f"{model_type}_{model_name}_epochs-{epochs}_precision-{precision}", f"{OUTPUTS_DIR}/logs")

    try:
        finetune(model_type, model_name_path, model_name, csv_filename, epochs, precision, workers, log)
    except:
        log.error(traceback.format_exc())
        exit(1)


if __name__ == '__main__':
    main()
