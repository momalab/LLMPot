import argparse

import torch
from peft import PeftModel
from transformers import AutoTokenizer, AutoModelForCausalLM, LlamaTokenizerFast
from transformers import BitsAndBytesConfig

import cfg

parser = argparse.ArgumentParser()
parser.add_argument('-c', required=False, default="500")
args = parser.parse_args()

checkpoint = args.c

base_model_id = "meta-llama/Llama-2-7b-chat-hf"
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16
)

tokenizer: LlamaTokenizerFast = AutoTokenizer.from_pretrained(
    base_model_id,
    padding_side="left",
    add_eos_token=False,
    add_bos_token=False,
    token="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"
)
tokenizer.pad_token = tokenizer.eos_token

base_model = AutoModelForCausalLM.from_pretrained(
    base_model_id,
    # quantization_config=bnb_config,
    device_map="auto",
    trust_remote_code=True,
    token="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",
)

ft_model = PeftModel.from_pretrained(base_model,
                                     f"{cfg.CHECKPOINTS}/checkpoints/llama2-test.json/mbtcp-boundaries_client-c0-s200-f1_5_15_3_6_16-v0_65535-a0_39-sc40-sr40/20240404T1605/checkpoints",
                                     inference_mode=True)

ft_model.eval()

while True:
    request = input('Llama prompt: \n')
    model_input = tokenizer(request, return_tensors="pt").to("cuda")
    with torch.no_grad():
        print(tokenizer.decode(ft_model.generate(**model_input,
                                                 max_new_tokens=300,
                                                 pad_token_id=2,
                                                 # num_beams=2,
                                                 # max_length=512,
                                                 repetition_penalty=2.5,
                                                 length_penalty=1.0,
                                                 # early_stopping=True,
                                                 top_p=0.95,
                                                 top_k=50,
                                                 num_return_sequences=1,
                                                 do_sample=True
                                                 )[0],
                               skip_special_tokens=True))
