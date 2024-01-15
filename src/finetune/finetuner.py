import os
from abc import abstractmethod

import torch
from datasets import Dataset
from lightning import LightningModule, LightningDataModule
from lightning.pytorch import Trainer
from lightning.pytorch.callbacks import EarlyStopping, ModelCheckpoint
from lightning.pytorch.loggers import TensorBoardLogger
from peft import LoraConfig, TaskType, get_peft_model, prepare_model_for_kbit_training
from transformers import BitsAndBytesConfig, PreTrainedTokenizer, PreTrainedModel

from cfg import OUTPUTS_DIR
from finetune.callbacks.metrics_logger import MetricsLogger
from finetune.custom_lightning.byt5_lightning_module import Byt5LightningModule
from finetune.model.finetuner_model import FinetunerModel
from utilities.file_tqdm_progress_bar import FileTQDMProgressBar
from utilities.logger import TheLogger

torch.set_float32_matmul_precision('medium')


class Finetuner:
    _tokenizer: PreTrainedTokenizer
    _model: PreTrainedModel

    _quantization_config: BitsAndBytesConfig
    _lora_config: LoraConfig

    _use_lora: bool
    _use_quantization: bool

    _finetune_model: FinetunerModel
    _start_time: float

    _custom_module: LightningModule
    _data_module: LightningDataModule

    _logger: TheLogger

    def __init__(self, finetuner_model: FinetunerModel, use_lora: bool = False, use_quantization: bool = False):
        self._finetuner_model = finetuner_model
        self._logger = TheLogger(self._finetuner_model.__str__(), f"{OUTPUTS_DIR}/logs")

        self._use_quantization = use_quantization
        self._quantization_config = self._init_quantization()

        self._use_lora = use_lora
        self._lora_config = self._init_lora_config()

        self._tokenizer = self._init_tokenizer()
        self._model = self._init_model()

        self.print_trainable_parameters()

    @abstractmethod
    def _load_dataset(self) -> Dataset:
        pass

    @abstractmethod
    def _init_tokenizer(self) -> PreTrainedTokenizer:
        pass

    @abstractmethod
    def _init_model(self) -> PreTrainedModel:
        if self._use_quantization:
            self._model = prepare_model_for_kbit_training(self._model, use_gradient_checkpointing=True)
            self._model.config.use_cache = False

        if self._lora_config:
            self._model = get_peft_model(self._model, self._lora_config)

        # if torch.cuda.device_count() > 1:
        #     accelerator = Accelerator(gradient_accumulation_steps=2)
        #     self._model = accelerator.prepare_model(self._model)
        #
        #     self._model.is_parallelizable = True
        #     self._model.model_parallel = True

        return self._model

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

    def train(self, logger: TensorBoardLogger, finetuner_model: FinetunerModel, early_stopping_patience_epochs: int = 5):
        with open(f"{finetuner_model.log_output_dir}/{finetuner_model.__str__()}", "a") as f:

            checkpoint_callback = ModelCheckpoint(
                monitor='val_loss',
                filename=finetuner_model.dataset_filename,
                save_top_k=0,
                save_last=True,
                mode='min',
                auto_insert_metric_name=False
            )
            callbacks = [FileTQDMProgressBar(f, refresh_rate=3), checkpoint_callback, MetricsLogger()]

            if early_stopping_patience_epochs > 0:
                early_stop_callback = EarlyStopping(monitor="val_loss", min_delta=0.00,
                                                    patience=early_stopping_patience_epochs, verbose=True, mode="min")
                callbacks.append(early_stop_callback)

            trainer = Trainer(logger=logger,
                              callbacks=callbacks,
                              max_epochs=30,
                              precision=self._finetuner_model.precision,
                              log_every_n_steps=1,
                              accelerator="gpu",
                              devices=len(os.getenv('CUDA_VISIBLE_DEVICES').split(",")),
                              strategy="ddp",
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
