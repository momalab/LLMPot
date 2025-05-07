from concurrent.futures import ThreadPoolExecutor
import json
import os
import time

import torch
from transformers import ByT5Tokenizer, T5ForConditionalGeneration

from cfg import CHECKPOINTS, EXPERIMENTS
from finetune.custom_lightning.byt5_lightning_module import Byt5LightningModule
from finetune.model.finetuner_model import FinetunerModel


class ModelLoader:

    def __init__(self, finetuner_cfg: FinetunerModel, i: int) -> None:
        self.device = "cpu"
        # self.device = "cuda:0"
        self.finetuner_model = finetuner_cfg
        self.index = i

        self.model, self.tokenizer = self.load_model(self.finetuner_model)

    def load_model(self, finetuner_model: FinetunerModel):
        tokenizer = ByT5Tokenizer.from_pretrained(finetuner_model.base_model_id(), clean_up_tokenization_spaces=False)
        model_orig = T5ForConditionalGeneration.from_pretrained(finetuner_model.base_model_id()) #, device_map=self.device)

        model = Byt5LightningModule.load_from_checkpoint(checkpoint_path=f"{self.finetuner_model.experiment_instance_last_result_path}",
            finetuner_model=self.finetuner_model, tokenizer=tokenizer, model=model_orig, test_dataset=None) #, device_map=self.device)
        model.eval()
        return model, tokenizer


    def predict(self, request: str):
        input_ids = self.tokenizer.encode(request, return_tensors="pt", add_special_tokens=True)
        # .to(self.device)
        with torch.no_grad():
            logits = self.model.model.generate(input_ids, num_beams=3, max_length=256, repetition_penalty=1.5, length_penalty=2, early_stopping=True,
                                        top_p=1.0, top_k=50, temperature=2.0, num_return_sequences=1, do_sample=True)
            # .to(self.device)
            return self.tokenizer.batch_decode(logits, skip_special_tokens=True, clean_up_tokenization_spaces=True)[0]


def main():
    with open(f"{EXPERIMENTS}/byt5-small/mbtcp-protocol-emulation.json", "r") as cfg:
        config = cfg.read()
        config = json.loads(config)
        finetuner_model = FinetunerModel(experiment="mbtcp-protocol-emulation.json", **config)
        finetuner_model.current_dataset = finetuner_model.datasets[4]
        finetuner_model.start_datetime = os.listdir(f"{finetuner_model.experiment_dataset_result_path}")[0]

    total_requests = 100
    num_models = 1

    model_loaders = []
    for i in range(0, num_models):
        model_loaders.append(ModelLoader(finetuner_model, i))

    start_time = time.time()

    with ThreadPoolExecutor(max_workers=num_models) as executor:
        futures = []
        for model_loader in model_loaders:
            for _ in range(total_requests // num_models):
                futures.append(executor.submit(model_loader.predict, "06da00000006000300000002"))

                [future.result() for future in futures]

    end_time = time.time()

    requests_per_second = total_requests / (end_time - start_time)
    print(f"Total time: {end_time - start_time} seconds - Total requests: {total_requests}")
    print(f"Requests per second: {requests_per_second}")

if __name__ == '__main__':
    main()
