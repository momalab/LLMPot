import argparse
import json
from typing import TextIO

import pandas as pd
from simplet5 import SimpleT5
from transformers import ByT5Tokenizer

from cfg import OUTPUTS_DIR, PROJECT_ROOT_DIR
from mbtcp_validator import Validator
from model.result import Result


def validate(model: SimpleT5, tokenizer: ByT5Tokenizer, test_set: [], result_file: TextIO, validation_type: str):
    for i in range(len(test_set)):
        to_save = Result()
        context = ""
        request = test_set['request'][i]
        response = ""
        expected_response = test_set['response'][i]
        try:
            if "|" in request:
                question = request[request.rindex("|") + 1:len(request) - 1]
                context = request[:request.rindex("|")]
                inputs = model.tokenizer(question=question, context=context, return_tensors="pt")
                output = tokenizer.decode(inputs['input_ids'][0])
                response = model.predict(output)
            else:
                question = request
                response = model.predict(question)[0]

            validate_choice(validation_type, question, response, expected_response)

            to_save.valid = True
        except ValueError as exception:
            to_save.valid = False
            to_save.error = exception.__str__()
        finally:
            to_save.index = i
            to_save.context = context
            to_save.request = request
            to_save.response = response
            to_save.expected_response = expected_response
            result_file.write(json.dumps(to_save.__dict__) + "\n")


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
    parser.add_argument('-mt', default="byt5", required=False)
    parser.add_argument('-mp', default="google", required=False)
    parser.add_argument('-mn', default="byt5-small", required=False)
    parser.add_argument('-mnf', required=True)
    parser.add_argument('-ts', required=True)
    parser.add_argument('-g', default="False", required=False)
    parser.add_argument('-val', default="micro", required=False)
    args = parser.parse_args()

    model_type = args.mt
    model_path = args.mp
    model_name = args.mn
    finetuned_model_name = args.mnf
    test_set_name = args.ts
    use_gpu = eval(args.g)
    validation_type = args.val

    model = SimpleT5()
    model.load_model(f"{model_type}", f"{PROJECT_ROOT_DIR}/models/{finetuned_model_name}", use_gpu=use_gpu)
    tokenizer = ByT5Tokenizer.from_pretrained(f"{model_path}/{model_name}")
    test_set = pd.read_csv(f"{OUTPUTS_DIR}/datasets/test/{test_set_name}.csv")
    test_set = test_set.rename(columns={'source_text': 'request', 'target_text': 'response'})

    with open(f"{OUTPUTS_DIR}/validation_data/{finetuned_model_name}_{validation_type}.jsonl", "a") as result_file:
        validate(model, tokenizer, test_set, result_file, validation_type)


if __name__ == '__main__':
    main()
