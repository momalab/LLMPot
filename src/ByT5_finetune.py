import traceback

import pandas as pd
from simplet5 import SimpleT5
from sklearn.model_selection import train_test_split
from utilities import logger


def main():
    model = SimpleT5()
    model.from_pretrained("byt5", "google/byt5-large")

    df = pd.read_csv("../parsed_datasets/random_data_byt5.csv")

    full_dataset = df[['source_text', 'target_text']]

    train_df, test_df = train_test_split(full_dataset, test_size=0.1)

    test_df.to_csv("../finetuned_models/train_test_sets/byt5-large/no_context_30k/test_set.csv", index=True)
    train_df.to_csv("../finetuned_models/train_test_sets/byt5-large/no_context_30k/train_set.csv", index=True)

    model.train(train_df=train_df,
                eval_df=test_df,
                source_max_token_len=512,
                target_max_token_len=128,
                batch_size=8,
                use_gpu=True,
                dataloader_num_workers=128,
                outputdir="../finetuned_models/outputs/byt5-large/no_context_30k",
                early_stopping_patience_epochs=0,
                save_only_last_epoch=True)


if __name__ == '__main__':
    try:
        main()
    except:
        logger.logging.error(traceback.format_exc())
