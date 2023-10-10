import argparse
import pandas as pd
from simplet5 import SimpleT5
from transformers import ByT5Tokenizer

from src.init import PROJECT_ROOT_DIR, OUTPUTS_DIR


def validate(model: SimpleT5, tokenizer: ByT5Tokenizer, test_set: pd.DataFrame, finetuned_model_name: str):
    counter_invalid = 0
    counter_valid = 0
    counter =[]

    for i in range(len(test_set)):
        request = test_set['request'][i]
        expected_response = test_set['response'][i]

        if "|" in request:
            question = request[request.rindex("|")+1:len(request)-1]
            context = request[:request.rindex("|")]
            inputs = model.tokenizer([question],[context], return_tensors="pt")
            output = tokenizer.decode(inputs['input_ids'][0])
            predicted_response = model.predict(output)
        else:
            predicted_response = model.predict(request)[0]

        if predicted_response == expected_response:
            counter_valid += 1
        else:
            counter_invalid += 1

        counter.append([counter_invalid, counter_valid])
    counters = pd.DataFrame(counter[-1][:], columns=['Invalid', 'Valid'])
    counters.to_csv(f'./data/counter/{finetuned_model_name}.csv', index=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-mt', default="byt5", required=False)
    parser.add_argument('-mp', default="google", required=False)
    parser.add_argument('-mn', default="byt5-small", required=False)
    parser.add_argument('-mnf', required=True)
    parser.add_argument('-ts', required=True)
    parser.add_argument('-g', default=True, required=False)
    args = parser.parse_args()

    model_type = args.mt
    model_path = args.mp
    model_name = args.mn
    finetuned_model_name = args.mnf
    test_set_name = args.ts
    use_gpu = bool(args.g)

    model = SimpleT5()
    model.load_model(f"{model_type}", f"{PROJECT_ROOT_DIR}/models/{finetuned_model_name}", use_gpu=use_gpu)
    tokenizer = ByT5Tokenizer.from_pretrained(f"{model_path}/{model_name}")
    test_set = pd.read_csv(f"{OUTPUTS_DIR}/datasets/test/{test_set_name}.csv")
    test_set = test_set.rename(columns={'source_text': 'request', 'target_text': 'response'})

    validate(model, tokenizer, test_set, finetuned_model_name)


if __name__ == '__main__':
    main()
