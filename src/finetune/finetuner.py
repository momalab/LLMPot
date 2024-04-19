import glob
import os
from abc import abstractmethod
from typing import Iterable, List

import torch
from accelerate import Accelerator
from datasets import Dataset, load_dataset, Features, Value
from lightning import LightningModule, LightningDataModule
from lightning import Trainer
from lightning.pytorch.callbacks import EarlyStopping, ModelCheckpoint
from peft.tuners.lora import LoraConfig
from peft.utils.peft_types import TaskType
from peft.mapping import get_peft_model
from peft.utils.other import prepare_model_for_kbit_training
from lightning.pytorch.loggers.logger import Logger
from torch.utils.data import DataLoader
from transformers import BitsAndBytesConfig, PreTrainedTokenizer, PreTrainedModel

from cfg import OUTPUTS_DIR, DATASET_PARSED, CHECKPOINTS
from finetune.callbacks.metrics_logger import MetricsLogger
from finetune.custom_lightning.byt5_lightning_module import Byt5LightningModule
from finetune.model.finetuner_model import FinetunerModel
from utilities.epsilon import calculate_error_margin
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

    _finetuner_model: FinetunerModel
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
            self._model.gradient_checkpointing_enable()
            self._model = prepare_model_for_kbit_training(self._model, use_gradient_checkpointing=True)
            self._model.config.use_cache = False

        if self._use_lora:
            self._model = get_peft_model(self._model, self._lora_config)

            # accelerator = Accelerator(gradient_accumulation_steps=2)
            # self._model = accelerator.prepare_model(self._model)
            #
            # self._model.is_parallelizable = True
            # self._model.model_parallel = True

        return self._model

    def _init_lora_config(self) -> LoraConfig:
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
        return BitsAndBytesConfig(
            load_in_4bit=True,
            bnb_4bit_use_double_quant=True,
            bnb_4bit_quant_type="nf4",
            bnb_4bit_compute_dtype=torch.bfloat16
        )

    def train(self, loggers: List[Logger]):
        with open(f"{self._finetuner_model.log_output_dir}/{self._finetuner_model.__str__()}", "a") as f:

            checkpoint_callback = ModelCheckpoint(
                monitor=self._finetuner_model.val_loss_const,
                filename='best-{epoch}',
                save_top_k=1,
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
                                devices=self._finetuner_model.devices,
                                strategy="ddp",
                                )
            if os.path.exists(f"{CHECKPOINTS}/{self._finetuner_model.experiment}/{self._finetuner_model.current_dataset}"):
                trainer.fit(self._custom_module, self._data_module,
                            ckpt_path=f"{CHECKPOINTS}/{self._finetuner_model.experiment}/{self._finetuner_model.current_dataset}/{self._finetuner_model.old_start_datetime}/checkpoints/last.ckpt")
            else:
                trainer.fit(self._custom_module, self._data_module)

            features = Features({
                'source_text': Value('string'),
                'target_text': Value('string')
            })

            if self._finetuner_model.test_datasets:
                for test_dataset in self._finetuner_model.test_datasets:
                    self._finetuner_model.on_test = True
                    self._finetuner_model.test_dataset = test_dataset
                    best_model_path = trainer.checkpoint_callback.best_model_path
                    epoch = best_model_path.split("best-")[1].split(".ckpt")[0]
                    best_model = Byt5LightningModule.load_from_checkpoint(best_model_path,
                                                                        finetuner_model=self._finetuner_model,
                                                                        tokenizer=self._tokenizer, model=self._model,
                                                                        test_dataset=None)
                    best_model.eval()
                    with torch.no_grad():
                        dataset = load_dataset('csv', data_files={'test': f"{DATASET_PARSED}/{test_dataset}.csv"}, features=features)
                        dataset = dataset.rename_columns({'source_text': 'request', 'target_text': 'response'})

                        dataloader = DataLoader(dataset["test"], batch_size=self._finetuner_model.batch_size, shuffle=False, num_workers=self._finetuner_model.workers)
                        
                        trainer.test(model=best_model, dataloaders=dataloader)

                        mae, std = calculate_error_margin(f"{CHECKPOINTS}/{self._finetuner_model.experiment}/{self._finetuner_model.current_dataset}/{self._finetuner_model.start_datetime}", file=test_dataset)

                        loggers[0].log_metrics({"mae": mae, "std": std}, step=int(epoch))

    def print_trainable_parameters(self):

        trainable_params = 0
        all_param = 0
        if hasattr(self._model, "named_parameters"):

            for _, param in self._model.named_parameters():
                all_param += param.numel()
                if param.requires_grad:
                    trainable_params += param.numel()
            self._logger.info(f"trainable params: {trainable_params} || all params: {all_param} || trainable%: {100 * trainable_params / all_param}")