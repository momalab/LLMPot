import pandas as pd

test_set = pd.read_csv("/home/dunia/ICSPot/src/simulation/validation/test_set.csv")
#print(test_set)

#Add another feature for the context to append 3 previous queries and responses 
#use sliding window to make sure there is an overlap
df = []
for i in range(10):
    df.append([test_set['request'][i], test_set['response'][i]])

df_l = pd.DataFrame(df, columns=['request', 'response'])
print(df_l['request'][0])

new_dataset = pd.DataFrame()
context_list = []
count = 0

context_len = 3
for i in range(10):
    print(f"i: {i}")
    df_l['request'][i] = test_set['request'][i] 
    df_l['response'][i] = test_set['response'][i]
    if i == 1:
        df_l['request'][i] = [test_set['request'][i-1], 'end/', test_set['response'][i-1], 'end/', test_set['request'][i]]
        df_l['response'][i] = test_set['response'][i]
    if i == 2:
        df_l['request'][i] = [test_set['request'][i-2], 'end/', test_set['response'][i-2], 'end/', test_set['request'][i-1], 'end/', test_set['response'][i-1], 'end/', test_set['request'][i]]
        df_l['response'][i] = test_set['response'][i]

        break
print(df_l['request'][1])

print(df_l['request'][2])

print(df_l['request'][3])


# print(len(context_list))


#context_feature = pd.DataFrame(context_list, columns = ['context_query', 'context_response'])
#context_feature['context'] = context_feature['context_query'] + context_feature['context_response']

#final_dataset = pd.concat([test_set, context_feature], axis=1)