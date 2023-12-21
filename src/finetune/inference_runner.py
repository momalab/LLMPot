import argparse
import time

import torch
from transformers import ByT5Tokenizer, T5ForConditionalGeneration

from finetune.byt5 import Byt5
from finetune.custom_lightning.byt5_lightning_module import Byt5LightningModule
from finetune.model.finetuner_model import FinetunerModel


def _load_model():
    finetune_model = FinetunerModel(model_type="google", model_name="byt5-small",
                                    dataset_filename="mbtcp-deterministic-2k_fc-3-16",
                                    epochs=1, precision=32, workers=2, start_datetime="20231213T1449")
    tokenizer = ByT5Tokenizer.from_pretrained("google/byt5-small")
    model = T5ForConditionalGeneration.from_pretrained("google/byt5-small")
    model = Byt5LightningModule.load_from_checkpoint(
        checkpoint_path="/media/shared/ICSPot/outputs/checkpoints/google_byt5-small_mbtcp-deterministicContext-2k_fc-3-6_epochs-100_precision-32/20231214T1600/checkpoints/39-0.0000.ckpt",
        finetuner_model=finetune_model,
        tokenizer=tokenizer,
        model=model
    )
    model.eval()
    model = model.to("cuda:0")
    return model, tokenizer


def predict(request: str, model, tokenizer):
    input_ids = tokenizer.encode(request, return_tensors="pt", add_special_tokens=True)
    print(input_ids)
    input_ids = input_ids.to("cuda:0")
    with torch.no_grad():
        # loss, logits = model(input_ids)
        # print(tokenizer.batch_decode(logits, skip_special_tokens=True, clean_up_tokenization_spaces=True)[0])
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
                                      )
        print(tokenizer.batch_decode(logits, skip_special_tokens=True, clean_up_tokenization_spaces=True)[0])


def main():
    model, tokenizer = _load_model()
    predict("081b00000006000300620001", model, tokenizer)
    print("Ground truth: 081b000000050003020007")
    predict("031a00000006000300250001", model, tokenizer)
    print("Ground truth: 031a000000050003020007")
    predict("03c1000000060006002d0007", model, tokenizer)
    print("Ground truth: 03c1000000060006002d0007")


if __name__ == '__main__':
    main()
