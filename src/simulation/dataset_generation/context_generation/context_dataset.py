import pandas as pd
import numpy as np

dataset = pd.read_csv("/home/dam10098/ICSPot/parsed_datasets/wago_context.csv")

request_data = ""
response_data = ""
request = []
response = []
# request_data = []
# response_data = []

for i in range(len(dataset)):
    if i == 0:
        # request_data.append([dataset['source_text'][i], 'end/', ' ', 'end/', ' ', 'end/', ' ', 'end/', ' ']) #</s>
        # response_data.append([dataset['target_text'][i]])
        request_data  = f"{dataset['source_text'][i]}" 
        response_data = f"{dataset['target_text'][i]}"
        request.append(request_data)
        response.append(response_data)

    elif i == 1:
        # request_data.append([dataset['source_text'][i-1], 'end/', dataset['target_text'][i-1], 'end/', dataset['source_text'][i], 'end/', ' ', 'end/', ' '])
        # response_data.append([dataset['target_text'][i]])
        request_data  = f"{dataset['source_text'][i-1]}{','}{dataset['target_text'][i-1]}{','}{dataset['source_text'][i]}" 
        response_data = f"{dataset['target_text'][i]}"
        request.append(request_data)
        response.append(response_data)


    elif i >= 2:
        # request_data.append([dataset['source_text'][i-2], 'end/', dataset['target_text'][i-2], 'end/', dataset['source_text'][i-1], 'end/', dataset['target_text'][i-1], 'end/', dataset['source_text'][i]])
        # response_data.append([dataset['target_text'][i]])
        request_data  = f"{dataset['source_text'][i-2]}{','}{dataset['target_text'][i-2]}{','}{dataset['source_text'][i-1]}{','}{dataset['target_text'][i-1]}{','}{dataset['source_text'][i]}" 
        response_data = f"{dataset['target_text'][i]}"
        request.append(request_data)
        response.append(response_data)

# df = pd.DataFrame(list(zip(request_data,response_data)),columns =['source_text','target_text'])
# df.to_csv('context_dataset_1.csv')

df = pd.DataFrame(list(zip(request,response)),columns =['source_text','target_text'])
df.to_csv('/home/dam10098/ICSPot/parsed_datasets/wago_context_X.csv')