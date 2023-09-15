import json

import pandas

with open("./data/client_results.jsonl") as client_file:
    data = [json.loads(line) for line in client_file]

df = pandas.DataFrame(data)
print(df)

valid = len(df.query('valid == True'))
invalid = len(df.query('valid == False'))

percentage = 100 * valid/(valid + invalid)

print(f"Valid: {valid}, invalid: {invalid}, percentage: {percentage}")

with open("./data/server_results.jsonl") as client_file:
    data = [json.loads(line) for line in client_file]

df = pandas.DataFrame(data)
print(df)

traceback = df['traceback'].isna().sum()

print(traceback)