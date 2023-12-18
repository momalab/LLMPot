import json
from statistics import mean

import torch
from lightning.pytorch import LightningModule
from torch.optim import AdamW
from torch.utils.data import DataLoader, DistributedSampler
from transformers import PreTrainedModel, PreTrainedTokenizer

from finetune.model.finetuner_model import FinetunerModel
from validation.mbtcp_validator import Validator

from validation.model.result import Result


class Byt5LightningModule(LightningModule):

    def __init__(self, tokenizer: PreTrainedTokenizer, model: PreTrainedModel, finetuner_model: FinetunerModel, dataset=None):
        super().__init__()
        self._finetuner_model = finetuner_model
        self._dataset = dataset

        self._tokenizer = tokenizer
        self._model = model

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

        self.log("train_loss", loss, prog_bar=True, logger=True, on_epoch=True, on_step=True, sync_dist=True)
        return loss

    def validation_step(self, batch, batch_size):
        loss, outputs = self(
            input_ids=batch["source_text_input_ids"],
            attention_mask=batch["source_text_attention_mask"],
            labels=batch["labels"],
            decoder_attention_mask=batch["decoder_attention_mask"],
        )

        self.log("val_loss", loss, prog_bar=True, logger=True, on_epoch=True, on_step=True, sync_dist=True)
        return loss

    def test_step(self, batch, batch_size):
        pass

    def configure_optimizers(self):
        return AdamW(self.parameters(), lr=0.0001)

    def test_dataloader(self) -> DataLoader:
        sampler = DistributedSampler(self._dataset["test"])
        return DataLoader(self._dataset["test"], batch_size=10, shuffle=False, num_workers=8, sampler=sampler)

    def on_train_epoch_end(self) -> None:
        accuracy = []
        accuracy_exactly = []
        test_set = self.test_dataloader()
        self.model.eval()
        with torch.no_grad():
            for batch in test_set:
                accuracy.append(self.validate(batch, self._finetuner_model.get_validation_filename(self.current_epoch, "micro"), "micro"))
                accuracy_exactly.append(self.validate(batch, self._finetuner_model.get_validation_filename(self.current_epoch, "exactly"), "exactly"))

            self.log("accuracy_micro", mean(accuracy), prog_bar=True, logger=True, sync_dist=True, on_epoch=True)
            self.log("accuracy_exactly", mean(accuracy_exactly), prog_bar=True, logger=True, sync_dist=True, on_epoch=True)
            self.logger.experiment.add_scalars('accuracy_epoch', {'micro': mean(accuracy), 'exactly': mean(accuracy_exactly)}, self.current_epoch)
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
                                         max_length=512,
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
                        context = request[:request.rindex("|") - 1]
                        # inputs = self.model.base_model.tokenizer([(question, context)], return_tensors="pt")
                        # output = self.model.base_model.tokenizer.decode(inputs['input_ids'][0])
                        # response = self.generate(output)

                    self.validate_choice(validation_type, question, response, expected_response)

                    to_save.valid = True

                except ValueError as exception:
                    to_save.valid = False
                    to_save.error = exception.__str__()
                finally:
                    if to_save.valid:
                        valid = valid + 1
                    # to_save.index = index
                    to_save.context = context
                    to_save.request = question
                    to_save.response = response
                    to_save.expected_response = expected_response
                    result_file.write(json.dumps(to_save.__dict__) + "\n")

        return round(valid / batch_size, 2)

    @staticmethod
    def validate_choice(validation_type: str, question: str, response: str, expected_response: str):
        if validation_type == "micro":
            validation = Validator(question, response)
            validation.check_header_ids()
            validation.check_payload()
        else:
            if response != expected_response:
                raise ValueError("Not same as expected.")
