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


def parse(capture_layer: str, port: int, pcap: str, context_length: int, enc_type: str):
    cap = pyshark.FileCapture(f"{OUTPUTS_DIR}/datasets/dumps/{pcap}.pcap", use_json=True, include_raw=True,
                              display_filter=f'{capture_layer}')

    dataset_dict = {"source_text": [], "target_text": []}
    request_packets = dict()
    response_packets = dict()
    packet: Packet

    for packet in tqdm(cap):
        if int(packet.tcp.dstport) == port:
            request_packets[int(packet.tcp.ack)] = encoding(eval(f"packet.{capture_layer}_raw.value"), enc_type)
        else:
            response_packets[int(packet.tcp.seq)] = encoding(eval(f"packet.{capture_layer}_raw.value"), enc_type)

    for tid, entry in tqdm(request_packets.items()):
        dataset_dict["source_text"].append(entry)
        dataset_dict["target_text"].append(response_packets[tid])

    dataset_df = pd.DataFrame(dataset_dict)

    if context_length > 0:
        with open(f"{OUTPUTS_DIR}/datasets/parsed/{pcap}-lala.csv", "a+") as csv_context:
            csv_context.write("source_text,target_text\n")
            for i in range(0, len(dataset_df) - context_length):
                for j in range(0, context_length):
                    csv_context.write(f"{dataset_df['source_text'][i + j]}:{dataset_df['target_text'][i + j]}|")
                csv_context.write(f"{dataset_df['source_text'][i + context_length]}:,{dataset_df['target_text'][i + context_length]}")
                csv_context.write("\n")
    else:
        dataset_df.to_csv(f"{OUTPUTS_DIR}/datasets/parsed/{pcap}-lala.csv", index=False)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-pcap',required=True)
    parser.add_argument('-p', default="502", required=False)
    parser.add_argument('-pr', default="mbtcp", required=False)
    parser.add_argument('-clen', default=2, required=False)
    parser.add_argument('-f', default="str", required=False)
    args = parser.parse_args()

    pcap = args.pcap
    port = int(args.p)
    capture_layer = args.pr
    context_length = int(args.clen)
    enc_type = args.f

    parse(capture_layer, port, pcap, context_length, enc_type)


if __name__ == '__main__':
    main()
