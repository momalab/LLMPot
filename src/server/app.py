import asyncio

from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from honeypot.client import Client
from honeypot.request import Request
from honeypot.session import Session
from server.modbus_server import modbus_app
from server.web_server import web_app


async def main():
    client = AsyncIOMotorClient('localhost', 27017, username='root', password='root', authSource='admin')
    await init_beanie(database=client.db_name, document_models=[Client, Session, Request], multiprocessing_mode=True)

    modbus_task = asyncio.create_task(modbus_app())
    web_task = asyncio.create_task(web_app())

    await asyncio.gather(modbus_task, web_task)

if __name__ == '__main__':
    asyncio.run(main())
