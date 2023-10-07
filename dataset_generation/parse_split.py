import sys
import codecs
import pyshark
import pandas as pd
from tqdm import tqdm
from pyshark.packet.packet import Packet
from sklearn.model_selection import train_test_split

#1: tcdpdump.pcap file 2:protocol (mbtcp), 3: 0 no context 1 with context > produce context structure 

PCAP_PATH = f"../datasets/dumps/{sys.argv[1]}.pcap" 
DF_OUT_PATH = f"../datasets/parsed/{sys.argv[1]}.csv"
FORMAT = "str"
PORT = 502
CAPTURE_LAYER = f"{sys.argv[2]}" 
DISPLAY_FILTER = f"{sys.argv[2]}"

def encoding(line: str):
    if FORMAT == "hex":
        return codecs.decode(line, 'hex_codec')
    return line

cap = pyshark.FileCapture(PCAP_PATH,
                        use_json=True,
                        include_raw=True,
                        decode_as={f'tcp.port=={PORT}': f'{DISPLAY_FILTER}'},
                        )

dataset_dict = {"source_text": [], "target_text": []}
discard_queue = []
packet: Packet

for packet in tqdm(cap):

    if hasattr(packet, "modbus") and hasattr(packet.modbus, "request_frame"):
        request_idx = int(packet.modbus.request_frame)
        try:
            dataset_dict["source_text"].append(encoding(eval(f"cap[{request_idx - 1}].{CAPTURE_LAYER}_raw.value")))
            dataset_dict["target_text"].append(encoding(eval(f"packet.{CAPTURE_LAYER}_raw.value")))
        except KeyError as e:
            discard_queue.append(request_idx)
        except Exception as e:
            print(e)

print(f"Request packets discarded: {discard_queue}")

min_len = min(len(dataset_dict["source_text"]), len(dataset_dict["target_text"]))
dataset_dict["target_text"] = dataset_dict["target_text"][:min_len]
dataset_dict["source_text"] = dataset_dict["source_text"][:min_len]

pkt_df = pd.DataFrame(dataset_dict)
pkt_df.to_csv(DF_OUT_PATH)

if int(sys.argv[3]) == 0: #no context
    pkt_df = pkt_df

elif int(sys.argv[3]) == 1: #context structure
    dataset = pd.read_csv(f"../datasets/parsed/{sys.argv[1]}.csv")
    context = ""
    with open(f"../datasets/context/{sys.argv[1]}.csv", "a+") as wago_context: 
        wago_context.write("source_text,target_text\n")
        for i in range(0, len(pkt_df) - 2):
            wago_context.write(f"{dataset['source_text'][i]}:{dataset['target_text'][i]}|"
                            f"{dataset['source_text'][i + 1]}:{dataset['target_text'][i + 1]}|"
                            f"{dataset['source_text'][i + 2]}:,{dataset['target_text'][i + 2]}" + "\n")
    
    pkt_df = pd.read_csv(f"../datasets/context/{sys.argv[1]}.csv") 

#split into train, test, validation sets
train_df, val_test_df = train_test_split(pkt_df, test_size=0.2)
val_df, test_df = train_test_split(val_test_df, test_size=0.5)

train_df.to_csv(f"../datasets/train/{sys.argv[1]}.csv", index=True)
test_df.to_csv(f"../datasets/test/{sys.argv[1]}.csv", index=True)
val_df.to_csv(f"../datasets/validation/{sys.argv[1]}.csv", index=True)