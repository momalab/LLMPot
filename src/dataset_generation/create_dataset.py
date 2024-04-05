import argparse
import asyncio
import importlib
import json
import os
import threading
import time
from multiprocessing import Process

import pyshark
from pymodbus.server import StartTcpServer
from snap7.server import Server

from cfg import EXPERIMENTS, DATASET_PARSED
from dataset_generation.mbtcp.client import MbtcpClient
from dataset_generation.mbtcp.server import MbtcpServer
from dataset_generation.s7comm.client import S7Client
from dataset_generation.s7comm.server import S7Comm
from dataset_generation.parse import parse_without_file
from dataset_generation.split import split
from finetune.model.finetuner_model import FinetunerModel

packets = []


def append_to_list(packet):
    if hasattr(packet, 'tpkt_raw'):
        packets.append(packet)


def capture_packets(interface: str, port: int, protocol: str, context_length: int, output_filename: str, samples_num: int) -> []:
    capture = pyshark.LiveCapture(interface=interface, use_json=True, include_raw=True)

    capture.apply_on_packets(callback=append_to_list, packet_count=(4 * samples_num) + 2)

    capture.close()
    parse_without_file(protocol, port, packets, output_filename, context_length)
    split(output_filename)


def server(ip: str, port: int, server_inst: MbtcpServer):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    StartTcpServer(context=server_inst._context, address=(ip, port))


async def main(ip: str, port: int, interface: str, experiment: str, overwrite: bool = False):
    with open(f"{EXPERIMENTS}/{experiment}", "r") as cfg:
        config = cfg.read()
        config = json.loads(config)
        finetuner_model = FinetunerModel(**config)
        finetuner_model.experiment = experiment

    for dataset in finetuner_model.datasets:
        print(f'Experiment {dataset} running...')
        finetuner_model.current_dataset = dataset
        server_class = ''.join(word.title() for word in finetuner_model.current_dataset.server.name.split('_'))
        client_class = ''.join(word.title() for word in finetuner_model.current_dataset.client.split('_'))

        ServerClass = getattr(importlib.import_module(f"dataset_generation.{finetuner_model.current_dataset.protocol}.{finetuner_model.current_dataset.server.name}"), server_class)
        ClientClass = getattr(importlib.import_module(f"dataset_generation.{finetuner_model.current_dataset.protocol}.{finetuner_model.current_dataset.client}"), client_class)

        if os.path.exists(f"{DATASET_PARSED}/{dataset}.csv") and overwrite is False:
            print(f'Experiment {dataset} already exists. Skipping...')
            continue

        # server_inst = ServerClass(ip, port, finetuner_model.current_dataset.server.coils, finetuner_model.current_dataset.server.registers)
        server_inst = ServerClass(ip, port, finetuner_model.current_dataset.server.markers, finetuner_model.current_dataset.server.datablock)

        client_inst: MbtcpClient = ClientClass(ip, port,
                                               finetuner_model.current_dataset.size,
                                               finetuner_model.current_dataset.functions,
                                               finetuner_model.current_dataset.addresses,
                                               finetuner_model.current_dataset.values,
                                               finetuner_model.current_dataset.multi_elements)
        client_inst.start_client()

        capture_thread = Process(target=capture_packets, args=[interface, port,
                                                               finetuner_model.current_dataset.protocol,
                                                               finetuner_model.current_dataset.context,
                                                               dataset.__str__(),
                                                               finetuner_model.current_dataset.size], daemon=True)
        capture_thread.start()

        server_thread = Process(target=server, args=[ip, port, server_inst], daemon=True)
        server_thread.start()
        time.sleep(2)

        update_thread = Process(target=server_inst._update_control_logic, daemon=True)
        update_thread.start()

        thread = threading.Thread(target=client_inst.execute_functions, daemon=True)
        thread.start()
        thread.join()

        capture_thread.join()

        update_thread.terminate()
        update_thread.join()
        server_thread.terminate()
        server_thread.join()

    exit(1)


def init():
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="localhost", type=str, required=False)
    parser.add_argument('-p', default=10200, type=int, required=False)
    parser.add_argument('-intrf', default="lo", type=str, required=False)
    parser.add_argument('-exp', default="s7comm-protocol-test.json", type=str, required=False)
    parser.add_argument('-o', default=True, type=bool, required=False)
    args = parser.parse_args()

    server_address = args.ip
    server_port = args.p
    interface = args.intrf
    experiment = args.exp

    asyncio.run(main(ip=server_address, port=server_port, interface=interface, experiment=experiment, overwrite=args.o))


if __name__ == '__main__':
    init()
