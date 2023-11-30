from datasets import load_dataset
from transformers import ByT5Tokenizer, T5ForConditionalGeneration, PreTrainedModel

from cfg import OUTPUTS_DIR
from finetune.custom_lightning.byt5_lightning_data_module import Byt5LightningDataModule
from finetune.custom_lightning.byt5_lightning_module import Byt5LightningModule
from finetune.model.finetuner_model import FinetunerModel
from finetuner import Finetuner


class Byt5(Finetuner):

    def __init__(self, finetune_model: FinetunerModel, use_lora: bool = True, use_quantization: bool = True):
        super().__init__(finetune_model, use_lora, use_quantization)
        dataset = self._load_dataset()
        self._data_module = Byt5LightningDataModule(dataset, self._tokenizer,
                                                    batch_size=1,
                                                    source_max_token_len=512,
                                                    target_max_token_len=128,
                                                    num_workers=16)

        self._custom_module = Byt5LightningModule(tokenizer=self._tokenizer, model=self._model, dataset=dataset,
                                                  output_dir=finetune_model.output_dir,
                                                  save_only_last_epoch=False)

    def _load_dataset(self):
        dataset = load_dataset('csv', data_files={
            'train': f"{OUTPUTS_DIR}/datasets/train/{self._finetune_model.dataset_filename}.csv",
            'val': f"{OUTPUTS_DIR}/datasets/validation/{self._finetune_model.dataset_filename}.csv",
            'test': f"{OUTPUTS_DIR}/datasets/test/{self._finetune_model.dataset_filename}.csv"})
        return dataset.remove_columns("Unnamed: 0")

    def _init_tokenizer(self):
        self._tokenizer = ByT5Tokenizer.from_pretrained(self._finetune_model.base_model_id())

    def _init_model(self):
        self._model = T5ForConditionalGeneration.from_pretrained(self._finetune_model.base_model_id(),
                                                                 quantization_config=self._quantization_config,
                                                                 return_dict=True)
        super()._init_model()
