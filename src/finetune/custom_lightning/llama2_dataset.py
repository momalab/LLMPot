import pandas as pd
from torch.utils.data import Dataset
from transformers import PreTrainedTokenizer


class Llama2Dataset(Dataset):

    def __init__(self, data: pd.DataFrame, tokenizer: PreTrainedTokenizer,
                 source_max_token_len: int = 512, target_max_token_len: int = 512):

        self._tokenizer = tokenizer
        self._data = data
        self._source_max_token_len = source_max_token_len
        self._target_max_token_len = target_max_token_len

    def __len__(self):
        return len(self._data)

    def __getitem__(self, index: int):
        data_row = self._data[index]

        source_text_encoding = self._tokenizer(
            data_row["source_text"],
            max_length=self._source_max_token_len,
            padding="max_length",
            truncation=True,
            return_attention_mask=True,
            add_special_tokens=True,
            return_tensors="pt",
        )

        target_text_encoding = self._tokenizer(
            data_row["target_text"],
            max_length=self._target_max_token_len,
            padding="max_length",
            truncation=True,
            return_attention_mask=True,
            add_special_tokens=True,
            return_tensors="pt",
        )

        labels = target_text_encoding["input_ids"]
        labels[labels == 0] = -100

        return dict(
            source_text_input_ids=source_text_encoding["input_ids"].flatten(),
            source_text_attention_mask=source_text_encoding["attention_mask"].flatten(),
            labels=labels.flatten(),
        )
