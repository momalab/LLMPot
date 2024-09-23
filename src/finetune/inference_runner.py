import json
import os
import time

import torch
from transformers import ByT5Tokenizer, T5ForConditionalGeneration, BitsAndBytesConfig

from cfg import CHECKPOINTS, EXPERIMENTS
from finetune.custom_lightning.byt5_lightning_module import Byt5LightningModule
from finetune.model.finetuner_model import FinetunerModel

import torch
import torch.nn as nn
import torch.nn.utils.prune as prune


class ModelLoader:

    def __init__(self, finetuner_cfg: FinetunerModel, cuda: int = 0) -> None:
        self.finetuner_model = finetuner_cfg
        self.cuda = cuda
        os.environ["CUDA_VISIBLE_DEVICES"] = str(cuda)
        print(f"Using CUDA device {cuda}")

    def load_model(self, finetuner_model: FinetunerModel):
        tokenizer = ByT5Tokenizer.from_pretrained(finetuner_model.base_model_id())

        bnb_config = BitsAndBytesConfig(
            load_in_4bit=True,
            bnb_4bit_use_double_quant=False,
            bnb_4bit_quant_type="nf4",
            bnb_4bit_compute_dtype=torch.bfloat16,
        )
        model_orig = T5ForConditionalGeneration.from_pretrained(finetuner_model.base_model_id(),
            device_map="cuda")

        model = Byt5LightningModule.load_from_checkpoint(
            checkpoint_path=f"{CHECKPOINTS}/{self.finetuner_model.experiment}/"
                            f"{self.finetuner_model.the_name}/"
                            f"{self.finetuner_model.start_datetime}/checkpoints/last.ckpt",
            finetuner_model=self.finetuner_model,
            tokenizer=tokenizer,
            model=model_orig,
            test_dataset=None,
            quantization_config=bnb_config,
            trust_remote_code=True,
            device_map="cuda",
        )
        model.eval()
        return model, tokenizer


    def predict(self, request: str, model, tokenizer):
        input_ids = tokenizer.encode(request, return_tensors="pt", add_special_tokens=True).to("cuda")
        with torch.no_grad():
            # model.model.eval(input_ids)
            logits = model.model.generate(input_ids,
                                        num_beams=1,
                                        # max_length=256,
                                        # repetition_penalty=2.5,
                                        # length_penalty=1.0,
                                        # early_stopping=True,
                                        # top_p=0.95,
                                        # top_k=50,
                                        # num_return_sequences=1,
                                        # do_sample=True
                                        ).to("cuda")
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

    model_loader = ModelLoader(finetuner_model, 7)
    model, tokenizer = model_loader.load_model(finetuner_model)

    timing = []
    for i in range(200):
        before = time.time_ns()
        result = model_loader.predict(f"006{i}0000000d0010202500030600006314631{i}", model, tokenizer)
        after = time.time_ns()
        dur = (after - before) / 1e6
        print(f"Time: {dur} ms")
        timing.append(dur)
    timing  = timing[1:]
    print(f"Average time: {sum(timing) / len(timing)} ms")
    print(result)

def apply_pruning_to_linear_layers(module):
    for submodule_name, submodule in module.named_children():
        if isinstance(submodule, torch.nn.Linear):
            print(f"Pruning linear layer {submodule_name}")
            prune.l1_unstructured(submodule, name='weight', amount=0.9)  # Example: prune 20% of weights
        apply_pruning_to_linear_layers(submodule)

if __name__ == '__main__':
    main()
