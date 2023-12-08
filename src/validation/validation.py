import argparse
import json
import multiprocessing as mp
import os
from datetime import datetime

from datasets import Dataset
from torch.utils.data import DataLoader
from tqdm import tqdm
from transformers import ByT5Tokenizer

import utilities.load_dataset
from cfg import OUTPUTS_DIR, PROJECT_ROOT_DIR
from finetune.model.finetuner_model import FinetunerModel
from inference.byt5_inference import ModelWrapper
from validation.mbtcp_validator import Validator
from validation.model.result import Result


class ValidatorWrapper:

    def validate_wrapper(self, args):
        model, tokenizer, batch, result_file_path, validation_type = args
        self.validate(model, tokenizer, batch, result_file_path, validation_type)

    def validate(self, model: ModelWrapper, tokenizer: ByT5Tokenizer, batch: dict, result_file_path: str, validation_type: str) -> float:
        valid = 0
        batch_size = len(batch['request'])
        with open(result_file_path, "a") as result_file:
            for request, response in zip(batch["request"], batch["response"]):
                to_save = Result()
                context = ""
                question = ""
                expected_response = response
                try:
                    if "|" in request:
                        question = request[request.rindex("|") + 1:len(request)]
                        context = request[:request.rindex("|") - 1]
                        context = request
                        inputs = model.the_model.tokenizer([(question, context)], return_tensors="pt")
                        output = tokenizer.decode(inputs['input_ids'][0])
                        response = model.predict(output)

                    elif ("Context :" in request) or ("Context ->" in request):
                        question = request[request.rindex(" Request 3:") + 1:len(request)]
                        context = request
                        inputs = model.the_model.tokenizer([(question, context)], return_tensors="pt")
                        output = tokenizer.decode(inputs['input_ids'][0])
                        response = model.predict(output)

                        question = request[request.rindex("Request 3:") - 1:request.rindex("Reponse 3:")]
                        question = question.rpartition("Request 3:")
                        question = question[2]
                        question = question.strip()

                    else:
                        question = request
                        response = model.predict(question)

                    self.validate_choice(validation_type, question, response, expected_response)

                    to_save.valid = True

                except ValueError as exception:
                    to_save.valid = False
                    to_save.error = exception.__str__()
                finally:
                    if to_save.valid:
                        valid = valid + 1
                    # to_save.index = index
                    to_save.context = context
                    to_save.request = question
                    to_save.response = response
                    to_save.expected_response = expected_response
                    result_file.write(json.dumps(to_save.__dict__) + "\n")

        return round(valid / batch_size, 2)

    @staticmethod
    def validate_choice(validation_type: str, question: str, response: str, expected_response: str):
        if validation_type == "micro":
            validation = Validator(question, response)
            validation.check_header_ids()
            validation.check_payload()
        else:
            if response != expected_response:
                raise ValueError("Not same as expected.")


def main():
    parser = argparse.ArgumentParser()

    parser.add_argument('-mt', default="google", required=False)
    parser.add_argument('-mn', default="byt5-small", required=False)
    parser.add_argument('-ts', default="mbtcp-nocontext-6k_fc-3-16", required=False)
    parser.add_argument('-t', default="20231130T2036", required=False)
    parser.add_argument('-e', default=100, required=False)
    parser.add_argument('-p', default=32, required=False)
    parser.add_argument('-w', default=2, required=False)
    parser.add_argument('-g', default="True", required=False)
    parser.add_argument('-val', default="micro", required=False)
    args = parser.parse_args()

    test_set_name = args.ts
    use_gpu = eval(args.g)
    validation_type = args.val

    datetime_obj = datetime.strptime(args.t, '%Y%m%dT%H%M')

    finetuner_model = FinetunerModel(model_type=args.mt, model_name=args.mn, dataset_filename=args.ts,
                                     epochs=args.e, precision=args.p, workers=args.w, start_time=datetime_obj.timestamp())

    test_set = utilities.load_dataset.load_dataset_from_file(f"{test_set_name}")["test"]
    test_set = DataLoader(test_set, batch_size=len(test_set), shuffle=False, num_workers=1)

    args = list()
    tokenizer = ByT5Tokenizer.from_pretrained(finetuner_model.base_model_id())
    index = 0
    for model_version in tqdm(os.listdir(f"{PROJECT_ROOT_DIR}/outputs/models/{finetuner_model.__str__()}")):
        the_epoch = model_version.split("-")[1]

        finetuner_model.output_dir = f"{PROJECT_ROOT_DIR}/outputs/models/{finetuner_model.__str__()}/{model_version}"
        model = ModelWrapper(finetuner_model, cuda_device=index)
        print(model.the_model.device)

        os.makedirs(os.path.dirname(f"{OUTPUTS_DIR}/validation_data/{finetuner_model.__str__()}/{model_version}"), exist_ok=True)
        result_file_path = f"{OUTPUTS_DIR}/validation_data/{finetuner_model.__str__()}/{finetuner_model.__str__()}_epoch-{the_epoch}_{validation_type}.jsonl"
        for batch in test_set:
            args.append((model, tokenizer, batch, result_file_path, validation_type))
        index = index + 1
        if index == 8:
            index = 0

    validator = ValidatorWrapper()

    with mp.Pool(processes=16) as pool:
        list(pool.map(validator.validate_wrapper, args))


if __name__ == '__main__':
    mp.set_start_method('spawn', force=True)
    main()
