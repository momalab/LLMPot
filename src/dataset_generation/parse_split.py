import argparse
import codecs
import pyshark
import pandas as pd
from tqdm import tqdm
from pyshark.packet.packet import Packet
from sklearn.model_selection import train_test_split

from cfg import OUTPUTS_DIR


def encoding(line: str, enc_type: str):
    if enc_type == "hex":
        return codecs.decode(line, 'hex_codec')
    return line


def parse(capture_layer: str, port: int, pcap: str, context: bool, enc_type: str):
    cap = pyshark.FileCapture(f"{OUTPUTS_DIR}/datasets/dumps/{pcap}.pcap", use_json=True, include_raw=True,
                              decode_as={f'tcp.port=={port}': f'{capture_layer}'})

    dataset_dict = {"source_text": [], "target_text": []}
    discard_queue = []
    packet: Packet

    for packet in tqdm(cap):

        if hasattr(packet, "modbus") and hasattr(packet.modbus, "request_frame"):
            request_idx = int(packet.modbus.request_frame)
            try:
                dataset_dict["source_text"].append(
                    encoding(eval(f"cap[{request_idx - 1}].{capture_layer}_raw.value"), enc_type))
                dataset_dict["target_text"].append(
                    encoding(eval(f"packet.{capture_layer}_raw.value"), enc_type))
            except KeyError as e:
                discard_queue.append(request_idx)
            except Exception as e:
                print(e)
                exit(0)

    print(f"Request packets discarded: {discard_queue}")

    min_len = min(len(dataset_dict["source_text"]), len(dataset_dict["target_text"]))
    dataset_dict["target_text"] = dataset_dict["target_text"][:min_len]
    dataset_dict["source_text"] = dataset_dict["source_text"][:min_len]

    dataset_df = pd.DataFrame(dataset_dict)
    dataset_df.to_csv(f"{OUTPUTS_DIR}/datasets/parsed/{pcap}.csv")

    if context:
        with open(f"{OUTPUTS_DIR}/datasets/context/{pcap}.csv", "a+") as csv_context:
            csv_context.write("source_text,target_text\n")
            for i in range(0, len(dataset_df) - 2):
                csv_context.write(f"{dataset_df['source_text'][i]}:{dataset_df['target_text'][i]}|"
                                  f"{dataset_df['source_text'][i + 1]}:{dataset_df['target_text'][i + 1]}|"
                                  f"{dataset_df['source_text'][i + 2]}:{dataset_df['target_text'][i + 2]}" + "\n")

        result_df = pd.read_csv(f"{OUTPUTS_DIR}/datasets/context/{pcap}.csv")
    else:
        result_df = pd.read_csv(f"{OUTPUTS_DIR}/datasets/parsed/{pcap}.csv")

    train_df, val_test_df = train_test_split(result_df, test_size=0.2)
    val_df, test_df = train_test_split(val_test_df, test_size=0.5)

    train_df.to_csv(f"{OUTPUTS_DIR}/datasets/train/{pcap}.csv", index=True)
    test_df.to_csv(f"{OUTPUTS_DIR}/datasets/test/{pcap}.csv", index=True)
    val_df.to_csv(f"{OUTPUTS_DIR}/datasets/validation/{pcap}.csv", index=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-pcap', required=True)
    parser.add_argument('-p', default="502", required=False)
    parser.add_argument('-pr', default="mbtcp", required=False)
    parser.add_argument('-c', default=False, required=False)
    parser.add_argument('-f', default="str", required=False)
    args = parser.parse_args()

    pcap = args.pcap
    port = args.p
    capture_layer = args.pr
    context = args.c
    enc_type = args.f

    parse(capture_layer, port, pcap, context, enc_type)


if __name__ == '__main__':
    main()
