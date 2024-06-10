import argparse
import asyncio
from typing import Dict

import os
import pandas as pd
import pyshark
from pyshark.packet.packet import Packet
from tqdm import tqdm

from cfg import DATASET_DUMPS, DATASET_PARSED

SOURCE_TEXT = "source_text"
TARGET_TEXT = "target_text"


def parse_with_file(protocol: str, capture_layer: str, port: int, pcap: str, csv: str, context_length: int, experiment: str):
    asyncio.set_event_loop(asyncio.new_event_loop())
    cap = pyshark.FileCapture(f"{DATASET_DUMPS}/{pcap}.pcap", use_json=True, include_raw=True,
                              display_filter=f'{protocol}',
                              decode_as={f'tcp.port=={port}': f'{capture_layer}'})
    __parse(protocol, port, cap, csv, context_length, experiment)


def parse_without_file(protocol: str, port: int, cap, csv_filename: str, context_length: int, experiment: str):
    __parse(protocol, port, cap, csv_filename, context_length, experiment)


def __parse(protocol: str, port: int, cap, csv_filename: str, context_length: int, experiment: str):
    dataset_dict = {SOURCE_TEXT: [], TARGET_TEXT: []}
    request_packets: Dict[int, str] = dict()
    response_packets: Dict[int, str] = dict()
    packet: Packet

    if protocol == "s7comm":
        eval_str = ["packet.tpkt_raw.value", "packet.cotp_raw.value", f"packet.{protocol}_raw.value"]
    else:
        eval_str = [f"packet.{protocol}_raw.value"]

    for packet in tqdm(cap):
        fragments = []
        for item in eval_str:
            fragments.append(eval(item))
        the_value = ''.join(fragments)

        if int(packet.tcp.dstport) == port:
            request_packets[int(packet.tcp.ack_raw[-1])] = the_value
        else:
            response_packets[int(packet.tcp.seq_raw[-1])] = the_value

    for tid, entry in tqdm(request_packets.items()):
        try:
            dataset_dict[TARGET_TEXT].append(response_packets[tid])
            dataset_dict[SOURCE_TEXT].append(entry)
        except:
            print(f"Ignored: {tid}")

    dataset_df = pd.DataFrame(dataset_dict)

    os.makedirs(f"{DATASET_PARSED}/{experiment}", exist_ok=True)
    if context_length > 0:
        with open(f"{DATASET_PARSED}/{experiment}/{csv_filename}.csv", "w") as csv_context:
            csv_context.write(f"{SOURCE_TEXT},{TARGET_TEXT}\n")
            for i in range(0, len(dataset_df) - context_length, context_length + 1):
                for j in range(0, context_length):
                    csv_context.write(f"{dataset_df[SOURCE_TEXT][i + j]}:{dataset_df[TARGET_TEXT][i + j]}|")
                csv_context.write(f"{dataset_df[SOURCE_TEXT][i + context_length]}:,{dataset_df[TARGET_TEXT][i + context_length]}")
                csv_context.write("\n")
    else:
        dataset_df.to_csv(f"{DATASET_PARSED}/{experiment}/{csv_filename}.csv", index=False)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-pcap', default="mbtcp-sigmoid-s3200", required=False)
    parser.add_argument('-csv', default="mbtcp-sigmoid-c1-s3200", required=False)
    parser.add_argument('-p', default="502", required=False) #10200
    parser.add_argument('-layer', default="mbtcp", required=False) #tpkt
    parser.add_argument('-pr', default="mbtcp", required=False) #s7comm
    parser.add_argument('-clen', default=1, required=False)
    parser.add_argument('-exp', default="mbtcp-diff-functions", required=False)
    args = parser.parse_args()

    pcap = args.pcap
    csv = args.csv
    port = int(args.p)
    capture_layer = args.layer
    protocol = args.pr
    context_length = int(args.clen)
    experiment = args.exp

    parse_with_file(protocol, capture_layer, port, pcap, csv, context_length, experiment)


if __name__ == '__main__':
    main()
