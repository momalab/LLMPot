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

from cfg import DATASET_DUMPS, DATASET_PARSED, EXPERIMENTS
from dataset_generation.parse import parse_with_file
from dataset_generation.split import split
from finetune.model.finetuner_model import FinetunerModel


def parse_packets(port: int, protocol: str, context_length: int, output_filename: str, experiment: str):
    if protocol == "s7comm":
        parse_with_file(protocol, "tpkt", port, "temp", output_filename, context_length, False, experiment)
    else:
        parse_with_file(protocol, protocol, port, "temp", output_filename, context_length, False, experiment)
    split(output_filename, experiment)


def server(ip: str, port: int, finetuner_model: FinetunerModel, args: Any, server_class: Any):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    args = getattr(finetuner_model, f"{finetuner_model.current_dataset.protocol}_args")
    server_inst = server_class(ip, port, *args)
    server_inst.run()


async def main(port: int, interface: str, model: str, experiment: str, overwrite: bool = False):
    try:
        connection_ip_addr = "127.0.0.1"
        with open(f"{EXPERIMENTS}/{model}/{experiment}", "r") as cfg:
            config = cfg.read()
            config = json.loads(config)
            finetuner_model = FinetunerModel(experiment, **config)
            finetuner_model.experiment = experiment

        for dataset in finetuner_model.datasets:
            print(f'Experiment {dataset} running...')

            if os.path.exists(f"{DATASET_PARSED}/{experiment}/{dataset}.csv") and overwrite is False:
                print(f'Experiment {dataset} already exists. Skipping...')
                continue
            elif overwrite:
                print(f'Experiment {dataset} already exists. Overwriting...')

            finetuner_model.current_dataset = dataset
            if finetuner_model.current_dataset.server:
                server_class_str = ''.join(word.title() for word in finetuner_model.current_dataset.server.name.split('_'))
                client_class_str = ''.join(word.title() for word in finetuner_model.current_dataset.client.split('_'))

                server_class = getattr(importlib.import_module(f"dataset_generation.{finetuner_model.current_dataset.protocol}.{finetuner_model.current_dataset.server.name}"), server_class_str)
                client_class = getattr(importlib.import_module(f"dataset_generation.{finetuner_model.current_dataset.protocol}.{finetuner_model.current_dataset.client}"), client_class_str)

            tcpdump_process = subprocess.Popen(["tcpdump", "-i", interface, "-w", f"{DATASET_DUMPS}/temp.pcap"])

            args = getattr(finetuner_model.current_dataset, f"{finetuner_model.current_dataset.protocol}_args")
            print(*args)
            server_inst = server_class(connection_ip_addr, port, *args)

            server_thread = Process(target=server_inst.start, daemon=True)
            server_thread.start()

            time.sleep(10)

            client_inst = client_class(connection_ip_addr, port,
                                       finetuner_model.current_dataset.size,
                                       finetuner_model.current_dataset.functions,
                                       finetuner_model.current_dataset.addresses,
                                       finetuner_model.current_dataset.values,
                                       finetuner_model.current_dataset.multi_elements)

            client_inst.start_client()
            print(f'Experiment {dataset} finished.')
            thread = threading.Thread(target=client_inst.execute_functions, daemon=True)
            thread.start()
            thread.join()

            server_thread.terminate()
            server_thread.join()

            time.sleep(1)

            tcpdump_process.terminate()
            tcpdump_process.wait()

            parse = Process(target=parse_packets, args=[port, finetuner_model.current_dataset.protocol, finetuner_model.current_dataset.context, str(dataset),
                                                        finetuner_model.experiment])
            parse.start()

            parse.join()

            os.remove(f"{DATASET_DUMPS}/temp.pcap")
    finally:
        if os.path.exists(f"{DATASET_DUMPS}/temp.pcap"):
            os.remove(f"{DATASET_DUMPS}/temp.pcap")


def init():
    parser = argparse.ArgumentParser()
    parser.add_argument('-p', default=10200, type=int, required=False)
    parser.add_argument('-intrf', default="lo", type=str, required=False)
    parser.add_argument('-model', default="byt5-small", type=str, required=False)
    parser.add_argument('-exp', default="s7comm-protocol-emulation.json", type=str, required=False)
    parser.add_argument('-o', default=False, type=bool, required=False)
    args = parser.parse_args()

    server_port = args.p
    interface = args.intrf
    model = args.model
    experiment = args.exp

    asyncio.run(main(port=server_port, interface=interface, model=model, experiment=experiment, overwrite=args.o))


if __name__ == '__main__':
    init()
