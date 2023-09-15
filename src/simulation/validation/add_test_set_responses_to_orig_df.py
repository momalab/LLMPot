import json

import pandas

with open("./data/client_results.jsonl") as client_file:
    data = [json.loads(line) for line in client_file]

df = pandas.DataFrame(data)

test_set = pandas.read_csv("test_set.csv")

val = []
for i in test_set.index:
    val.append(test_set['response'][i])

df["test_set_response"] = val

equal_predicted = len(df.query('response == test_set_response'))
print(f"Num of response equal with test set: {equal_predicted}")
