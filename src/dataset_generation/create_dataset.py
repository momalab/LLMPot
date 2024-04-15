import argparse
import asyncio
import importlib
import json
import os
import subprocess
import threading
import time
from multiprocessing import Process
from typing import Any

from pymodbus.server import StartTcpServer

from cfg import EXPERIMENTS, DATASET_PARSED, DATASET_DUMPS
from dataset_generation.mbtcp.server import MbtcpServer
from dataset_generation.parse import parse_with_file
from dataset_generation.split import split
from finetune.model.finetuner_model import FinetunerModel


def parse_packets(port: int, protocol: str, context_length: int, output_filename: str):
    if protocol == "s7comm":
        parse_with_file(protocol, "tpkt", port, "temp", output_filename, context_length)
    else:
        parse_with_file(protocol, protocol, port, "temp", output_filename, context_length)
    split(output_filename)


def server(ip: str, port: int, finetuner_model: FinetunerModel, args: Any, server_class: Any):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    args = getattr(finetuner_model, f"{finetuner_model.current_dataset.protocol}_args")
    server_inst = server_class(ip, port, *args)


async def main(ip: str, port: int, interface: str, experiment: str, overwrite: bool = False):
    try:
        with open(f"{EXPERIMENTS}/{experiment}", "r") as cfg:
            config = cfg.read()
            config = json.loads(config)
            finetuner_model = FinetunerModel(**config)
            finetuner_model.experiment = experiment

        for dataset in finetuner_model.datasets:
            print(f'Experiment {dataset} running...')

            if os.path.exists(f"{DATASET_PARSED}/{dataset}.csv") and overwrite is False:
                print(f'Experiment {dataset} already exists. Skipping...')
                continue
            elif overwrite:
                print(f'Experiment {dataset} already exists. Overwriting...')

            finetuner_model.current_dataset = dataset
            server_class_str = ''.join(word.title() for word in finetuner_model.current_dataset.server.name.split('_'))
            client_class_str = ''.join(word.title() for word in finetuner_model.current_dataset.client.split('_'))

            server_class = getattr(importlib.import_module(f"dataset_generation.{finetuner_model.current_dataset.protocol}.{finetuner_model.current_dataset.server.name}"), server_class_str)
            client_class = getattr(importlib.import_module(f"dataset_generation.{finetuner_model.current_dataset.protocol}.{finetuner_model.current_dataset.client}"), client_class_str)

            tcpdump_process = subprocess.Popen(["tcpdump", "-i", interface, "-w", f"{DATASET_DUMPS}/temp.pcap"])

            args = getattr(finetuner_model, f"{finetuner_model.current_dataset.protocol}_args")
            # server_inst = server_class(ip, port, *args)

            server_thread = None
            update_thread = None
            if finetuner_model.datasets[0].protocol == "mbtcp":
                server_thread = Process(target=server, args=[ip, port, finetuner_model, args, server_class], daemon=True)
                server_thread.start()

                update_thread = Process(target=server_inst._update_control_logic, daemon=True)
                update_thread.start()

            time.sleep(5)

            client_inst = client_class(ip, port,
                                       finetuner_model.current_dataset.size,
                                       finetuner_model.current_dataset.functions,
                                       finetuner_model.current_dataset.addresses,
                                       finetuner_model.current_dataset.values,
                                       finetuner_model.current_dataset.multi_elements)

            client_inst.start_client()
            thread = threading.Thread(target=client_inst.execute_functions, daemon=True)
            thread.start()
            thread.join()

            if finetuner_model.datasets[0].protocol == "mbtcp":
                update_thread.terminate()
                update_thread.join()

                server_thread.terminate()
                server_thread.join()

            time.sleep(1)

            tcpdump_process.terminate()
            tcpdump_process.wait()

            parse = Process(target=parse_packets, args=[port, finetuner_model.current_dataset.protocol, finetuner_model.current_dataset.context, dataset.__str__()])
            parse.start()

            parse.join()

            os.remove(f"{DATASET_DUMPS}/temp.pcap")
    finally:
        if os.path.exists(f"{DATASET_DUMPS}/temp.pcap"):
            os.remove(f"{DATASET_DUMPS}/temp.pcap")


def init():
    parser = argparse.ArgumentParser()
    parser.add_argument('-ip', default="127.0.0.1", type=str, required=False)
    parser.add_argument('-p', default=5020, type=int, required=False)
    parser.add_argument('-intrf', default="lo0", type=str, required=False)
    parser.add_argument('-exp', default="mbtcp-protocol-emulation.json", type=str, required=False)
    parser.add_argument('-o', default=True, type=bool, required=False)
    args = parser.parse_args()

    server_address = args.ip
    server_port = args.p
    interface = args.intrf
    experiment = args.exp

    asyncio.run(main(ip=server_address, port=server_port, interface=interface, experiment=experiment, overwrite=args.o))


if __name__ == '__main__':
    init()

