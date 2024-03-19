import asyncio
import socketserver
from datetime import datetime

from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from honeypot.client import Client
from honeypot.request import Request
from honeypot.session import Session


class MyTCPClientHandler(socketserver.StreamRequestHandler):

    def handle(self):
        asyncio.run(self.handle2())

    async def handle2(self):
        msg = self.rfile.readline().strip()
        self.wfile.write(msg)
        self.wfile.flush()

        print(f"Received request from {self.client_address[0]}")
        print(f"Data Received from client is: {msg}")

        client2 = Client(ip=self.client_address[0])
        await client2.save()

        session = Session(client_id=client2.id,
                          client_port=self.client_address[1],
                          server_port=self.server.server_address[1],
                          protocol="modbus")
        await session.save()

        request = Request(session_id=session.id, request=msg, response_time=datetime.now())
        await request.save()


async def async_server():
    server_address = ("0.0.0.0", 5020)
    server = socketserver.ThreadingTCPServer(server_address, MyTCPClientHandler)
    server.serve_forever()


async def modbus_app():
    client = AsyncIOMotorClient('localhost', 27017, username='root', password='root', authSource='admin')
    await init_beanie(database=client.db_name, document_models=[Client, Session, Request], multiprocessing_mode=True)

    await async_server()


if __name__ == '__main__':
    loop = asyncio.new_event_loop()
    loop.run_until_complete(modbus_app())
