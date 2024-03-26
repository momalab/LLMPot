import argparse
import asyncio
import json
import time
from functools import partial
from multiprocessing import Process, Event

import pyshark
from pymodbus.server import StartTcpServer
from pyshark.packet.packet import Packet

from cfg import EXPERIMENTS
from dataset_generation.mbtcp.boundaries_client import BoundariesClient
from dataset_generation.mbtcp.no_logic_server import NoLogicServer
from dataset_generation.mbtcp.server import MbtcpServer
from dataset_generation.parse import parse_without_file
from dataset_generation.split import split
from finetune.model.finetuner_model import FinetunerModel


def capture_packets(interface: str, port: int, protocol: str, context_length: int, samples_num: int, output_filename: str) -> []:
    capture = pyshark.LiveCapture(interface=interface, display_filter=protocol, use_json=True, include_raw=True,
                                  decode_as={f'tcp.port=={port}': f'{protocol}'}
                                  )
    packets = []
    for packet in capture.sniff_continuously(packet_count=324*samples_num):
        packets.append(packet)

    capture.close()
    parse_without_file(protocol, port, packets, output_filename, context_length)
    split(output_filename)


def server(ip: str, port: int, server_inst: MbtcpServer):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    StartTcpServer(context=server_inst._context, address=(ip, port))
    loop.close()


async def main(ip: str, port: int, interface: str, experiment: str):
    with open(f"{EXPERIMENTS}/{experiment}", "r") as cfg:
        config = cfg.read()
        config = json.loads(config)
        finetuner_model = FinetunerModel(**config)
        finetuner_model.experiment = experiment

    for dataset in finetuner_model.datasets:
        fields = dataset.split("-")
        protocol = fields[0]
        context_length = int(fields[2].split("c")[1])
        samples_num = int(fields[3])

        capture_thread = Process(target=capture_packets, args=[interface, port, protocol, context_length, samples_num, dataset], daemon=True)
        capture_thread.start()

        server_inst = NoLogicServer(ip, port)
        server_thread = Process(target=server, args=[ip, port, server_inst], daemon=True)
        server_thread.start()
        time.sleep(2)

        update_thread = Process(target=server_inst._update_control_logic, daemon=True)
        update_thread.start()

        client = BoundariesClient(ip, port, samples_num, 2, 10, 2)
        client.start_client()

        capture_thread.join()

        update_thread.terminate()
        server_thread.terminate()

    exit(1)


def init():
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="localhost", required=False)
    parser.add_argument('-p', default=5020, required=False)
    parser.add_argument('-intrf', default="lo0", required=False)
    parser.add_argument('-exp', default="mbtcp-protocol-emulation.json", required=False)
    args = parser.parse_args()

    server_address = args.ip
    server_port = int(args.p)
    interface = args.intrf
    experiment = args.exp

    asyncio.run(main(ip=server_address, port=server_port, interface=interface, experiment=experiment))


if __name__ == '__main__':
    init()

