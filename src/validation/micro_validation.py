import argparse
import json
import traceback
from typing import TextIO

import pandas as pd
from simplet5 import SimpleT5
from transformers import ByT5Tokenizer

from cfg import OUTPUTS_DIR, PROJECT_ROOT_DIR
from mbtcp_validator import Validator
from model.result import Result
from exception.mbtcp_validator_exception import MbtcpValidatorException


def validate(model: SimpleT5, tokenizer: ByT5Tokenizer, test_set: [], result_file: TextIO):
    for i in range(len(test_set)):
        to_save = Result()
        request = test_set['request'][i]
        expected_response = test_set['response'][i]
        try:
            if "|" in request:
                question = request[request.rindex("|") + 1:len(request) - 1]
                context = request[:request.rindex("|")]
                to_save.context = context
                inputs = model.tokenizer(question=question, context=context, return_tensors="pt")
                output = tokenizer.decode(inputs['input_ids'][0])
                predicted_response = model.predict(output)
            else:
                question = request
                predicted_response = model.predict(question)[0]

            validation = Validator(question, predicted_response)
            validation.check_header_ids()
            validation.check_payload()

            to_save.index = i
            to_save.request = request
            to_save.response = predicted_response
            to_save.expected_response = expected_response
            to_save.valid = True

        except MbtcpValidatorException as exception:
            to_save.valid = False
            to_save.error = exception
        finally:
            result_file.write(json.dumps(to_save.__dict__) + "\n")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-mt', default="byt5", required=False)
    parser.add_argument('-mp', default="google", required=False)
    parser.add_argument('-mn', default="byt5-small", required=False)
    parser.add_argument('-mnf', required=True)
    parser.add_argument('-ts', required=True)
    parser.add_argument('-g', default="True", required=False)
    args = parser.parse_args()

    model_type = args.mt
    model_path = args.mp
    model_name = args.mn
    finetuned_model_name = args.mnf
    test_set_name = args.ts
    use_gpu = args.g

    model = SimpleT5()
    model.load_model(f"{model_type}", f"{PROJECT_ROOT_DIR}/models/{finetuned_model_name}", use_gpu=use_gpu)
    tokenizer = ByT5Tokenizer.from_pretrained(f"{model_path}/{model_name}")
    test_set = pd.read_csv(f"{OUTPUTS_DIR}/datasets/test/{test_set_name}.csv")
    test_set = test_set.rename(columns={'source_text': 'request', 'target_text': 'response'})

    with open(f"{OUTPUTS_DIR}/validation_data/{finetuned_model_name}.jsonl", "a") as result_file:
        validate(model, tokenizer, test_set, result_file)


if __name__ == '__main__':
    main()
