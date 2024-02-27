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


class Byt5LightningModule(LightningModule):

    def __init__(self, tokenizer: PreTrainedTokenizer, model: PreTrainedModel, finetuner_model: FinetunerModel, val_loss_const: str, train_loss_const: str, dataset=None):
        super().__init__()
        self._finetuner_model = finetuner_model
        self._dataset = dataset

        self._tokenizer = tokenizer
        self._model = model

        self._val_loss_const = val_loss_const
        self._train_loss_const = train_loss_const

        self._accuracy: [float] = []
        self._accuracy_exactly: [float] = []

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
        # micro = self.validate(batch, self._finetuner_model.get_validation_filename(self.current_epoch, "micro"), "micro")
        exactly = self.validate(batch, self._finetuner_model.get_validation_filename(self.current_epoch, "exactly"),"exactly")

        # self._accuracy.append(micro)
        self._accuracy_exactly.append(exactly)

        # self.log("accuracy/micro", micro, batch_size=10, prog_bar=True, logger=True, sync_dist=True, on_epoch=True, on_step=False)
        self.log("accuracy/none", exactly, batch_size=10, prog_bar=True, logger=True, sync_dist=True)

    def on_test_end(self) -> None:
        self.on_test_end_custom()

    def on_test_end_custom(self) -> None:
        # micro = torch.tensor(self._accuracy, dtype=torch.float, device=self.device)
        none = torch.tensor(self._accuracy_exactly, dtype=torch.float, device=self.device)
        # dist.all_reduce(micro, op=dist.ReduceOp.SUM)
        dist.all_reduce(none, op=dist.ReduceOp.SUM)
        # micro = torch.mean(micro)
        none = torch.mean(none)
        # micro /= dist.get_world_size()
        none /= dist.get_world_size()

        if self.global_rank == 0:
            self.logger.experiment.add_scalars('accuracy', {'none': none}, self.current_epoch)

        self._accuracy = []
        self._accuracy_exactly = []

    def configure_optimizers(self):
        return AdamW(self.parameters(), lr=0.0001)

    def _custom_test_dataloader(self) -> DataLoader:
        sampler = DistributedSampler(self._dataset["test"])
        return DataLoader(self._dataset["test"], batch_size=10, shuffle=False, num_workers=2, sampler=sampler)

    def on_train_epoch_end(self) -> None:
        test_set: DataLoader = self._custom_test_dataloader()
        self.model.eval()

        for batch in test_set:
            self.test_step(batch, 10)

        self.on_test_end_custom()

        self.model.train()

    @property
    def model(self):
        return self._model

    @property
    def tokenizer(self):
        return self._tokenizer

    def generate(self, input_str: str):
        input_ids = self._tokenizer.encode(input_str, return_tensors="pt", add_special_tokens=True)
        input_ids = input_ids.to(self.model.device)
        self._model.eval()
        with torch.no_grad():
            output = self.model.generate(input_ids,
                                         num_beams=2,
                                         max_length=4192,
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

                    self.validate_choice(validation_type, question, response, expected_response)

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
    def validate_choice(validation_type: str, question: str, response: str, expected_response: str):
        if validation_type == "micro":
            validation = Validator(question, response)
            validation.check_header_ids()
            validation.check_payload()
        else:
            if response != expected_response:
                raise ValueError("Not same as expected.")
