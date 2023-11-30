import argparse
import pandas as pd
from simplet5 import SimpleT5
from transformers import ByT5Tokenizer

from cfg import OUTPUTS_DIR, PROJECT_ROOT_DIR


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-mt', default="byt5", required=False)
    parser.add_argument('-mnf', required=True)
    parser.add_argument('-ts', required=True)
    parser.add_argument('-g', default="False", required=False)
    args = parser.parse_args()

    model_type = args.mt
    finetuned_model_name = args.mnf
    test_set_name = args.ts
    use_gpu = eval(args.g)

    test_set = pd.read_csv(f"{OUTPUTS_DIR}/datasets/test/{test_set_name}.csv")
    test_set = test_set.rename(columns={'source_text': 'request', 'target_text': 'response'})
    
    model = SimpleT5()
    model.load_model(f"{model_type}", f"{PROJECT_ROOT_DIR}/models/{finetuned_model_name}", use_gpu=use_gpu)
    tokenizer = ByT5Tokenizer.from_pretrained(f"{PROJECT_ROOT_DIR}/models/{finetuned_model_name}")

    for i in range(1):
        request = test_set['request'][i]
        expected_response = test_set['response'][i]

        question = request[request.rindex(" Request 3:"):request.rindex("Reponse 3:") -1]
        print(f"Q:{question}")
        question = request[request.rindex("Request 3:") - 1:request.rindex("Reponse 3:")] 
        print(f"Q:{question}")
        question = question.rpartition("Request 3:")
        question = question[2]
        question = question.strip()
        print(f"Q:{question}")

        request = question
        if ":" in request:
            request = request[:-1]
        hex_chunks_query = [request[i:i + 2] for i in range(0, len(request), 2)]
        query_header = hex_chunks_query[:7]
        print(query_header)
        query_payload = hex_chunks_query[7:]
        print(query_payload)

        q_tid = query_header[:2]
        print(f"Q_TID:{q_tid}")

        # print(z)
        # print(q[len(q)])
        # inputs = model.tokenizer([(question, context)], return_tensors="pt")
        # output = tokenizer.decode(inputs['input_ids'][0])
        # response = model.predict(output)[0]
        # print(f"response: {response}")
        # print(f"expected_response: {expected_response}")
        # question = request[request.rindex("Request 3:") - 1:request.rindex("Reponse 3:")]
        # print(f"question: {question}")


if __name__ == '__main__':
    main()