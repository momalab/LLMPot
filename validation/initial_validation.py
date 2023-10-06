import sys
import pandas as pd
from simplet5 import SimpleT5
from transformers import ByT5Tokenizer 

#1: byt5, 2:byt5-small, 3:finetuned_model name, 4:test_set

model = SimpleT5()
model.load_model(f"{sys.argv[1]}", f"../models/{sys.argv[3]}", use_gpu=True) #model name format: byt5-small_dataset_5epcohs_32precision.csv
tokenizer = ByT5Tokenizer.from_pretrained(f"google/{sys.argv[2]}")
test_set = pd.read_csv(f"../datasets/test/{sys.argv[4]}.csv") 
test_set = pd.rename(columns={'source_text':'request', 'target_text':'response'})

counter_invalid = 0
counter_valid = 0
counter =[]

for i in range(len(test_set)):    
    query = test_set['request'][i]
    expected_response = test_set['response'][i]

    if "|" in query:

        question = query[query.rindex("|")+1:len(query)-1]
        context = query[:query.rindex("|")]
        inputs = model.tokenizer([question],[context], return_tensors="pt")
        output = tokenizer.decode(inputs['input_ids'][0])
        predicted_response = model.predict(output) 

    else:
        predicted_response = model.predict(query)[0] 

    if predicted_response == expected_response:
        counter_valid +=1
        print(f"valid: {counter_valid}")
    else:
        counter_invalid +=1
        print(f"invalid: {counter_invalid}")

    counter.append([counter_invalid, counter_valid])
counters = pd.DataFrame(counter[-1][:], columns=['Invalid', 'Valid'])
counters.to_csv(f'./data/counter/{sys.argv[3]}.csv', index=True)