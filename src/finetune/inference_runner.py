import json
import os

import torch
from transformers import ByT5Tokenizer, T5ForConditionalGeneration

from cfg import CHECKPOINTS, EXPERIMENTS
from finetune.custom_lightning.byt5_lightning_module import Byt5LightningModule
from finetune.model.finetuner_model import FinetunerModel


def load_model(finetuner_model: FinetunerModel):
    tokenizer = ByT5Tokenizer.from_pretrained(finetuner_model.base_model_id())
    model = T5ForConditionalGeneration.from_pretrained(finetuner_model.base_model_id())
    model = Byt5LightningModule.load_from_checkpoint(
        checkpoint_path=f"{CHECKPOINTS}/{finetuner_model.experiment}/"
                        f"{finetuner_model.the_name}/"
                        f"{finetuner_model.start_datetime}/checkpoints/last.ckpt",
        finetuner_model=finetuner_model,
        tokenizer=tokenizer,
        model=model,
        test_dataset=None,
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
    with open(f"{EXPERIMENTS}/mbtcp-protocol-emulation.json", "r") as cfg:
        config = cfg.read()
        config = json.loads(config)
        finetuner_model = FinetunerModel(**config)
        finetuner_model.experiment = "mbtcp-protocol-emulation.json"
        finetuner_model.current_dataset = finetuner_model.datasets[4]
        print(finetuner_model.current_dataset)
        finetuner_model.start_datetime = os.listdir(f"{CHECKPOINTS}/{finetuner_model.experiment}/{finetuner_model.the_name}")[0]

    model, tokenizer = load_model(finetuner_model)
    result = predict("00610000000d00102025000306000063146314", model, tokenizer)
    print(result)


if __name__ == '__main__':
    main()
