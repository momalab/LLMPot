import pandas as pd
from simplet5 import SimpleT5
from sklearn.model_selection import train_test_split

model = SimpleT5()
model.from_pretrained("byt5", "google/byt5-small")

df = pd.read_csv("../parsed_datasets/wago_context_X.csv")

full_dataset = df[['source_text', 'target_text']]

train_df, test_df = train_test_split(full_dataset, test_size=0.1)

test_df.to_csv('./train_test_sets/test_set_context.csv', index=True)
train_df.to_csv('./train_test_sets/train_set_context.csv', index=True)

model.train(train_df=train_df,
            eval_df=test_df,
            source_max_token_len=512,
            target_max_token_len=128,
            batch_size=8,
            use_gpu=True,
            outputdir="outputs/WAGO_1",
            early_stopping_patience_epochs=0,
            save_only_last_epoch=True)
