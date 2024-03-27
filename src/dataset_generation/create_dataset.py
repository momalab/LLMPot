import argparse
import asyncio
import importlib
import json
import os
import time
from multiprocessing import Process

import pyshark
from pymodbus.server import StartTcpServer

from cfg import EXPERIMENTS, DATASET_PARSED
from dataset_generation.mbtcp.server import MbtcpServer
from dataset_generation.parse import parse_without_file
from dataset_generation.split import split
from finetune.model.finetuner_model import FinetunerModel


def capture_packets(interface: str, port: int, protocol: str, context_length: int, samples_num: int, output_filename: str, set_size: int) -> []:
    capture = pyshark.LiveCapture(interface=interface, display_filter=protocol, use_json=True, include_raw=True,
                                  decode_as={f'tcp.port=={port}': f'{protocol}'}
                                  )
    packets = []
    for packet in capture.sniff_continuously(packet_count=set_size*samples_num):
        packets.append(packet)

    capture.close()
    parse_without_file(protocol, port, packets, output_filename, context_length)
    split(output_filename)


def server(ip: str, port: int, server_inst: MbtcpServer):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    StartTcpServer(context=server_inst._context, address=(ip, port))
    loop.close()


async def main(ip: str, port: int, interface: str, experiment: str, server_file: str, client_file: str, client_args: str, overwrite: bool = False):
    with open(f"{EXPERIMENTS}/{experiment}", "r") as cfg:
        config = cfg.read()
        config = json.loads(config)
        finetuner_model = FinetunerModel(**config)
        finetuner_model.experiment = experiment

    server_class = ''.join(word.title() for word in server_file.split('_'))
    client_class = ''.join(word.title() for word in client_file.split('_'))
    ServerClass = getattr(importlib.import_module(f"dataset_generation.mbtcp.{server_file}"), server_class)
    ClientClass = getattr(importlib.import_module(f"dataset_generation.mbtcp.{client_file}"), client_class)

    server_inst = ServerClass(ip, port)

    for dataset in finetuner_model.datasets:
        if os.path.exists(f"{DATASET_PARSED}/{dataset}.csv") and overwrite is False:
            print(f'Experiment {dataset} already exists. Skipping...')
            continue
        fields = dataset.split("-")
        protocol = fields[0]
        context_length = int(fields[2].split("c")[1])
        samples_num = int(fields[3])

        client_inst = ClientClass(ip, port, samples_num, *client_args)
        client_inst.dry_run = True
        set_size = client_inst.start_client()
        client_inst.dry_run = False

        capture_thread = Process(target=capture_packets, args=[interface, port, protocol, context_length, samples_num, dataset, set_size], daemon=True)
        capture_thread.start()

        server_thread = Process(target=server, args=[ip, port, server_inst], daemon=True)
        server_thread.start()
        time.sleep(2)

        update_thread = Process(target=server_inst._update_control_logic, daemon=True)
        update_thread.start()

        client_inst.start_client()

        capture_thread.join()

        update_thread.terminate()
        server_thread.terminate()

    exit(1)


def init():
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="localhost", type=str, required=False)
    parser.add_argument('-p', default=5020, type=int, required=False)
    parser.add_argument('-intrf', default="lo0", type=str, required=False)
    parser.add_argument('-exp', default="mbtcp-protocol-emulation.json", type=str, required=False)
    parser.add_argument('-server', default="no_logic_server", type=str, required=False)
    parser.add_argument('-client', default="boundaries_client", type=str, required=False)
    parser.add_argument('-c_args', nargs="*", default=[2, 10, 2], required=False)
    parser.add_argument('-o', default=True, type=bool, required=False)
    args = parser.parse_args()

    server_address = args.ip
    server_port = args.p
    interface = args.intrf
    experiment = args.exp
    server_file = args.server
    client_file = args.client
    c_args = args.c_args

    asyncio.run(main(ip=server_address, port=server_port, interface=interface, experiment=experiment,
                     server_file=server_file, client_file=client_file, client_args=c_args, overwrite=args.o))


if __name__ == '__main__':
    init()

