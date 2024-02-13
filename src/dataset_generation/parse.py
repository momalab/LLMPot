import argparse
import codecs
import pyshark
import pandas as pd
from tqdm import tqdm
from pyshark.packet.packet import Packet

from cfg import OUTPUTS_DIR


def encoding(line: str, enc_type: str):
    if enc_type == "hex":
        return codecs.decode(line, 'hex_codec')
    return line


def parse(capture_layer: str, port: int, pcap: str, context: bool, context_length: int, enc_type: str):
    cap = pyshark.FileCapture(f"{OUTPUTS_DIR}/datasets/dumps/{pcap}.pcap", use_json=True, include_raw=True,
                              decode_as={f'tcp.port=={port}': f'{capture_layer}'})

    dataset_dict = {"source_text": [], "target_text": []}
    request_packets = dict()
    response_packets = dict()
    packet: Packet

    for packet in tqdm(cap):
        if hasattr(packet, "modbus"):
            if int(packet.tcp.dstport) == 502:
                request_packets[int(packet.mbtcp.trans_id, 16)] = encoding(eval(f"packet.{capture_layer}_raw.value"), enc_type)
            else:
                response_packets[int(packet.mbtcp.trans_id, 16)] = encoding(eval(f"packet.{capture_layer}_raw.value"), enc_type)

    for tid, entry in tqdm(request_packets.items()):
        dataset_dict["source_text"].append(entry)
        dataset_dict["target_text"].append(response_packets[tid])

    dataset_df = pd.DataFrame(dataset_dict)

    if context:
        with open(f"{OUTPUTS_DIR}/datasets/parsed/{pcap}.csv", "a+") as csv_context:
            csv_context.write("source_text,target_text\n")
            for i in range(0, len(dataset_df) - context_length):
                if context_length == 1:
                    csv_context.write(f"{dataset_df['source_text'][i]}:{dataset_df['target_text'][i]}|"
                                      f"{dataset_df['source_text'][i + 1]}:,{dataset_df['target_text'][i + 1]}" + "\n")
                if context_length == 2:
                    csv_context.write(f"{dataset_df['source_text'][i]}:{dataset_df['target_text'][i]}|"
                                      f"{dataset_df['source_text'][i + 1]}:{dataset_df['target_text'][i + 1]}|"
                                      f"{dataset_df['source_text'][i + 2]}:,{dataset_df['target_text'][i + 2]}" + "\n")
                if context_length == 3:
                    csv_context.write(f"{dataset_df['source_text'][i]}:{dataset_df['target_text'][i]}|"
                                      f"{dataset_df['source_text'][i + 1]}:{dataset_df['target_text'][i + 1]}|"
                                      f"{dataset_df['source_text'][i + 2]}:{dataset_df['target_text'][i + 2]}|"
                                      f"{dataset_df['source_text'][i + 3]}:,{dataset_df['target_text'][i + 3]}" + "\n")
                if context_length == 4:
                    csv_context.write(f"{dataset_df['source_text'][i]}:{dataset_df['target_text'][i]}|"
                                      f"{dataset_df['source_text'][i + 1]}:{dataset_df['target_text'][i + 1]}|"
                                      f"{dataset_df['source_text'][i + 2]}:{dataset_df['target_text'][i + 2]}|"
                                      f"{dataset_df['source_text'][i + 3]}:{dataset_df['target_text'][i + 3]}|"
                                      f"{dataset_df['source_text'][i + 4]}:,{dataset_df['target_text'][i + 4]}" + "\n")
                if context_length == 5:
                    csv_context.write(f"{dataset_df['source_text'][i]}:{dataset_df['target_text'][i]}|"
                                      f"{dataset_df['source_text'][i + 1]}:{dataset_df['target_text'][i + 1]}|"
                                      f"{dataset_df['source_text'][i + 2]}:{dataset_df['target_text'][i + 2]}|"
                                      f"{dataset_df['source_text'][i + 3]}:{dataset_df['target_text'][i + 3]}|"
                                      f"{dataset_df['source_text'][i + 4]}:{dataset_df['target_text'][i + 4]}|"
                                      f"{dataset_df['source_text'][i + 5]},{dataset_df['target_text'][i + 5]}" + "\n")
                if context_length == 6:
                    csv_context.write(f"{dataset_df['source_text'][i]}:{dataset_df['target_text'][i]}|"
                                      f"{dataset_df['source_text'][i + 1]}:{dataset_df['target_text'][i + 1]}|"
                                      f"{dataset_df['source_text'][i + 2]}:{dataset_df['target_text'][i + 2]}|"
                                      f"{dataset_df['source_text'][i + 3]}:{dataset_df['target_text'][i + 3]}|"
                                      f"{dataset_df['source_text'][i + 4]}:{dataset_df['target_text'][i + 4]}|"
                                      f"{dataset_df['source_text'][i + 5]}:{dataset_df['target_text'][i + 5]}|"
                                      f"{dataset_df['source_text'][i + 6]},{dataset_df['target_text'][i + 6]}" + "\n")
                if context_length == 7:
                    csv_context.write(f"{dataset_df['source_text'][i]}:{dataset_df['target_text'][i]}|"
                                      f"{dataset_df['source_text'][i + 1]}:{dataset_df['target_text'][i + 1]}|"
                                      f"{dataset_df['source_text'][i + 2]}:{dataset_df['target_text'][i + 2]}|"
                                      f"{dataset_df['source_text'][i + 3]}:{dataset_df['target_text'][i + 3]}|"
                                      f"{dataset_df['source_text'][i + 4]}:{dataset_df['target_text'][i + 4]}|"
                                      f"{dataset_df['source_text'][i + 5]}:{dataset_df['target_text'][i + 5]}|"
                                      f"{dataset_df['source_text'][i + 6]}:{dataset_df['target_text'][i + 6]}|"
                                      f"{dataset_df['source_text'][i + 7]},{dataset_df['target_text'][i + 7]}" + "\n")



                
    else:
        dataset_df.to_csv(f"{OUTPUTS_DIR}/datasets/parsed/{pcap}.csv", index=False)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-pcap',required=True)
    parser.add_argument('-p', default="502", required=False)
    parser.add_argument('-pr', default="mbtcp", required=False)
    parser.add_argument('-c', default="False", required=False)
    parser.add_argument('-clen', default=2, required=False)
    parser.add_argument('-f', default="str", required=False)
    args = parser.parse_args()

    pcap = args.pcap
    port = args.p
    capture_layer = args.pr
    context = eval(args.c)
    context_length = int(args.clen)
    enc_type = args.f

    parse(capture_layer, port, pcap, context, context_length, enc_type)


if __name__ == '__main__':
    main()
