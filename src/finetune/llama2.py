from datasets import Dataset, Features, Value, load_dataset
from finetuner import Finetuner
from transformers import PreTrainedModel, AutoTokenizer, AutoModelForCausalLM, PreTrainedTokenizer, PreTrainedTokenizerFast
from peft.peft_model import PeftModel

from cfg import DATASET_TEST, DATASET_TRAIN, DATASET_VAL
from finetune.custom_lightning.llama2_lightning_data_module import \
    Llama2LightningDataModule
from finetune.custom_lightning.llama2_lightning_module import \
    Llama2LightningModule
from finetune.model.finetuner_model import FinetunerModel


class Llama2(Finetuner):

    def __init__(self, finetuner_model: FinetunerModel):
        super().__init__(finetuner_model)
        self._features = Features({
            'source_text': Value('string'),
            'target_text': Value('string')
        })
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
        dataset = load_dataset('csv', data_files={
            'train': f"{DATASET_TRAIN}/{self._finetuner_model.experiment}/{self._finetuner_model.current_dataset}.csv",
            'val': f"{DATASET_VAL}/{self._finetuner_model.experiment}/{self._finetuner_model.current_dataset}.csv",
            'test': f"{DATASET_TEST}/{self._finetuner_model.experiment}/{self._finetuner_model.current_dataset}.csv"}, features=self._features)
        return dataset.rename_columns({'source_text': 'request', 'target_text': 'response'})

    def _init_tokenizer(self) -> PreTrainedTokenizer | PreTrainedTokenizerFast:
        tokenizer = AutoTokenizer.from_pretrained(
            self._finetuner_model.base_model_id(),
            device_map="sequential",
            padding_side="left",
            add_eos_token=False,
            add_bos_token=False,
            legacy=False,
            token="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"
        )
        tokenizer.pad_token = tokenizer.eos_token
        tokenizer.pad_token_id = 0

        return tokenizer

    def _init_model(self) -> PreTrainedModel | PeftModel:
        self._model = AutoModelForCausalLM.from_pretrained(self._finetuner_model.base_model_id(),
                                                           token="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"
                                                           )
        self._model.gradient_checkpointing_enable()
        self._model.config.use_cache = False
        self._tokenizer.pad_token_id = self._tokenizer.eos_token_id


        return super()._init_model()
