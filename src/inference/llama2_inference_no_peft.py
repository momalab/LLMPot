import argparse
import json

import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, LlamaTokenizerFast, BitsAndBytesConfig

from cfg import CHECKPOINTS, EXPERIMENTS
from finetune.custom_lightning.llama2_lightning_module import Llama2LightningModule
from finetune.model.finetuner_model import FinetunerModel

experiment = "llama2-test.json"
with open(f"{EXPERIMENTS}/{experiment}", "r") as cfg:
    config = cfg.read()
    config = json.loads(config)
    finetuner_model = FinetunerModel(**config)
    finetuner_model.experiment = experiment

parser = argparse.ArgumentParser()
parser.add_argument('-c', required=False, default="2400")
args = parser.parse_args()

checkpoint = args.c

base_model_id = "meta-llama/Llama-2-7b-hf"
tokenizer: LlamaTokenizerFast = AutoTokenizer.from_pretrained(
    base_model_id,
    padding_side="left",
    add_eos_token=False,
    add_bos_token=False,
    token="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"
)

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16
)

tokenizer.pad_token = tokenizer.eos_token
model_root_folder = f"{CHECKPOINTS}/llama2-test.json/mbtcp-boundaries_client-c0-s200-f1_5_15_3_6_16-v0_65535-a0_39-sc40-sr40/20240404T1605/checkpoints/last.ckpt"
model_base = AutoModelForCausalLM.from_pretrained(base_model_id,
                                                  quantization_config=bnb_config,
                                                  token="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")
model = Llama2LightningModule.load_from_checkpoint(checkpoint_path=model_root_folder,
                                                   finetuner_model=finetuner_model,
                                                   tokenizer=tokenizer,
                                                   model=model_base,
                                                   test_dataset=None,
                                                   map_location="cpu"
                                                   )

model.eval()

while True:
    request = input('Llama2 prompt: \n')
    input_ids = tokenizer.encode(request, return_tensors="pt", add_special_tokens=True).to("cuda")
    input_ids = input_ids.to("cuda")
    with torch.no_grad():
        outputs = model.generate(input_ids,
                                 # generation_config=generation_config,
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
        print(tokenizer.batch_decode(outputs, skip_special_tokens=True, clean_up_tokenization_spaces=True)[0])
