import datetime
import traceback
import sys

import pandas as pd
from simplet5 import SimpleT5
from utilities import logger
from init import OUTPUTS_DIR, PROJECT_ROOT_DIR

# 1:  byt5, 2: byt5-small or byt5-large, 3: read csv file, 4:epochs, 5:precision, 6: workers

log = logger.setup_custom_logger(f"{sys.argv[2]}_{sys.argv[3]}_{sys.argv[4]}epochs_{sys.argv[5]}precision",
                                 f"{OUTPUTS_DIR}/logs")


def main():
    model = SimpleT5()
    model.from_pretrained(f"{sys.argv[1]}", f"google/{sys.argv[2]}")

    train_df = pd.read_csv(f"{OUTPUTS_DIR}/datasets/train/{sys.argv[3]}.csv")
    train_df = train_df[['source_text', 'target_text']]

    val_df = pd.read_csv(f"{OUTPUTS_DIR}/datasets/validation/{sys.argv[3]}.csv")
    val_df = val_df[['source_text', 'target_text']]

    model.train(train_df=train_df,
                eval_df=val_df,
                source_max_token_len=512,
                target_max_token_len=128,
                batch_size=8,
                max_epochs=int(sys.argv[4]),
                use_gpu=True,
                dataloader_num_workers=int(sys.argv[6]),
                outputdir=f"{PROJECT_ROOT_DIR}/models/{sys.argv[2]}_{sys.argv[3]}_{sys.argv[4]}epochs_{sys.argv[5]}precision_{datetime.datetime.now().strftime('%Y%m%dT%H%M')}",
                early_stopping_patience_epochs=0,
                precision=int(sys.argv[5]),
                save_only_last_epoch=True)


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        log.error(traceback.format_exc())
        exit(1)
    except:
        log.error(traceback.format_exc())
