import asyncio
import json
import os
import socketserver
from datetime import datetime

import torch
from beanie import init_beanie, WriteRules
from motor.motor_asyncio import AsyncIOMotorClient
from transformers import ByT5Tokenizer, T5ForConditionalGeneration

from cfg import EXPERIMENTS, PROJECT_ROOT_DIR, CHECKPOINTS
from finetune.custom_lightning.byt5_lightning_module import Byt5LightningModule
from finetune.model.finetuner_model import FinetunerModel
from model.modbus.client import Client
from model.modbus.request import Request
from utilities.logger import TheLogger

logger = TheLogger("modbus_server", f"{PROJECT_ROOT_DIR}/logs")

if torch.cuda.is_available():
    device = torch.device("cuda")
    logger.info("CUDA is available. Using GPU.")
else:
    device = torch.device("cpu")
    logger.info("CUDA is not available. Using CPU.")


class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    pass


def load_model(finetuner_model: FinetunerModel):
    logger.info("Loading model...")
    tokenizer = ByT5Tokenizer.from_pretrained(finetuner_model.base_model_id())
    model = T5ForConditionalGeneration.from_pretrained(finetuner_model.base_model_id()).to(device)
    model = Byt5LightningModule.load_from_checkpoint(
        checkpoint_path=f"{CHECKPOINTS}/{finetuner_model.experiment}/{finetuner_model.datasets[4].__str__()}/{finetuner_model.start_datetime}/checkpoints/last.ckpt",
        finetuner_model=finetuner_model,
        tokenizer=tokenizer,
        model=model,
        test_dataset=None,
        map_location=device
    )
    logger.info("Loading model... Done.")
    model.eval()
    return model, tokenizer


class ThreadedTCPRequestHandler(socketserver.BaseRequestHandler):

    with open(f"{EXPERIMENTS}/mbtcp-protocol-emulation.json", "r") as cfg:
        config = cfg.read()
        config = json.loads(config)
        finetuner_model = FinetunerModel(**config)
        finetuner_model.experiment = "mbtcp-protocol-emulation.json"
        finetuner_model.start_datetime = os.listdir(f"{CHECKPOINTS}/{finetuner_model.experiment}/{finetuner_model.datasets[4].__str__()}")[0]
    model, tokenizer = load_model(finetuner_model)

    def handle(self):
        asyncio.run(self.handle_async())

    async def handle_async(self):
        incoming = self.request.recv(1024)
        logger.info(f"Incoming: {incoming}")
        if incoming.startswith(b'PROXY TCP4'):
            parts = incoming.decode('ascii').split()
            logger.info(f"Incoming: {incoming.decode('ascii')}")
            logger.info(f"Incoming: {incoming.decode('ascii').split()   }")
            client_ip = parts[2]
            proxy_ip = parts[3]
            client_port = parts[4]
            proxy_port = parts[5]
            incoming_raw = incoming.decode('ascii').split("\r\n")[1]
            logger.info(f"Proxying from {client_ip}:{client_port} to {proxy_ip}:{proxy_port}")
        else:
            incoming_raw = incoming
            client_ip = self.client_address[0]
            client_port = self.client_address[1]
        server_port = self.server.server_address[1]

        try:
            incoming_str = bytes(incoming_raw, 'ascii').hex()
        except:
            logger.error(f"IP: {client_ip}:{client_port} - Error: {incoming_raw}")
            incoming_str = str(incoming_raw)

        logger.info(f"IP: {client_ip}:{client_port} - Incoming String: {incoming_str}, Incoming Raw: {incoming_raw}")

        client = await Client.find(Client.ip == client_ip).first_or_none()
        if client is None:
            client = Client(ip=client_ip)

        client_request = Request(client=client.id.__str__(), request=incoming_str, client_port=client_port)

        outgoing_str = self.model.generate(incoming_str)
        try:
            outgoing_raw = bytes.fromhex(outgoing_str)
        except:
            logger.error(f"IP: {client_ip}:{client_port} - Outgoing Error Encoding: {outgoing_str}")
            outgoing_raw = bytes.fromhex(incoming_str)
            client_request.error = True
        self.request.sendall(outgoing_raw)
        logger.info(f"IP: {client_ip}:{client_port} - Outgoing String: {outgoing_str}, Outgoing Raw: {outgoing_raw}")

        client_request.response_time = datetime.now()
        client_request.response = outgoing_str

        client.requests.append(client_request)

        await client.save(link_rule=WriteRules.WRITE)
        client_request.client = client.id.__str__()
        await client_request.save()


async def async_server():
    server = ThreadedTCPServer(("0.0.0.0", 5020), ThreadedTCPRequestHandler)
    server.serve_forever()


async def modbus_app():
    client = AsyncIOMotorClient('mongo', 27017, username='root', password='root', authSource='admin')
    await init_beanie(database=client.modbus, document_models=[Client, Request], multiprocessing_mode=True)

    await async_server()


def main():
    loop = asyncio.new_event_loop()
    loop.run_until_complete(modbus_app())


if __name__ == '__main__':
    main()

