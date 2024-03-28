from datasets import Dataset
from transformers import ByT5Tokenizer, T5ForConditionalGeneration, PreTrainedTokenizer, PreTrainedModel

import utilities.load_dataset
from finetune.custom_lightning.byt5_lightning_data_module import Byt5LightningDataModule
from finetune.custom_lightning.byt5_lightning_module import Byt5LightningModule
from finetune.model.finetuner_model import FinetunerModel
from finetune.finetuner import Finetuner


class Byt5(Finetuner):

    def __init__(self, finetuner_model: FinetunerModel):
        super().__init__(finetuner_model)
        dataset = self._load_dataset()
        self._data_module = Byt5LightningDataModule(dataset=dataset,
                                                    tokenizer=self._tokenizer,
                                                    batch_size=finetuner_model.batch_size,
                                                    source_max_token_len=finetuner_model.source_max_token_len,
                                                    target_max_token_len=finetuner_model.target_max_token_len,
                                                    num_workers=finetuner_model.workers)

        self._custom_module = Byt5LightningModule(tokenizer=self._tokenizer,
                                                  model=self._model,
                                                  finetuner_model=finetuner_model)

    def _load_dataset(self) -> Dataset:
        return utilities.load_dataset.load_dataset_from_file(dataset_filename=self._finetuner_model.current_dataset)

    def _init_tokenizer(self) -> PreTrainedTokenizer:
        return ByT5Tokenizer.from_pretrained(self._finetuner_model.base_model_id())

    def _init_model(self) -> PreTrainedModel:
        self._model = T5ForConditionalGeneration.from_pretrained(self._finetuner_model.base_model_id())
        return super()._init_model()
