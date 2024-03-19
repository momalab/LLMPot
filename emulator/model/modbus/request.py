from dataclasses import field
from datetime import datetime

import pymongo
from beanie import Document
from pydantic import Field


class Request(Document):
    client: str = Field(default=None)

    client_port: int
    request: str
    response: str = Field(default=None)
    error: bool = False

    response_time: datetime = Field(default=None)
    request_time: datetime = field(default_factory=datetime.now)

    class Settings:
        indexes = [
            "request_response",
            [
                ("request", pymongo.TEXT),
                ("response", pymongo.TEXT),
            ]
        ]
