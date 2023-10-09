import sys
import json
import pandas

#1: jsonl file name, remember both server and client jsonl file have same name as the finetuned_model name

with open(f"./data/jsonl/{sys.argv[1]}.jsonl") as client_file:
    data = [json.loads(line) for line in client_file]

df = pandas.DataFrame(data)
print(df)

valid = len(df.query('valid == True'))
invalid = len(df.query('valid == False'))
percentage = 100 * valid/(valid + invalid)
print(f"Valid: {valid}, invalid: {invalid}, percentage: {percentage}")

with open(f"./data/jsonl/{sys.argv[1]}.jsonl") as client_file:
    data = [json.loads(line) for line in client_file]

df = pandas.DataFrame(data)
print(df)

traceback = df['traceback'].isna().sum()
print(traceback)