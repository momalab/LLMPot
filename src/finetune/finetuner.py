from abc import abstractmethod
from typing import Any

import torch
import lightning as pl
from lightning.pytorch.callbacks import EarlyStopping, TQDMProgressBar

from peft import LoraConfig, TaskType
from transformers import BitsAndBytesConfig, PreTrainedTokenizer

from cfg import OUTPUTS_DIR
from finetune.model.finetuner_model import FinetunerModel
from utilities.logger import TheLogger

torch.set_float32_matmul_precision('medium')


class Finetuner:
    _tokenizer: PreTrainedTokenizer
    _model: Any

    _quantization_config: BitsAndBytesConfig
    _lora_config: LoraConfig

    _use_lora: bool
    _use_quantization: bool

    _finetune_model: FinetunerModel
    _start_time: float

    _custom_module: pl.LightningModule
    _data_module: pl.LightningDataModule

    _logger: TheLogger

    def __init__(self, finetune_model: FinetunerModel, use_lora: bool = False, use_quantization: bool = False, use_gpu: bool = True):
        self._finetune_model = finetune_model
        self._logger = TheLogger(self._finetune_model.__str__(), f"{OUTPUTS_DIR}/logs")

        self._use_quantization = use_quantization
        self._quantization_config = self._init_quantization()

        self._use_lora = use_lora
        self._lora_config = self._init_lora_config()

        self._tokenizer = self._init_tokenizer()
        self._model = self._init_model()

        self.print_trainable_parameters()

    @abstractmethod
    def _load_dataset(self):
        pass

    @abstractmethod
    def _init_tokenizer(self):
        pass

    @abstractmethod
    def _init_model(self):
        pass

    def _init_lora_config(self) -> LoraConfig:
        if self._use_lora:
            return LoraConfig(
                r=16,
                lora_alpha=32,
                target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj", "lm_head"],
                bias="none",
                lora_dropout=0.05,
                task_type=TaskType.CAUSAL_LM,
                inference_mode=False
            )

    def _init_quantization(self) -> BitsAndBytesConfig:
        if self._use_quantization:
            return BitsAndBytesConfig(
                load_in_4bit=True,
                bnb_4bit_use_double_quant=True,
                bnb_4bit_quant_type="nf4",
                bnb_4bit_compute_dtype=torch.bfloat16
            )

    def train(self, early_stopping_patience_epochs: int = 20, logger="default"):

        callbacks = [TQDMProgressBar(refresh_rate=5)]

        if early_stopping_patience_epochs > 0:
            early_stop_callback = EarlyStopping(monitor="val_loss", min_delta=0.00, patience=early_stopping_patience_epochs, verbose=True, mode="min")
            callbacks.append(early_stop_callback)

        loggers = True if logger == "default" else logger

        trainer = pl.Trainer(logger=loggers,
                             callbacks=callbacks,
                             max_epochs=self._finetune_model.epochs,
                             precision=self._finetune_model.precision,
                             log_every_n_steps=1,
                             accelerator="gpu",
                             )

        trainer.fit(self._custom_module, self._data_module)

    def print_trainable_parameters(self):
        trainable_params = 0
        all_param = 0
        for _, param in self._model.named_parameters():
            all_param += param.numel()
            if param.requires_grad:
                trainable_params += param.numel()
        self._logger.info(f"trainable params: {trainable_params} || all params: {all_param} || trainable%: {100 * trainable_params / all_param}")
