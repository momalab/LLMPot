from datasets import Dataset, load_dataset, Features, Value
from transformers import ByT5Tokenizer, T5ForConditionalGeneration, PreTrainedTokenizer, PreTrainedModel

from cfg import DATASET_TEST, DATASET_TRAIN, DATASET_VAL, OUTPUTS_DIR
import utilities.load_dataset
from finetune.custom_lightning.byt5_lightning_data_module import Byt5LightningDataModule
from finetune.custom_lightning.byt5_lightning_module import Byt5LightningModule
from finetune.model.finetuner_model import FinetunerModel
from finetune.finetuner import Finetuner


class Byt5(Finetuner):

    def __init__(self, finetuner_model: FinetunerModel):
        super().__init__(finetuner_model)
        self._features = Features({
            'source_text': Value('string'),
            'target_text': Value('string')
        })

        dataset = self._load_dataset()
        self._data_module = Byt5LightningDataModule(dataset=dataset,
                                                    tokenizer=self._tokenizer,
                                                    batch_size=finetuner_model.batch_size,
                                                    source_max_token_len=finetuner_model.source_max_token_len,
                                                    target_max_token_len=finetuner_model.target_max_token_len,
                                                    num_workers=finetuner_model.workers)

        self._custom_module = Byt5LightningModule(tokenizer=self._tokenizer,
                                                  model=self._model,
                                                  finetuner_model=finetuner_model,
                                                  test_dataset=dataset["test"])

    def _load_dataset(self) -> Dataset:
        dataset = load_dataset('csv', data_files={
            'train': f"{DATASET_TRAIN}/{self._finetuner_model.current_dataset}.csv",
            'val': f"{DATASET_VAL}/{self._finetuner_model.current_dataset}.csv",
            'test': f"{DATASET_TEST}/{self._finetuner_model.current_dataset}.csv"}, features=self._features)
        return dataset.rename_columns({'source_text': 'request', 'target_text': 'response'})

    def _init_tokenizer(self) -> PreTrainedTokenizer:
        return ByT5Tokenizer.from_pretrained(self._finetuner_model.base_model_id())

    def _init_model(self) -> PreTrainedModel:
        self._model = T5ForConditionalGeneration.from_pretrained(self._finetuner_model.base_model_id())
        return super()._init_model()
