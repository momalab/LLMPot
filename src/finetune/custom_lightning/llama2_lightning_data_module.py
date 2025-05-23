import lightning as pl
from torch.utils.data import Dataset, DataLoader
from transformers import PreTrainedTokenizer

from finetune.custom_lightning.llama2_dataset import Llama2Dataset


class Llama2LightningDataModule(pl.LightningDataModule):

    def __init__(self, dataset: Dataset, tokenizer: PreTrainedTokenizer, batch_size: int = 4,
                 source_max_token_len: int = 512, target_max_token_len: int = 512, num_workers: int = 2):
        super().__init__()

        self._batch_size = batch_size
        self._tokenizer = tokenizer
        self._num_workers = num_workers
        self._dataset = dataset

        self._train_dataset = Llama2Dataset(
            dataset["train"],
            self._tokenizer,
            source_max_token_len,
            target_max_token_len,
        )
        self._val_dataset = Llama2Dataset(
            dataset["val"],
            self._tokenizer,
            source_max_token_len,
            target_max_token_len,
        )
        self._test_dataset = Llama2Dataset(
            dataset["test"],
            self._tokenizer,
            source_max_token_len,
            target_max_token_len,
        )

    def train_dataloader(self):
        return DataLoader(self._train_dataset, batch_size=self._batch_size, shuffle=False, num_workers=self._num_workers)

    def test_dataloader(self):
        return DataLoader(self._test_dataset, batch_size=self._batch_size, shuffle=False, num_workers=self._num_workers)

    def val_dataloader(self):
        return DataLoader(self._val_dataset, batch_size=self._batch_size, shuffle=False, num_workers=self._num_workers)
