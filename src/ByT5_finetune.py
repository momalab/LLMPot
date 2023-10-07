import traceback
import sys
import pandas as pd
from simplet5 import SimpleT5
from utilities import logger

#1:  byt5, 2: byt5-small or byt5-large, 3: read csv file, 4:epochs, 5:precision

def main():
    model = SimpleT5()
    model.from_pretrained(f"{sys.argv[1]}", f"google/{sys.argv[2]}") 

    train_df = pd.read_csv(f"../datasets/train/{sys.argv[3]}.csv")
    train_df = train_df[['source_text', 'target_text']]

    val_df = pd.read_csv(f"../datasets/validation/{sys.argv[3]}.csv")
    val_df = val_df[['source_text', 'target_text']]

    model.train(train_df=train_df,
                eval_df=val_df,
                source_max_token_len=512,
                target_max_token_len=128,
                batch_size=8,
                max_epochs = int(sys.argv[4]),
                use_gpu=True,
                dataloader_num_workers=128,
                outputdir=f"../models/{sys.argv[2]}_{sys.argv[3]}_{sys.argv[4]}epochs_{sys.argv[5]}precision", #byt5-small_dataset_5epcohs_32precision.csv
                early_stopping_patience_epochs=0,
                precision = int(sys.argv[5]),
                save_only_last_epoch=True)

if __name__ == '__main__':
    try:
        main()
        logger.logging()
    except:
        logger.logging.error(traceback.format_exc())