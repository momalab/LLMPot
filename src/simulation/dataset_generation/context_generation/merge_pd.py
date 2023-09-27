import pandas as pd

df_1 = pd.read_csv("/home/dam10098/ICSPot/parsed_datasets/wago_context_X.csv")
context_dataset = df_1[['source_text', 'target_text']]

df_2 = pd.read_csv("/home/dam10098/ICSPot/parsed_datasets/tcpdump_write.csv")
writeFC_dataset = df_2[['source_text', 'target_text']]

df_tot = pd.concat([context_dataset, writeFC_dataset], axis=0)
final_dataset = df_tot.reset_index(drop=True)
final_dataset.to_csv('/home/dam10098/ICSPot/parsed_datasets/wago_context_FC16.csv')