from transformers import ByT5Tokenizer, T5ForConditionalGeneration

import utilities.load_dataset
from finetune.custom_lightning.byt5_lightning_data_module import Byt5LightningDataModule
from finetune.custom_lightning.byt5_lightning_module import Byt5LightningModule
from finetune.model.finetuner_model import FinetunerModel
from finetuner import Finetuner


class Byt5(Finetuner):

    def __init__(self, finetune_model: FinetunerModel, use_lora: bool = True, use_quantization: bool = True):
        super().__init__(finetune_model, use_lora, use_quantization)
        dataset = self._load_dataset()
        self._data_module = Byt5LightningDataModule(dataset=dataset,
                                                    tokenizer=self._tokenizer,
                                                    batch_size=2,
                                                    source_max_token_len=512,
                                                    target_max_token_len=128,
                                                    num_workers=16)

        self._custom_module = Byt5LightningModule(tokenizer=self._tokenizer, model=self._model, dataset=dataset,
                                                  output_dir=finetune_model.output_dir,
                                                  save_only_last_epoch=False,
                                                  finetuner_model=finetune_model)

    def _load_dataset(self):
        return utilities.load_dataset.load_dataset_from_file(dataset_filename=self._finetune_model.dataset_filename)

    def _init_tokenizer(self):
        self._tokenizer = ByT5Tokenizer.from_pretrained(self._finetune_model.base_model_id())

    def _init_model(self):
        self._model = T5ForConditionalGeneration.from_pretrained(self._finetune_model.base_model_id(),
                                                                 quantization_config=self._quantization_config,
                                                                 return_dict=True)
        super()._init_model()
