from abc import abstractmethod
import re
from typing import List

from datasets import Dataset
from lightning import LightningDataModule, LightningModule, Trainer
from lightning.pytorch.callbacks import EarlyStopping, ModelCheckpoint
from lightning.pytorch.loggers.logger import Logger
from peft.mapping import get_peft_model
from peft.peft_model import PeftModel
from peft.tuners.lora import LoraConfig
from transformers import (BitsAndBytesConfig, PreTrainedModel,
                          PreTrainedTokenizer)

from cfg import OUTPUTS_DIR
from finetune.callbacks.metrics_logger import MetricsLogger
from finetune.model.finetuner_model import FinetunerModel
from finetune.model.lora import Lora
from utilities.logger import TheLogger


class Finetuner:
    _tokenizer: PreTrainedTokenizer
    _model: PreTrainedModel|PeftModel

    _quantization_config: BitsAndBytesConfig
    _lora_config: LoraConfig

    _finetuner_model: FinetunerModel
    _start_time: float

    _custom_module: LightningModule
    _data_module: LightningDataModule

    _logger: TheLogger

    def __init__(self, finetuner_model: FinetunerModel):
        self._finetuner_model = finetuner_model
        self._logger = TheLogger(self._finetuner_model.__str__(), f"{OUTPUTS_DIR}/logs")

        self._lora_config = self._init_lora_config()

        self._tokenizer = self._init_tokenizer()
        self._model = self._init_model()

    @abstractmethod
    def _load_dataset(self) -> Dataset:
        pass

    @abstractmethod
    def _init_tokenizer(self) -> PreTrainedTokenizer:
        pass

    @abstractmethod
    def _init_model(self) -> PreTrainedModel|PeftModel:
        if hasattr(self._finetuner_model, "lora"):
            if isinstance(self._model, PreTrainedModel):
                self._model = get_peft_model(self._model, self._lora_config)

        return self._model

    def _init_lora_config(self) -> LoraConfig | None:
        if hasattr(self._finetuner_model, "lora"):
            return LoraConfig(
                r=self._finetuner_model.lora.r,
                lora_alpha=self._finetuner_model.lora.alpha,
                target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj", "lm_head"],
                bias="none",
                lora_dropout=self._finetuner_model.lora.dropout,
                task_type=self._finetuner_model.lora.task_type,
                inference_mode=False
            )
        return None

    def train(self, loggers: List[Logger]):
        with open(f"{self._finetuner_model.log_output_dir}/{str(self._finetuner_model)}", "a") as f:
            checkpoint_callback = ModelCheckpoint(
                monitor=self._finetuner_model.val_loss_const,
                filename='best-{epoch}',
                save_top_k=1,
                save_last=True,
                mode='min',
                auto_insert_metric_name=False
            )
            callbacks = [checkpoint_callback, MetricsLogger()]

            if self._finetuner_model.patience > 0:
                early_stop_callback = EarlyStopping(monitor=self._finetuner_model.val_loss_const, min_delta=0.00,
                                                    patience=self._finetuner_model.patience, verbose=True, mode="min",
                                                    log_rank_zero_only=True)

                callbacks.append(early_stop_callback)

            trainer = Trainer(logger=loggers,
                              callbacks=callbacks,
                              max_epochs=self._finetuner_model.max_epochs,
                              precision=self._finetuner_model.precision,
                              log_every_n_steps=1,
                              accumulate_grad_batches=8,
                              accelerator=self._finetuner_model.accelerator,
                              devices=self._finetuner_model.devices,
                              strategy=self._finetuner_model.strategy,
                              )
            # if os.path.exists(f"{CHECKPOINTS}/{self._finetuner_model.experiment}/{self._finetuner_model.current_dataset}"):
            #     trainer.fit(self._custom_module, self._data_module,
            #                 ckpt_path=f"{CHECKPOINTS}/{self._finetuner_model.experiment}/{self._finetuner_model.current_dataset}/{self._finetuner_model.start_datetime}/checkpoints/last.ckpt")
            # else:
            trainer.fit(self._custom_module, self._data_module)
