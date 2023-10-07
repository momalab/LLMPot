import sys
import traceback
import numpy as np
import pandas as pd
from result import Result
from simplet5 import SimpleT5
from typing import Optional, TextIO
from transformers import ByT5Tokenizer 
from mbtcp_validator import Validator

#1: byt5, 2:byt5-small, 3:finetuned_model, 4:test_set, 5:0 no context 1 with context

def validate(model: SimpleT5, result_file: TextIO, test_set: []):
    to_save: Result = Optional[Result]
    for i in range(len(test_set)):
        try:
            query = test_set['request'][i]
            expected_response = test_set['response'][i]
            wireshark_index = test_set['wireshark_index'][i]

            if "|" in query:
                question = query[query.rindex("|")+1:len(query)-1]
                context = query[:query.rindex("|")]
                inputs = model.tokenizer(question=question,context=context, return_tensors="pt")
                output = tokenizer.decode(inputs['input_ids'][0]) #inputs['attention_mask']
                predicted_response = model.predict(output) #top_p = 0.1
            else:
                predicted_response = model.predict(query)[0]

            validation = Validator(question, predicted_response)
            validation.check_header_IDs()
            validation.check_payload()
            # query_header, query_payload, response_header, response_payload = packet_chunks(question, predicted_response)
            # check_header_IDs(query_header, response_header, query_payload)
            # check_payload(query_payload, response_payload)

            to_save = Result() 
            to_save.index = i
            to_save.wireshark_index = wireshark_index
            to_save.request = query
            to_save.response = predicted_response
            to_save.valid = True

        except Exception as exception: 
            to_save.valid = False
            to_save.test_set_response = expected_response
            to_save.exception = exception
            to_save.traceback = traceback.format_exc()
        finally:
            result_file.write(json.dumps(to_save.__dict__) + "\n")
    
def main():

    model = SimpleT5()
    model.load_model(f"{sys.argv[1]}", f"../models/{sys.argv[3]}", use_gpu=True) #model name format: byt5-small_dataset_5epcohs_32precision.csv
    tokenizer = ByT5Tokenizer.from_pretrained(f"google/{sys.argv[2]}")
    test_set = pd.read_csv(f"../datasets/test/{sys.argv[4]}")

    with open(f"./data/{sys.argv[3]}.jsonl", "a") as results_file:
        validate(model, results_file, test_set)
    
if __name__ == '__main__':
    main()