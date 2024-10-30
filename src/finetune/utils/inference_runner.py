import json
import os
import time

import torch
from transformers import ByT5Tokenizer, T5ForConditionalGeneration

from cfg import CHECKPOINTS, EXPERIMENTS
from finetune.custom_lightning.byt5_lightning_module import Byt5LightningModule
from finetune.model.finetuner_model import FinetunerModel

class ModelLoader:

    def __init__(self, finetuner_cfg: FinetunerModel, cuda: int = 0) -> None:
        self.finetuner_model = finetuner_cfg
        # self.cuda = cuda
        os.environ["CUDA_VISIBLE_DEVICES"] = "" #str(cuda)
        # print(f"Using CUDA device {cuda}")

    def load_model(self, finetuner_model: FinetunerModel):
        tokenizer = ByT5Tokenizer.from_pretrained(finetuner_model.base_model_id())

        # bnb_config = BitsAndBytesConfig(
        #     load_in_4bit=True,
        #     bnb_4bit_use_double_quant=False,
        #     bnb_4bit_quant_type="nf4",
        #     bnb_4bit_compute_dtype=torch.bfloat16,
        # )
        model_orig = T5ForConditionalGeneration.from_pretrained(finetuner_model.base_model_id(), device_map="cpu")

        model = Byt5LightningModule.load_from_checkpoint(
            checkpoint_path=f"{self.finetuner_model.experiment_instance_last_result_path}",
            finetuner_model=self.finetuner_model,
            tokenizer=tokenizer,
            model=model_orig,
            test_dataset=None,
            # quantization_config=bnb_config,
            # trust_remote_code=True,
            device_map="cpu",
        )
        model.eval()
        return model, tokenizer


    def predict(self, request: str, model, tokenizer):
        input_ids = tokenizer.encode(request, return_tensors="pt", add_special_tokens=True).to("cpu")
        with torch.no_grad():
            # model.model.eval(input_ids)
            logits = model.model.generate(input_ids,
                                        num_beams=3,
                                        max_length=256,
                                        repetition_penalty=1.5,
                                        length_penalty=2,
                                        early_stopping=True,
                                        top_p=1.0,
                                        top_k=50,
                                        temperature=2.0,
                                        num_return_sequences=1,
                                        do_sample=True
                                        ).to("cpu")
            return tokenizer.batch_decode(logits, skip_special_tokens=True, clean_up_tokenization_spaces=True)[0]


def main():
    with open(f"{EXPERIMENTS}/byt5-small/mbtcp-protocol-emulation.json", "r") as cfg:
        config = cfg.read()
        config = json.loads(config)
        finetuner_model = FinetunerModel(experiment="mbtcp-protocol-emulation.json", **config)
        finetuner_model.current_dataset = finetuner_model.datasets[4]
        print(finetuner_model.current_dataset)
        finetuner_model.start_datetime = os.listdir(f"{finetuner_model.experiment_dataset_result_path}")[0]

    model_loader = ModelLoader(finetuner_model, 7)
    model, tokenizer = model_loader.load_model(finetuner_model)

    timing = []
    for i in range(30):
        before = time.time_ns()
        result = model_loader.predict(f"06da00000006000300000002", model, tokenizer)

        after = time.time_ns()
        dur = (after - before) / 1e6
        print(f"{result} - Time: {dur} ms")
        timing.append(dur)
    timing  = timing[1:]
    print(f"Average time: {sum(timing) / len(timing)} ms")

if __name__ == '__main__':
    main()
