import torch
from transformers import ByT5Tokenizer, T5ForConditionalGeneration

from cfg import CHECKPOINTS
from finetune.custom_lightning.byt5_lightning_module import Byt5LightningModule
from finetune.model.finetuner_model import FinetunerModel


def load_model(finetuner_model: FinetunerModel):
    tokenizer = ByT5Tokenizer.from_pretrained(finetuner_model.base_model_id())
    model = T5ForConditionalGeneration.from_pretrained(finetuner_model.base_model_id())
    model = Byt5LightningModule.load_from_checkpoint(
        checkpoint_path=f"{CHECKPOINTS}/mbtcp-p1-dataset_size-context_length/"
                        f"{finetuner_model.the_name}/"
                        f"{finetuner_model.start_datetime}/checkpoints/mbtcp-p1-c2-1200-v1.ckpt",
        finetuner_model=finetuner_model,
        tokenizer=tokenizer,
        model=model,
        val_loss_const="val_loss",
        train_loss_const="train_loss",
        device_map="cpu"
    )
    model.eval()
    model = model.to("cpu")
    return model, tokenizer


def predict(request: str, model, tokenizer):
    input_ids = tokenizer.encode(request, return_tensors="pt", add_special_tokens=True)
    input_ids = input_ids.to("cpu")
    with torch.no_grad():
        logits = model.model.generate(input_ids,
                                      num_beams=2,
                                      max_length=512,
                                      repetition_penalty=2.5,
                                      length_penalty=1.0,
                                      early_stopping=True,
                                      top_p=0.95,
                                      top_k=50,
                                      num_return_sequences=1,
                                      do_sample=True
                                      ).to("cpu")
        return tokenizer.batch_decode(logits, skip_special_tokens=True, clean_up_tokenization_spaces=True)[0]


def main():
    model, tokenizer = load_model()
    predict("081b00000006000300620001", model, tokenizer)
    print("Ground truth: 081b000000050003020007")
    predict("031a00000006000300250001", model, tokenizer)
    print("Ground truth: 031a000000050003020007")
    predict("03c1000000060006002d0007", model, tokenizer)
    print("Ground truth: 03c1000000060006002d0007")


if __name__ == '__main__':
    main()
