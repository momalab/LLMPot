from transformers import LlamaTokenizerFast, AutoModelForCausalLM, PreTrainedTokenizer, PreTrainedModel, LlamaTokenizer
from datasets import Dataset
import utilities.load_dataset

from cfg import OUTPUTS_DIR
from finetune.custom_lightning.llama2_lightning_data_module import Llama2LightningDataModule
from finetune.custom_lightning.llama2_lightning_module import Llama2LightningModule
from finetune.model.finetuner_model import FinetunerModel
from finetuner import Finetuner


class Llama2(Finetuner):

    def __init__(self, finetuner_model: FinetunerModel):
        super().__init__(finetuner_model)
        dataset = self._load_dataset()
        self._data_module = Llama2LightningDataModule(dataset=dataset,
                                                      tokenizer=self._tokenizer,
                                                      batch_size=finetuner_model.batch_size,
                                                      source_max_token_len=finetuner_model.source_max_token_len,
                                                      target_max_token_len=finetuner_model.target_max_token_len,
                                                      num_workers=finetuner_model.workers)

        self._custom_module = Llama2LightningModule(tokenizer=self._tokenizer,
                                                    model=self._model,
                                                    finetuner_model=finetuner_model,
                                                    test_dataset=dataset["test"])

    def _load_dataset(self) -> Dataset:
        return utilities.load_dataset.load_dataset_from_file(dataset_filename=self._finetuner_model.current_dataset)

    def _init_tokenizer(self) -> PreTrainedTokenizer:
        tokenizer: LlamaTokenizer = LlamaTokenizer.from_pretrained(
            self._finetuner_model.base_model_id(),
            padding_side="left",
            add_eos_token=False,
            add_bos_token=False,
            token="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"
        )
        tokenizer.pad_token = tokenizer.eos_token
        tokenizer.pad_token_id = 0

        return tokenizer

    def _init_model(self) -> PreTrainedModel:
        self._model = AutoModelForCausalLM.from_pretrained(self._finetuner_model.base_model_id(),
                                                           quantization_config=self._quantization_config,
                                                           device_map="auto",
                                                           token="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")
        
        return super()._init_model()
