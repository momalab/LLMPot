
import json

import torch
from lightning.pytorch import LightningModule
from torch.optim import AdamW
from torch.utils.data import DataLoader, DistributedSampler
from transformers import PreTrainedModel, PreTrainedTokenizer
import torch.distributed as dist

from finetune.model.finetuner_model import FinetunerModel
from validation.mbtcp_validator import Validator
from validation.model.result import Result


class Llama2LightningModule(LightningModule):

    def __init__(self,  tokenizer: PreTrainedTokenizer, model: PreTrainedModel, finetuner_model: FinetunerModel, test_dataset):
        super().__init__()
        # self._tokenizer = tokenizer
        # self._model = model
        # # self._output_dir = output_dir
        # # self._save_only_last_epoch = save_only_last_epoch
        # self._training_step_outputs = []
        # self._validation_step_outputs = []
        self._finetuner_model = finetuner_model
        self._test_dataset = test_dataset

        self._tokenizer = tokenizer
        self._model = model

        self._val_loss_const = finetuner_model.val_loss_const
        self._train_loss_const = finetuner_model.train_loss_const

        self._accuracy: [float] = []
        self._accuracy_exactly: [float] = []

    def forward(self, input_ids, attention_mask, labels=None):
        output = self._model(
            input_ids=input_ids,
            attention_mask=attention_mask,
            labels=labels,
        )

        return output.loss, output.logits

    def training_step(self, batch, batch_size):
        loss, outputs = self(
            input_ids=batch["source_text_input_ids"],
            attention_mask=batch["source_text_attention_mask"],
            labels=batch["labels"],
        )

        self.log(self._train_loss_const, loss, prog_bar=True, logger=True, on_epoch=True, on_step=True, sync_dist=True)
        return loss

    def validation_step(self, batch, batch_size):
        loss, outputs = self(
            input_ids=batch["source_text_input_ids"],
            attention_mask=batch["source_text_attention_mask"],
            labels=batch["labels"],
        )

        self.log(self._val_loss_const, loss, prog_bar=True, logger=True, on_epoch=True, on_step=True, sync_dist=True)
        return loss

    def test_step(self, batch, batch_size):
        micro = self.validate(batch, self._finetuner_model.get_validation_filename(self.current_epoch, "micro"), "micro")
        exactly = self.validate(batch, self._finetuner_model.get_validation_filename(self.current_epoch, "exactly"), "exactly")

        self._accuracy.append(micro)
        self._accuracy_exactly.append(exactly)

        self.log("accuracy/micro", micro, batch_size=self._finetuner_model.batch_size, prog_bar=True, logger=True, sync_dist=True, on_epoch=True, on_step=False)
        self.log("accuracy/none", exactly, batch_size=self._finetuner_model.batch_size, prog_bar=True, logger=True, sync_dist=True, on_epoch=True, on_step=False)


    def configure_optimizers(self):
        return AdamW(self.parameters(), lr=0.0001)

    def on_train_epoch_end(self):
        path = (f"{self._output_dir}/epoch-{self.current_epoch}")
        if self._save_only_last_epoch:
            if self.current_epoch == self.trainer.max_epochs - 1:
                self._tokenizer.save_pretrained(path)
                self._model.save_pretrained(path)
        else:
            self._tokenizer.save_pretrained(path)
            self._model.save_pretrained(path)
