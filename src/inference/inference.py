import argparse
import datetime

import torch
from transformers import ByT5Tokenizer, T5ForConditionalGeneration, AutoTokenizer, LlamaTokenizerFast, \
    AutoModelForCausalLM

from cfg import OUTPUTS_DIR, EXPERIMENTS, CHECKPOINTS
from finetune.model.finetuner_model import FinetunerModel


class Inference:

    def __init__(self, finetune_model: FinetunerModel):
        if finetune_model.model_type == "meta-llama":
            self._tokenizer: LlamaTokenizerFast = AutoTokenizer.from_pretrained(
                finetune_model.base_model_id(), padding_side="left", add_eos_token=False, add_bos_token=False)
            self._tokenizer.pad_token = self._tokenizer.eos_token
            self._model = AutoModelForCausalLM.from_pretrained(
                f"{CHECKPOINTS}/{finetune_model.__str__()}", device_map="cpu")
        else:
            self._tokenizer = ByT5Tokenizer.from_pretrained(finetune_model.base_model_id())
            self._model = T5ForConditionalGeneration.from_pretrained(
                f"{CHECKPOINTS}/mbtcp-p1-dataset_size-context_length/"
                f"{finetune_model.the_name}/"
                f"{finetune_model.start_datetime}/checkpoints/mbtcp-p1-c2-1200-v1.ckpt", device_map="cpu")

        self._model.eval()

    def process(self, input_str: str) -> str:
        input_ids = self._tokenizer.encode(input_str, return_tensors="pt", add_special_tokens=True).to("cpu")
        with torch.no_grad():
            outputs = self._model.generate(input_ids,
                                           num_beams=2,
                                           max_length=2048,
                                           repetition_penalty=2.5,
                                           length_penalty=1.0,
                                           early_stopping=True,
                                           top_p=0.95,
                                           top_k=50,
                                           num_return_sequences=1,
                                           do_sample=True
                                           ).to("cpu")
            return self._tokenizer.batch_decode(outputs, skip_special_tokens=True, clean_up_tokenization_spaces=True)[0]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-mt', default="google", required=False)
    parser.add_argument('-mn', default="byt5-small", required=False)
    parser.add_argument('-csv', default="mbtcp-nocontext-120k", required=False)
    parser.add_argument('-max_e', default=300, required=False)
    parser.add_argument('-e', default=11, required=False)
    parser.add_argument('-p', default=32, required=False)
    parser.add_argument('-d', default="20231020T1420", required=False)
    args = parser.parse_args()

    # start_time = datetime.datetime.fromtimestamp(args.d).strftime('%Y%m%dT%H%M')

    finetune_model = FinetunerModel(model_type=args.mt, model_name=args.mn, dataset_filename=args.csv,
                                    max_epochs=args.max_e, epoch=args.e, precision=args.p, start_datetime=args.d)

    inference = Inference(finetune_model)
    inference.process("04ad000000150010001700070e02d4f6905690f2fc5bc71801e123")


if __name__ == '__main__':
    main()
