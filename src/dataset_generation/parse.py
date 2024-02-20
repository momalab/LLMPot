import argparse
import codecs
import pyshark
import pandas as pd
from tqdm import tqdm
from pyshark.packet.packet import Packet

from cfg import DATASET_PARSED, DATASET_DUMPS

SOURCE_TEXT = "source_text"
TARGET_TEXT = "target_text"


def encoding(line: str, enc_type: str):
    if enc_type == "hex":
        return codecs.decode(line, 'hex_codec')
    return line


def parse_with_file(capture_layer: str, port: int, pcap: str, csv: str, context_length: int, enc_type: str = "str"):
    cap = pyshark.FileCapture(f"{DATASET_DUMPS}/{pcap}.pcap", use_json=True, include_raw=True,
                              display_filter=f'{capture_layer}',
                              decode_as={f'tcp.port=={port}': f'{capture_layer}'})
    __parse(capture_layer, port, cap, csv, context_length, enc_type)


def parse_without_file(capture_layer: str, port: int, cap, csv_filename: str, context_length: int, enc_type: str = "str"):
    __parse(capture_layer, port, cap, csv_filename, context_length, enc_type)


def __parse(capture_layer: str, port: int, cap, csv_filename: str, context_length: int, enc_type: str):
    dataset_dict = {SOURCE_TEXT: [], TARGET_TEXT: []}
    request_packets = dict()
    response_packets = dict()
    packet: Packet

    for packet in tqdm(cap):
        if int(packet.tcp.dstport) == port:
            request_packets[int(packet.tcp.ack)] = encoding(eval(f"packet.{capture_layer}_raw.value"), enc_type)
        else:
            response_packets[int(packet.tcp.seq)] = encoding(eval(f"packet.{capture_layer}_raw.value"), enc_type)

    for tid, entry in tqdm(request_packets.items()):
        dataset_dict[SOURCE_TEXT].append(entry)
        dataset_dict[TARGET_TEXT].append(response_packets[tid])

    dataset_df = pd.DataFrame(dataset_dict)

    if context_length > 0:
        with open(f"{DATASET_PARSED}/{csv_filename}.csv", "a+") as csv_context:
            csv_context.write(f"{SOURCE_TEXT},{TARGET_TEXT}\n")
            for i in range(0, len(dataset_df) - context_length):
                for j in range(0, context_length):
                    csv_context.write(f"{dataset_df[SOURCE_TEXT][i + j]}:{dataset_df[TARGET_TEXT][i + j]}|")
                csv_context.write(f"{dataset_df[SOURCE_TEXT][i + context_length]}:,{dataset_df[TARGET_TEXT][i + context_length]}")
                csv_context.write("\n")
    else:
        dataset_df.to_csv(f"{DATASET_PARSED}/{csv_filename}.csv", index=False)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-pcap', default="lala", required=True)
    parser.add_argument('-csv', default="lala", required=True)
    parser.add_argument('-p', default="502", required=False)
    parser.add_argument('-pr', default="mbtcp", required=False)
    parser.add_argument('-clen', default=0, required=False)
    parser.add_argument('-f', default="str", required=False)
    args = parser.parse_args()

    pcap = args.pcap
    csv = args.csv
    port = int(args.p)
    capture_layer = args.pr
    context_length = int(args.clen)
    enc_type = args.f

    parse_with_file(capture_layer, port, pcap, csv, context_length, enc_type)


if __name__ == '__main__':
    main()
