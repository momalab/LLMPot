import torch
import transformers
from accelerate import Accelerator
from datasets import Dataset, load_dataset
from peft import prepare_model_for_kbit_training, get_peft_model
from transformers import AutoTokenizer, LlamaTokenizerFast, AutoModelForCausalLM

from cfg import OUTPUTS_DIR
from finetune.custom_lightning.llama2_lightning_data_module import Llama2LightningDataModule
from finetune.custom_lightning.llama2_lightning_module import Llama2LightningModule
from finetune.model.finetuner_model import FinetunerModel
from finetuner import Finetuner


class Llama2(Finetuner):

    def __init__(self, finetune_model: FinetunerModel, use_lora: bool = True, use_quantization: bool = False):
        super().__init__(finetune_model, use_lora, use_quantization)
        self._data_module = Llama2LightningDataModule(self._load_dataset(), self._tokenizer,
                                                      batch_size=4,
                                                      source_max_token_len=256,
                                                      target_max_token_len=256,
                                                      num_workers=2)

        self._custom_module = Llama2LightningModule(tokenizer=self._tokenizer, model=self._model,
                                                    output_dir=finetune_model.output_dir,
                                                    save_only_last_epoch=False)

    def _load_dataset(self):
        dataset = load_dataset('csv', data_files={
            'train': f"{OUTPUTS_DIR}/datasets/train/{self._finetune_model.dataset_filename}.csv",
            'val': f"{OUTPUTS_DIR}/datasets/validation/{self._finetune_model.dataset_filename}.csv",
            'test': f"{OUTPUTS_DIR}/datasets/test/{self._finetune_model.dataset_filename}.csv"})
        return dataset.remove_columns("Unnamed: 0")

    def _init_tokenizer(self):
        tokenizer: LlamaTokenizerFast = LlamaTokenizerFast.from_pretrained(
            self._finetune_model.base_model_id(),
            padding_side="left",
            add_eos_token=False,
            add_bos_token=False,
        )
        tokenizer.pad_token = tokenizer.eos_token
        tokenizer.pad_token_id = 0

        return tokenizer

    def _init_model(self):
        model = AutoModelForCausalLM.from_pretrained(self._finetune_model.base_model_id(),
                                                     quantization_config=self._quantization_config,
                                                     return_dict=True)

        if self._use_quantization:
            model = prepare_model_for_kbit_training(model, use_gradient_checkpointing=True)
            model.config.use_cache = False

        if self._lora_config:
            model = get_peft_model(model, self._lora_config)

        if torch.cuda.device_count() > 1:
            accelerator = Accelerator(gradient_accumulation_steps=2)
            model = accelerator.prepare_model(model)

            model.is_parallelizable = True
            model.model_parallel = True

        return model
