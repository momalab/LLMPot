import argparse
import datetime
import json

import torch
from transformers import (AutoModelForCausalLM, AutoTokenizer, ByT5Tokenizer,
                          LlamaTokenizerFast, T5ForConditionalGeneration)

from cfg import CHECKPOINTS, EXPERIMENTS, OUTPUTS_DIR
from finetune.custom_lightning.byt5_lightning_module import Byt5LightningModule
from finetune.model.finetuner_model import FinetunerModel


class Inference:

    def __init__(self, finetune_model: FinetunerModel):
        if finetune_model.model_type == "meta-llama":
            self._tokenizer: LlamaTokenizerFast = AutoTokenizer.from_pretrained(finetune_model.base_model_id(), padding_side="left", add_eos_token=False, add_bos_token=False)
            self._tokenizer.pad_token = self._tokenizer.eos_token
            self._model = AutoModelForCausalLM.from_pretrained(f"{finetune_model.experiment_instance_last_result_path}", device_map="cuda")
        else:
            self._tokenizer =
            model = Byt5LightningModule(tokenizer=ByT5Tokenizer.from_pretrained(finetune_model.base_model_id()),
                                        model=ByT5ForConditionalGeneration.from_pretrained(finetune_model.base_model_id()),
                                        config=ByT5Config.from_pretrained(finetune_model.base_model_id()))
            checkpoint = torch.load(finetune_model.experiment_instance_last_result_path)

# Load the model's state_dict from the checkpoint
model.load_state_dict(checkpoint['state_dict'])

# If you also saved the optimizer, you can load it like this:
# optimizer.load_state_dict(checkpoint['optimizer_state_dict'])

# Move the model to the appropriate device (CPU or GPU)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)
            self._model = T5ForConditionalGeneration.from_pretrained(
                f"{finetune_model.experiment_instance_last_result_path}", device_map="cuda")

        self._model.eval()

    def process(self, input_str: str) -> str:
        input_ids = self._tokenizer.encode(input_str, return_tensors="pt", add_special_tokens=True).to("cuda")
        with torch.no_grad():
            outputs = self._model.generate(input_ids,
                                        #    num_beams=2,
                                        #    max_length=2048,
                                        #    repetition_penalty=2.5,
                                        #    length_penalty=1.0,
                                        #    early_stopping=True,
                                        #    top_p=0.95,
                                        #    top_k=50,
                                        #    num_return_sequences=1,
                                        #    do_sample=True
                                           ).to("cuda")
            return self._tokenizer.batch_decode(outputs, skip_special_tokens=True, clean_up_tokenization_spaces=True)[0]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-mt', default="google", required=False)
    parser.add_argument('-model', default="byt5-small", required=False)
    parser.add_argument('-experiment', default="mbtcp-protocol-emulation.json", required=False)
    parser.add_argument('-datetime', default="20240918T1110", required=False)
    args = parser.parse_args()

    with open(f"{EXPERIMENTS}/{args.model}/{args.experiment}", "r") as cfg:
        config = cfg.read()
        config = json.loads(config)
        finetuner_model = FinetunerModel(args.experiment, **config)
        finetuner_model.start_datetime = args.datetime

    inference = Inference(finetuner_model)
    inference.process("04ad000000150010001700070e02d4f6905690f2fc5bc71801e123")


if __name__ == '__main__':
    main()
