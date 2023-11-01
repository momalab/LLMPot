import lightning as pl
from torch.utils.data import Dataset, DataLoader
from transformers import PreTrainedTokenizer

from finetune.custom_lightning.byt5_dataset import Byt5Dataset


class Byt5LightningDataModule(pl.LightningDataModule):

    def __init__(self, dataset: Dataset, tokenizer: PreTrainedTokenizer, batch_size: int = 4,
                 source_max_token_len: int = 512, target_max_token_len: int = 512, num_workers: int = 2):
        super().__init__()

        self._batch_size = batch_size
        self._tokenizer = tokenizer
        self._num_workers = num_workers
        self._train_dataset = Byt5Dataset(
            dataset["train"],
            self._tokenizer,
            source_max_token_len,
            target_max_token_len,
        )
        self._test_dataset = Byt5Dataset(
            dataset["test"],
            self._tokenizer,
            source_max_token_len,
            target_max_token_len,
        )

    def train_dataloader(self):
        return DataLoader(self._train_dataset, batch_size=self._batch_size, shuffle=True, num_workers=self._num_workers)

    def test_dataloader(self):
        return DataLoader(self._test_dataset, batch_size=self._batch_size, shuffle=False, num_workers=self._num_workers)

    def val_dataloader(self):
        return DataLoader(self._test_dataset, batch_size=self._batch_size, shuffle=False, num_workers=self._num_workers)
