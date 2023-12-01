import threading

import lightning as pl
import pandas as pd
import torch
from torch.utils.data import DataLoader, DistributedSampler
from scipy.spatial.distance import hamming
from torch.optim import AdamW

import cfg
from inference.byt5_inference import ModelWrapper

from finetune.model.finetuner_model import FinetunerModel
from validation.validation import ValidatorWrapper


class Byt5LightningModule(pl.LightningModule):

    def __init__(self, tokenizer, model, dataset, output_dir: str = "outputs", save_only_last_epoch: bool = False,
                 finetuner_model: FinetunerModel = None):
        super().__init__()
        self._tokenizer = tokenizer
        self._model = model
        self._output_dir = output_dir
        self._save_only_last_epoch = save_only_last_epoch
        self._index = 0
        self._dataset = dataset
        self._finetuner_model = finetuner_model
        self._validator_wrapper = ValidatorWrapper()

    def forward(self, input_ids, attention_mask, decoder_attention_mask, labels=None):
        output = self._model(
            input_ids=input_ids,
            attention_mask=attention_mask,
            labels=labels,
            decoder_attention_mask=decoder_attention_mask,
        )

        return output.loss, output.logits

    def training_step(self, batch, batch_size):
        loss, outputs = self(
            input_ids=batch["source_text_input_ids"],
            attention_mask=batch["source_text_attention_mask"],
            labels=batch["labels"],
            decoder_attention_mask=batch["decoder_attention_mask"],
        )
        # result = batch["labels"][0]
        # predicted_tokens = torch.argmax(outputs, dim=-1)
        # indices = torch.where(result == -100)

        # truth = list(self._tokenizer.decode(result[:indices[0][0] - 1]))
        # prediction = list(self._tokenizer.decode(predicted_tokens[0]))
        # longest = max(len(prediction), len(truth))
        # prediction.extend([0] * (longest - len(prediction)))
        # truth.extend([0] * (longest - len(truth)))
        #
        # hamming_distance = hamming(prediction, truth)

        # loss = loss + hamming_distance
        self.log("train_loss", loss, prog_bar=True, logger=True, on_epoch=True, on_step=True, sync_dist=True)
        self.logger.experiment.add_scalars('loss', {'train_loss': loss}, self.global_step)
        # self._index = self._index + 1
        return loss

    def validation_step(self, batch, batch_size):
        loss, outputs = self(
            input_ids=batch["source_text_input_ids"],
            attention_mask=batch["source_text_attention_mask"],
            labels=batch["labels"],
            decoder_attention_mask=batch["decoder_attention_mask"],
        )

        self.log("val_loss", loss, prog_bar=True, logger=True, on_epoch=True, on_step=True, sync_dist=True)
        self.logger.experiment.add_scalars('loss', {'val_loss': loss}, self.global_step)
        return loss

    def test_step(self, batch, batch_size):
        pass

    def configure_optimizers(self):
        return AdamW(self.parameters(), lr=0.0001)

    def test_dataloader(self):
        sampler = DistributedSampler(self._dataset["test"])
        return DataLoader(self._dataset["test"], batch_size=1, shuffle=False, num_workers=1, sampler=sampler)

    def on_train_epoch_end(self) -> None:
        self._model.eval()
        with torch.no_grad():
            for batch in self.test_dataloader():
                accuracy = self._validator_wrapper.validate(ModelWrapper(self._model, self._finetuner_model),
                                                            self._tokenizer,
                                                            batch, self._finetuner_model.dataset_filename, "micro")
                self.log("test_accuracy", accuracy, prog_bar=True, logger=True,  sync_dist=True)
