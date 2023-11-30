from datasets import load_dataset
from transformers import LlamaTokenizerFast, AutoModelForCausalLM

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
        self._model = AutoModelForCausalLM.from_pretrained(self._finetune_model.base_model_id(),
                                                           quantization_config=self._quantization_config,
                                                           return_dict=True)
        super()._init_model()
