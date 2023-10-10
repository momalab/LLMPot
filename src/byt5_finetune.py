import datetime
import traceback
import sys

import pandas as pd
from simplet5 import SimpleT5
from utilities import logger
from init import OUTPUTS_DIR, PROJECT_ROOT_DIR

# 1:  byt5, 2: google/byt5-small or google/byt5-large, 3: read csv file, 4:epochs, 5:precision, 6: workers

log = logger.setup_custom_logger(f"{sys.argv[2]}_{sys.argv[3]}_epochs-{sys.argv[4]}_precision-{sys.argv[5]}",
                                 f"{OUTPUTS_DIR}/logs")


def finetune(model_type: str, model_name_path: str, model_name: str, csv_filename: str, epochs: int, precision: int):
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
                max_epochs=int(sys.argv[4]),
                use_gpu=True,
                dataloader_num_workers=int(sys.argv[6]),
                outputdir=f"{PROJECT_ROOT_DIR}/models/{model_name}_{csv_filename}_epochs-{epochs}_precision-{precision}_{datetime.datetime.now().strftime('%Y%m%dT%H%M')}",
                early_stopping_patience_epochs=0,
                precision=int(sys.argv[5]),
                save_only_last_epoch=True)


def main():
    try:
        model_type = sys.argv[1]
        model_name_path = sys.argv[2]
        model_name = sys.argv[3]
        csv_filename = sys.argv[3]
        epochs = int(sys.argv[4])
        precision = int(sys.argv[5])

        finetune(model_type, model_name_path, model_name, csv_filename, epochs, precision)
    except KeyboardInterrupt:
        log.error(traceback.format_exc())
        exit(1)
    except:
        log.error(traceback.format_exc())


if __name__ == '__main__':
    main()
