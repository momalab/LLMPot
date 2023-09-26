#!/usr/bin/env python
# coding: utf-8

# In[ ]:


#load model
import transformers
from simplet5 import SimpleT5
model = SimpleT5()
model.from_pretrained("byt5","google/byt5-small")

#dataframe dataset
import pandas as pd
import numpy as np

df = pd.read_csv("/home/dam10098/ICSPot/parsed_datasets/tcpdump_300k_1.csv") 

full_dataset = df[['source_text', 'target_text']]
full_dataset = full_dataset[:300000]
print(len(full_dataset))

#Split train and test sets
from sklearn.model_selection import train_test_split
train_df, test_df = train_test_split(full_dataset, test_size=0.1)

#save train and test sets
test_df.to_csv('./train_test_sets/test_set_300k.csv', index=True)
train_df.to_csv('./train_test_sets/train_set_300k.csv', index=True)

#Train
model.train(train_df=train_df,
            eval_df=test_df,
            source_max_token_len=512,
            target_max_token_len=128,
            batch_size=8,
            use_gpu=True,
            outputdir="outputs/300k",
            early_stopping_patience_epochs=0,
            save_only_last_epoch=True)