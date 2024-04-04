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

base_model_id = "meta-llama/Llama-2-7b-hf"
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
    quantization_config=bnb_config,
    device_map="auto",
    trust_remote_code=True,
    token="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"
)

# ft_model = PeftModel.from_pretrained(model=base_model,model_id="/home/hl5743/github/ICSPot/checkpoints/mbtcp-protocol-emulation.json/mbtcp-boundaries_client-c0-s200-f1_5_15_3_6_16-v0_65535-a0_39-sc40-sr40/20240404T1327/checkpoints")
ft_model = PeftModel.from_pretrained("~/github/ICSPot/checkpoints/mbtcp-protocol-emulation.json/mbtcp-boundaries_client-c0-s200-f1_5_15_3_6_16-v0_65535-a0_39-sc40-sr40/20240404T1327/checkpoints/last.ckpt",model_id=base_model_id)

ft_model.eval()


def formatting_inference(sample):
    return (f"{tokenizer.bos_token}[INST] <<SYS>>\n"
            f"You are a modbus server, that accepts requests in hex string format and replies with a hex formatted string."
            f"Here is an example request: '1d68000000060001001b0004' and the corresponding response: '1d68000000040001010f'.\n"
            f"<<SYS>>\n\n"
            f"{sample} [/INST]\n")


while True:
    request = input('Llama prompt: ')
    eval_prompt = formatting_inference(request)
    model_input = tokenizer(eval_prompt, return_tensors="pt").to("cuda")
    with torch.no_grad():
        print(f"Llama2 response: {tokenizer.decode(ft_model.generate(**model_input, max_new_tokens=300, pad_token_id=2)[0], skip_special_tokens=True)}")
