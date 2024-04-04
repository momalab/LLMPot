import argparse

import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, LlamaTokenizerFast

import cfg

parser = argparse.ArgumentParser()
parser.add_argument('-c', required=False, default="2400")
args = parser.parse_args()

checkpoint = args.c

base_model_id = "meta-llama/Llama-2-7b-chat-hf"
tokenizer: LlamaTokenizerFast = AutoTokenizer.from_pretrained(
    base_model_id,
    padding_side="left",
    add_eos_token=False,
    add_bos_token=False,
    token="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"
)
tokenizer.pad_token = tokenizer.eos_token
model_root_folder = f"{cfg.CHECKPOINTS}/checkpoints/llama2-test.json/mbtcp-boundaries_client-c0-s200-f1_5_15_3_6_16-v0_65535-a0_39-sc40-sr40/20240404T1605/checkpoints/"
model = AutoModelForCausalLM.from_pretrained(model_root_folder, device_map="auto")

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
