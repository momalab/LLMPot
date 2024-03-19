import asyncio
import socketserver
from datetime import datetime

import torch
from beanie import init_beanie, WriteRules
from motor.motor_asyncio import AsyncIOMotorClient
from transformers import ByT5Tokenizer, T5ForConditionalGeneration

from finetune.custom_lightning.byt5_lightning_module import Byt5LightningModule
from utils import DIR
from model.modbus.client import Client
from model.modbus.request import Request
from utils.finetuner_model import FinetunerModel
from utils.the_logger import TheLogger

logger = TheLogger("modbus_server", f"{DIR}/app/logs")


def load_model(finetuner_model: FinetunerModel):
    tokenizer = ByT5Tokenizer.from_pretrained(finetuner_model.base_model_id())
    model = T5ForConditionalGeneration.from_pretrained(finetuner_model.base_model_id())
    model = Byt5LightningModule.load_from_checkpoint(
        checkpoint_path=f"{DIR}/../checkpoints/last.ckpt",
        finetuner_model=finetuner_model,
        tokenizer=tokenizer,
        model=model,
        val_loss_const="val_loss",
        train_loss_const="train_loss",
    )
    model.eval()
    # model = model.to("cpu")
    return model, tokenizer


def predict(request: str, model, tokenizer):
    input_ids = tokenizer.encode(request, return_tensors="pt", add_special_tokens=True)
                 # .to("cpu"))
    with torch.no_grad():
        logits = model.model.generate(input_ids,
                                      num_beams=2,
                                      max_length=512,
                                      repetition_penalty=2.5,
                                      length_penalty=1.0,
                                      early_stopping=True,
                                      top_p=0.95,
                                      top_k=50,
                                      num_return_sequences=1,
                                      do_sample=True
                                      # ).to("cpu")
                                      )
        return tokenizer.batch_decode(logits, skip_special_tokens=True, clean_up_tokenization_spaces=True)[0]


class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    pass


class ThreadedTCPRequestHandler(socketserver.BaseRequestHandler):
    finetune_model = FinetunerModel(model_type="google", model_name="byt5-small",
                                    dataset_filename="mbtcp-p1-c2-1200", start_datetime="20240226T1739")
    model, tokenizer = load_model(finetune_model)

    def handle(self):
        asyncio.run(self.handle_async())

    async def handle_async(self):
        client_ip = self.client_address[0]
        client_port = self.client_address[1]
        server_port = self.server.server_address[1]

        incoming_raw = self.request.recv(1024)
        try:
            incoming_str = ''.join(['{:02x}'.format(byte) for byte in incoming_raw])
        except:
            logger.error(f"IP: {client_ip}:{client_port} - Error: {incoming_raw}")
            incoming_str = str(incoming_raw)

        logger.info(f"IP: {client_ip}:{client_port} - Incoming String: {incoming_str}, Incoming Raw: {incoming_raw}")

        client = await Client.find(Client.ip == client_ip).first_or_none()
        if client is None:
            client = Client(ip=client_ip)

        client_request = Request(client=client.id.__str__(), request=incoming_str, client_port=client_port)

        outgoing_str = predict(incoming_str, model=self.model, tokenizer=self.tokenizer)
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
    logger.info(f"Server initialized..")


async def modbus_app():
    client = AsyncIOMotorClient('mongo', 27017, username='root', password='root', authSource='admin')
    await init_beanie(database=client.modbus, document_models=[Client, Request], multiprocessing_mode=True)

    await async_server()


def main():
    loop = asyncio.new_event_loop()
    loop.run_until_complete(modbus_app())


if __name__ == '__main__':
    main()

