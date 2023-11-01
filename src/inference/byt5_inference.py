import argparse

import torch
from peft import PeftModel
from transformers import AutoTokenizer, AutoModelForCausalLM, LlamaTokenizerFast, ByT5Tokenizer, \
    T5ForConditionalGeneration, GenerationConfig
from transformers import BitsAndBytesConfig

import cfg

parser = argparse.ArgumentParser()
parser.add_argument('-c', required=False, default="2400")
args = parser.parse_args()

checkpoint = args.c

base_model_id = "google/byt5-small"
tokenizer = ByT5Tokenizer.from_pretrained(base_model_id)
# base_model = T5ForConditionalGeneration.from_pretrained(base_model_id, device_map="auto")
model_root_folder = f"{cfg.OUTPUTS_DIR}/models/byt5_google_byt5-small_mbtcp-nocontext-6k_fc-3-16_epochs-30_precision-32_20231027T1903/checkpoint-{checkpoint}"
model_root_folder = f"{cfg.OUTPUTS_DIR}/models/google_byt5-small_mbtcp-nocontext-6k_fc-3-16_epochs-10_precision-32_20231031T1625/epoch-1"
model = T5ForConditionalGeneration.from_pretrained(model_root_folder, device_map="auto")
# generation_config = GenerationConfig.from_pretrained(model_root_folder, "generation_config.json")
# ft_model = PeftModel.from_pretrained(base_model, f"{cfg.OUTPUTS_DIR}/models/google_google_byt5-small_mbtcp-nocontext-6k_epochs-6_precision-32_20231025T1606/checkpoint-{checkpoint}")

# ft_model.eval()
model.eval()


while True:
    request = input('Byt5 prompt: \n')
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
        # preds = [
        #     tokenizer.decode(g, skip_special_tokens=True, clean_up_tokenization_spaces=True)
        #     for g in outputs
        # ]
        # print(preds)
        print(tokenizer.batch_decode(outputs, skip_special_tokens=True, clean_up_tokenization_spaces=True)[0])
