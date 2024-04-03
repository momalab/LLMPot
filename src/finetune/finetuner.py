import os
from abc import abstractmethod

import torch
from datasets import Dataset
from lightning import LightningModule, LightningDataModule
from lightning.pytorch import Trainer
from lightning.pytorch.callbacks import EarlyStopping, ModelCheckpoint
from peft import LoraConfig, TaskType, get_peft_model, prepare_model_for_kbit_training
from pytorch_lightning.loggers import Logger
from transformers import BitsAndBytesConfig, PreTrainedTokenizer, PreTrainedModel

from cfg import OUTPUTS_DIR
from finetune.callbacks.metrics_logger import MetricsLogger
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

    def __init__(self, finetuner_model: FinetunerModel):
        self._finetuner_model = finetuner_model
        self._logger = TheLogger(self._finetuner_model.__str__(), f"{OUTPUTS_DIR}/logs")

        self._use_quantization = finetuner_model.quantization
        self._quantization_config = self._init_quantization()

        self._use_lora = finetuner_model.lora
        self._lora_config = self._init_lora_config()

        self._tokenizer = self._init_tokenizer()
        self._model = self._init_model()
        print(type(self._model))

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
            print(type(self._model))
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

    def train(self, loggers: [Logger]):
        with open(f"{self._finetuner_model.log_output_dir}/{self._finetuner_model.__str__()}", "a") as f:

            checkpoint_callback = ModelCheckpoint(
                monitor=self._finetuner_model.val_loss_const,
                filename=self._finetuner_model.current_dataset.__str__() + '-{epoch}',
                save_top_k=2,
                save_last=True,
                mode='min',
                auto_insert_metric_name=False
            )
            callbacks = [FileTQDMProgressBar(f, refresh_rate=3), checkpoint_callback, MetricsLogger()]

            if self._finetuner_model.patience > 0:
                early_stop_callback = EarlyStopping(monitor=self._finetuner_model.val_loss_const, min_delta=0.00,
                                                    patience=self._finetuner_model.patience, verbose=True, mode="min")
                callbacks.append(early_stop_callback)

            trainer = Trainer(logger=loggers,
                              callbacks=callbacks,
                              max_epochs=self._finetuner_model.max_epochs,
                              precision=self._finetuner_model.precision,
                              log_every_n_steps=1,
                              accelerator=self._finetuner_model.accelerator,
                              devices=len(os.getenv('CUDA_VISIBLE_DEVICES').split(",")),
                              strategy="ddp",
                              
                              )

            trainer.fit(self._custom_module, self._data_module)

    def print_trainable_parameters(self):
        
        trainable_params = 0
        all_param = 0
        if hasattr(self._model, "named_parameters"):
            
            for _, param in self._model.named_parameters():
                all_param += param.numel()
                if param.requires_grad:
                    trainable_params += param.numel()
            self._logger.info(f"trainable params: {trainable_params} || all params: {all_param} || trainable%: {100 * trainable_params / all_param}")
