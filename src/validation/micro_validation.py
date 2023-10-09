import json
import sys
from typing import TextIO

import pandas as pd
from simplet5 import SimpleT5
from transformers import ByT5Tokenizer

from mbtcp_validator import Validator
from result import Result
from src.init import PROJECT_ROOT_DIR, OUTPUTS_DIR
from src.validation.mbtcp_validator_exception import MbtcpValidatorException


# 1: byt5, 2:google/byt5-small, 3:finetuned_model, 4:test_set, 5:0 no context 1 with context, 6:GPU bool

def validate(model: SimpleT5, result_file: TextIO, test_set: [], tokenizer: ByT5Tokenizer):
    for i in range(len(test_set)):
        to_save = Result()
        request = test_set['request'][i]
        expected_response = test_set['response'][i]
        try:
            if "|" in request:
                question = request[request.rindex("|")+1:len(request)-1]
                context = request[:request.rindex("|")]
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
            to_save.valid = True

        except MbtcpValidatorException as exception:
            to_save.valid = False
            to_save.test_set_response = expected_response
            to_save.traceback = exception
        finally:
            result_file.write(json.dumps(to_save.__dict__) + "\n")


def main():
    model = SimpleT5()
    model.load_model(f"{sys.argv[1]}", f"{PROJECT_ROOT_DIR}/models/{sys.argv[3]}",
                     use_gpu=bool(sys.argv[6]))
    tokenizer = ByT5Tokenizer.from_pretrained(f"{sys.argv[2]}")
    test_set = pd.read_csv(f"{OUTPUTS_DIR}/datasets/test/{sys.argv[4]}")

    with open(f"{OUTPUTS_DIR}/validation_data/{sys.argv[3]}.jsonl", "a") as results_file:
        validate(model, results_file, test_set, tokenizer)


if __name__ == '__main__':
    main()
