from datetime import datetime

import torch
from transformers import ByT5Tokenizer, T5ForConditionalGeneration

from finetune.model.finetuner_model import FinetunerModel


class ModelWrapper:
    def __init__(self, finetuner_model: FinetunerModel, cuda_device: int = 0):
        self._finetuner_model = finetuner_model
        self._cuda_device = cuda_device
        self._model = self._load_model()
        self._tokenizer = ByT5Tokenizer.from_pretrained(self._finetuner_model.base_model_id())

    def __init__(self, model, finetuner_model: FinetunerModel):
        self._finetuner_model = finetuner_model
        self._model = model
        self._cuda_device = model.device
        self._tokenizer = ByT5Tokenizer.from_pretrained(self._finetuner_model.base_model_id())

    @property
    def the_model(self):
        return self._model

    def _load_model(self):
        model = T5ForConditionalGeneration.from_pretrained(self._finetuner_model.output_dir)
        model.eval()
        model = model.to(self._cuda_device)
        return model

    def predict(self, request: str):
        input_ids = self._tokenizer.encode(request, return_tensors="pt", add_special_tokens=True)
        input_ids = input_ids.to(self._cuda_device)
        with torch.no_grad():
            outputs = self._model.generate(input_ids,
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
            return self._tokenizer.batch_decode(outputs, skip_special_tokens=True, clean_up_tokenization_spaces=True)[0]


def main():
    finetuner_model = FinetunerModel(model_type="google", model_name="byt5-small",
                                     dataset_filename="mbtcp-nocontext-6k", fc=["3", "16"], epochs="100",
                                     precision="32", epoch="20",
                                     start_time=datetime.strptime("20231128T1804", '%Y%m%dT%H%M').timestamp())
    model = ModelWrapper(finetuner_model)
    print(model.predict("04ad000000150010001700070e02d4f6905690f2fc5bc71801e123"))


if __name__ == '__main__':
    main()

