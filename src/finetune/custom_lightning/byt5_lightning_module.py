import json
from typing import List

import torch
from lightning.pytorch import LightningModule
from lightning.pytorch.loggers.logger import DummyLogger
from torch.optim import AdamW
from torch.utils.data import DataLoader, DistributedSampler
from transformers import PreTrainedModel, PreTrainedTokenizer
import torch.distributed as dist

from finetune.model.finetuner_model import FinetunerModel
from validation.s7comm_validator import Validator
from validation.model.result import Result


class Byt5LightningModule(LightningModule):

    def __init__(self, tokenizer: PreTrainedTokenizer, model: PreTrainedModel, finetuner_model: FinetunerModel, test_dataset):
        super().__init__()
        self._finetuner_model = finetuner_model
        self._test_dataset = test_dataset

        self._tokenizer = tokenizer
        self._model = model

        self._val_loss_const = finetuner_model.val_loss_const
        self._train_loss_const = finetuner_model.train_loss_const

        self._accuracy: dict[str, List[float]] = {}
        for validation_type in self._finetuner_model.validation:
            self._accuracy[validation_type] = []

    def forward(self, input_ids, attention_mask, decoder_attention_mask, labels=None):
        output = self.model(
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

        self.log(self._train_loss_const, loss, prog_bar=True, logger=True, on_epoch=True, on_step=True, sync_dist=True)
        return loss

    def validation_step(self, batch, batch_size):
        loss, outputs = self(
            input_ids=batch["source_text_input_ids"],
            attention_mask=batch["source_text_attention_mask"],
            labels=batch["labels"],
            decoder_attention_mask=batch["decoder_attention_mask"],
        )

        self.log(self._val_loss_const, loss, prog_bar=True, logger=True, on_epoch=True, on_step=True, sync_dist=True)
        return loss

    def test_step(self, batch, batch_size):
        for validation_type in self._finetuner_model.validation:
            validation = self.validate(batch, self._finetuner_model.get_validation_filename(self.current_epoch, validation_type), validation_type)

            self._accuracy[validation_type].append(validation)

            self.log(f"accuracy/{validation_type}", validation, batch_size=self._finetuner_model.batch_size, prog_bar=True, logger=True, sync_dist=True, on_epoch=True, on_step=False)

    def on_test_end(self) -> None:
        for validation_type in self._finetuner_model.validation:
            validation = torch.tensor(self._accuracy[validation_type], dtype=torch.float, device=self.device)
            dist.all_reduce(validation, op=dist.ReduceOp.SUM)
            validation = torch.mean(validation)
            validation /= dist.get_world_size()

            if self.global_rank == 0:
                self.logger.experiment.add_scalars('accuracy', {validation_type: validation}, self.current_epoch)

            self._accuracy[validation_type] = []

    def configure_optimizers(self):
        return AdamW(self.parameters(), lr=0.0001)

    def test_dataloader(self) -> DataLoader:
        return DataLoader(self._test_dataset, batch_size=self._finetuner_model.batch_size,
                          shuffle=False, num_workers=self._finetuner_model.workers,
                          sampler=DistributedSampler(self._test_dataset))

    def on_train_epoch_end(self) -> None:
        test_set: DataLoader = self.test_dataloader()
        self.model.eval()

        for batch in test_set:
            self.test_step(batch, self._finetuner_model.batch_size)

        self.on_test_end()

        self.model.train()

    @property
    def model(self):
        return self._model

    @property
    def tokenizer(self):
        return self._tokenizer

    def generate(self, input_str: str):
        input_ids = self._tokenizer.encode(input_str, return_tensors="pt", add_special_tokens=True).to(self.model.device)
        with torch.no_grad():
            output = self.model.generate(input_ids,
                                         num_beams=2,
                                         max_length=self._finetuner_model.target_max_token_len,
                                         repetition_penalty=2.5,
                                         length_penalty=1.0,
                                         early_stopping=True,
                                         top_p=0.95,
                                         top_k=50,
                                         num_return_sequences=1,
                                         do_sample=True
                                         )

            return self._tokenizer.batch_decode(output, skip_special_tokens=True, clean_up_tokenization_spaces=True)[0]

    def validate_wrapper(self, args):
        batch, result_file_path, validation_type = args
        self.validate(batch, result_file_path, validation_type)

    def validate(self, batch: dict, result_file_path: str, validation_type: str) -> float:
        valid = 0
        batch_size = len(batch['request'])
        with open(result_file_path, "a") as result_file:
            for request, response in zip(batch["request"], batch["response"]):
                to_save = Result()
                context = ""
                question = ""
                expected_response = response
                try:
                    question = request
                    response = self.generate(question)

                    if "|" in request:
                        question = request[request.rindex("|") + 1:len(request)]
                        context = request[:request.rindex("|")]

                    self.validate_choice(validation_type, question, response, expected_response, self._finetuner_model.current_dataset.addresses.high)

                    to_save.valid = True

                except ValueError as exception:
                    to_save.valid = False
                    to_save.error = exception.__str__()
                finally:
                    if to_save.valid:
                        valid = valid + 1
                    to_save.context = context
                    to_save.request = question
                    to_save.response = response
                    to_save.expected_response = expected_response
                    result_file.write(json.dumps(to_save.__dict__) + "\n")

        return valid / batch_size

    @staticmethod
    def validate_choice(validation_type: str, question: str, response: str, expected_response: str, end_address: int):
        if validation_type == "validator":
            try:
                validation = Validator(question, response, end_address)
                validation.check_header_ids()
                validation.check_payload()
            except IndexError:
                raise ValueError("Invalid packet.")
        else:
            if response != expected_response:
                raise ValueError("Not same as expected.")
