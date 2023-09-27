import codecs

import pyshark
import pandas as pd
from pyshark.packet.packet import Packet
from tqdm import tqdm


PCAP_PATH = "../../pcap_captures/tcpdump_write.pcap"
DF_OUT_PATH = "../../parsed_datasets/tcpdump_write.csv"
# hex, str
FORMAT = "str"
PORT = 502
# tcp, mbtcp
CAPTURE_LAYER = "mbtcp"

# Display filter to only keep modbus and tcp traffic in between the PLC and the HMI
# display_filter = f"(modbus || tcp) && ((ip.src=={CLIENT_IP} && ip.dst=={PLC_IP}) || (ip.src=={PLC_IP} && ip.dst=={CLIENT_IP}))"
DISPLAY_FILTER = "mbtcp"


def encoding(line: str):
    if FORMAT == "hex":
        return codecs.decode(line, 'hex_codec')
    return line


cap = pyshark.FileCapture(PCAP_PATH,
                          use_json=True,
                          include_raw=True,
                          decode_as={f'tcp.port=={PORT}': f'{CAPTURE_LAYER}'},
                          # display_filter=f'{DISPLAY_FILTER}'
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

# Trim data frames
min_len = min(len(dataset_dict["source_text"]), len(dataset_dict["target_text"]))
dataset_dict["target_text"] = dataset_dict["target_text"][:min_len]
dataset_dict["source_text"] = dataset_dict["source_text"][:min_len]

pkt_df = pd.DataFrame(dataset_dict)
pkt_df.to_csv(DF_OUT_PATH)
