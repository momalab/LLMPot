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
)
tokenizer.pad_token = tokenizer.eos_token
model_root_folder = f"{cfg.OUTPUTS_DIR}/models/meta-llama_meta-llama_Llama-2-7b-chat-hf_mbtcp-nocontext-6k_fc-3-16_epochs-30_precision-32_20231030T2130/epoch-0"
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
