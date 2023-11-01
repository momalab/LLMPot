import lightning as pl
from torch.optim import AdamW


class Llama2LightningModule(pl.LightningModule):

    def __init__(self, tokenizer, model, output_dir: str, save_only_last_epoch: bool = False):
        super().__init__()
        self._tokenizer = tokenizer
        self._model = model
        self._output_dir = output_dir
        self._save_only_last_epoch = save_only_last_epoch
        self._training_step_outputs = []
        self._validation_step_outputs = []

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

        self.log("train_loss", loss, prog_bar=True, logger=True, on_epoch=True, on_step=True)
        return loss

    def validation_step(self, batch, batch_size):
        loss, outputs = self(
            input_ids=batch["source_text_input_ids"],
            attention_mask=batch["source_text_attention_mask"],
            labels=batch["labels"],
        )

        self.log("val_loss", loss, prog_bar=True, logger=True, on_epoch=True, on_step=True)
        return loss

    def test_step(self, batch, batch_size):
        loss, outputs = self(
            input_ids=batch["source_text_input_ids"],
            attention_mask=batch["source_text_attention_mask"],
            labels=batch["labels"],
        )

        self.log("test_loss", loss, prog_bar=True, logger=True)
        return loss

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
