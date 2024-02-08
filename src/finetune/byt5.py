from datasets import Dataset
from transformers import ByT5Tokenizer, T5ForConditionalGeneration, PreTrainedTokenizer, PreTrainedModel

import utilities.load_dataset
from finetune.custom_lightning.byt5_lightning_data_module import Byt5LightningDataModule
from finetune.custom_lightning.byt5_lightning_module import Byt5LightningModule
from finetune.model.finetuner_model import FinetunerModel
from finetune.finetuner import Finetuner


class Byt5(Finetuner):

    def __init__(self, finetuner_model: FinetunerModel, val_loss_const: str, train_loss_const: str, use_lora: bool = True, use_quantization: bool = True):
        super().__init__(finetuner_model, val_loss_const, train_loss_const, use_lora, use_quantization)
        dataset = self._load_dataset()
        self._data_module = Byt5LightningDataModule(dataset=dataset,
                                                    tokenizer=self._tokenizer,
                                                    batch_size=8,
                                                    source_max_token_len=512,
                                                    target_max_token_len=128,
                                                    num_workers=16)

        self._custom_module = Byt5LightningModule(tokenizer=self._tokenizer,
                                                  model=self._model,
                                                  dataset=dataset,
                                                  finetuner_model=finetuner_model,
                                                  val_loss_const=val_loss_const,
                                                  train_loss_const=train_loss_const)

    def _load_dataset(self) -> Dataset:
        return utilities.load_dataset.load_dataset_from_file(dataset_filename=self._finetuner_model.dataset_filename)

    def _init_tokenizer(self) -> PreTrainedTokenizer:
        return ByT5Tokenizer.from_pretrained(self._finetuner_model.base_model_id())

    def _init_model(self) -> PreTrainedModel:
        self._model = T5ForConditionalGeneration.from_pretrained(self._finetuner_model.base_model_id())
        return super()._init_model()
