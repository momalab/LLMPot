import asyncio
import json
import os
import socketserver
from datetime import datetime

import torch
from beanie import init_beanie, WriteRules
from motor.motor_asyncio import AsyncIOMotorClient
from transformers import ByT5Tokenizer, T5ForConditionalGeneration

from model.modbus.client import Client
from model.modbus.request import Request
from cfg import PROJECT_ROOT_DIR
from finetune.custom_lightning.byt5_lightning_module import Byt5LightningModule
from finetune.model.finetuner_model import FinetunerModel
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
    model_orig = T5ForConditionalGeneration.from_pretrained(finetuner_model.base_model_id(), device_map="cuda")
    model = Byt5LightningModule.load_from_checkpoint(
        checkpoint_path=f"{finetuner_model.experiment_instance_last_result_path}",
        finetuner_model=finetuner_model,
        tokenizer=tokenizer,
        model=model_orig,
        test_dataset=None,
        trust_remote_code=True,
        device_map="cuda",
    )
    logger.info("Loading model... Done.")
    model.eval()
    return model, tokenizer

class ThreadedTCPRequestHandler(socketserver.BaseRequestHandler):
    with open(f"/app/{os.environ['EXPERIMENT_PATH']}", "r") as cfg:
        config = cfg.read()
        config = json.loads(config)

    finetuner_model = FinetunerModel(experiment=os.environ['EXPERIMENT'], **config)
    finetuner_model.start_datetime = os.listdir(f"{finetuner_model.experiment_dataset_result_path}")[0]
    model, tokenizer = load_model(finetuner_model)

    def handle(self):
        asyncio.run(self.handle_async())

    async def handle_async(self):
        incoming_raw = self.request.recv(1024)
        client_ip = self.client_address[0]
        client_port = self.client_address[1]


        try:
            incoming_str = ''.join(['{:02x}'.format(byte) for byte in incoming_raw])
        except:
            logger.error(f"IP: {client_ip}:{client_port} - Error: {incoming_raw}")
            incoming_str = str(incoming_raw)

        logger.info(f"IP: {client_ip}:{client_port} - Incoming String: {incoming_str}, Incoming Raw: {incoming_raw}")

        client = await Client.find(Client.ip == client_ip).first_or_none()
        if client is None:
            client = Client(ip=client_ip)

        client_request = Request(client=str(client.id), request=incoming_str, client_port=client_port)

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
    client = AsyncIOMotorClient('mongo', 27017, username='root', password=os.environ['MONGO_PWD'], authSource='admin')
    await init_beanie(database=client.modbus, document_models=[Client, Request], multiprocessing_mode=True)

    await async_server()


def main():
    loop = asyncio.new_event_loop()
    loop.run_until_complete(modbus_app())


if __name__ == '__main__':
    main()
