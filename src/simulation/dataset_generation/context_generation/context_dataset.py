import pandas as pd

dataset = pd.read_csv("../../../../parsed_datasets/wago_context.csv")

context = ""
with open("./tmp.csv", "a+") as wago_context:
    wago_context.write("source_text,target_text\n")
    for i in range(0, len(dataset) - 2):
        wago_context.write(f"{dataset['source_text'][i]}:{dataset['target_text'][i]}|"
                           f"{dataset['source_text'][i + 1]}:{dataset['target_text'][i + 1]}|"
                           f"{dataset['source_text'][i + 2]}:,{dataset['target_text'][i + 2]}" + "\n")
