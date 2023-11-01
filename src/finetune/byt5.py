import torch
from accelerate import Accelerator
from datasets import load_dataset
from peft import prepare_model_for_kbit_training, get_peft_model
from transformers import ByT5Tokenizer, T5ForConditionalGeneration

from cfg import OUTPUTS_DIR
from finetune.custom_lightning.byt5_lightning_data_module import Byt5LightningDataModule
from finetune.custom_lightning.byt5_lightning_module import Byt5LightningModule
from finetune.model.finetuner_model import FinetunerModel
from finetuner import Finetuner


class Byt5(Finetuner):

    def __init__(self, finetune_model: FinetunerModel, use_lora: bool = True, use_quantization: bool = True):
        super().__init__(finetune_model, use_lora, use_quantization)
        self._data_module = Byt5LightningDataModule(self._load_dataset(), self._tokenizer,
                                                    batch_size=8,
                                                    source_max_token_len=512,
                                                    target_max_token_len=128,
                                                    num_workers=16)

        self._custom_module = Byt5LightningModule(tokenizer=self._tokenizer, model=self._model,
                                                  output_dir=finetune_model.output_dir,
                                                  save_only_last_epoch=False)

    def _load_dataset(self):
        dataset = load_dataset('csv', data_files={
            'train': f"{OUTPUTS_DIR}/datasets/train/{self._finetune_model.dataset_filename}.csv",
            'val': f"{OUTPUTS_DIR}/datasets/validation/{self._finetune_model.dataset_filename}.csv",
            'test': f"{OUTPUTS_DIR}/datasets/test/{self._finetune_model.dataset_filename}.csv"})
        return dataset.remove_columns("Unnamed: 0")

    def _formatting_func(self, sample):
        pass

    def _init_tokenizer(self):
        return ByT5Tokenizer.from_pretrained(self._finetune_model.base_model_id())

    def _init_model(self):
        model = T5ForConditionalGeneration.from_pretrained(self._finetune_model.base_model_id(),
                                                           quantization_config=self._quantization_config,
                                                           return_dict=True)
        model.config.use_cache = False
        if self._lora_config:
            model = get_peft_model(model, self._lora_config)

        if torch.cuda.device_count() > 1:
            accelerator = Accelerator(gradient_accumulation_steps=2)
            model = accelerator.prepare_model(model)

            model.is_parallelizable = True
            model.model_parallel = True

        return model
