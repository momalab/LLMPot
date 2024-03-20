import argparse

import pandas as pd
import pyshark
from pyshark.packet.packet import Packet
from tqdm import tqdm

from cfg import DATASET_PARSED, DATASET_DUMPS

SOURCE_TEXT = "source_text"
TARGET_TEXT = "target_text"


def parse_with_file(protocol: str, capture_layer: str, port: int, pcap: str, csv: str, context_length: int, enc_type: str = "str"):
    cap = pyshark.FileCapture(f"{DATASET_DUMPS}/{pcap}.pcap", use_json=True, include_raw=True,
                              display_filter=f'{protocol}',
                              decode_as={f'tcp.port=={port}': f'{capture_layer}'})
    __parse(protocol, port, cap, csv, context_length, enc_type)


def parse_without_file(protocol: str, port: int, cap, csv_filename: str, context_length: int, enc_type: str = "str"):
    __parse(protocol, port, cap, csv_filename, context_length, enc_type)


def __parse(protocol: str, port: int, cap, csv_filename: str, context_length: int, enc_type: str):
    dataset_dict = {SOURCE_TEXT: [], TARGET_TEXT: []}
    request_packets: {int: str} = dict()
    response_packets: {int: str} = dict()
    packet: Packet

    if protocol == "s7comm":
        eval_str = ["packet.tpkt_raw.value", "packet.cotp_raw.value", f"packet.{protocol}_raw.value"]
    else:
        eval_str = [f"packet.{protocol}_raw.value"]

    i = 0
    for packet in tqdm(cap):
        i += 1
        fragments = []
        for item in eval_str:
            fragments.append(eval(item))
        the_value = ''.join(fragments).__str__()

        if int(packet.tcp.dstport) == port:
            request_packets[int(packet.tcp.ack_raw[-1])] = the_value
        else:
            response_packets[int(packet.tcp.seq_raw[-1])] = the_value

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
    parser.add_argument('-pcap', default="lala", required=False)
    parser.add_argument('-csv', default="lala", required=False)
    parser.add_argument('-p', default="502", required=False)
    parser.add_argument('-layer', default="mbtcp", required=False)
    parser.add_argument('-pr', default="mbtcp", required=False)
    parser.add_argument('-clen', default=2, required=False)
    parser.add_argument('-f', default="str", required=False)
    args = parser.parse_args()

    pcap = args.pcap
    csv = args.csv
    port = int(args.p)
    capture_layer = args.layer
    protocol = args.pr
    context_length = int(args.clen)
    enc_type = args.f

    parse_with_file(protocol, capture_layer, port, pcap, csv, context_length, enc_type)


if __name__ == '__main__':
    main()
