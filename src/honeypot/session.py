from dataclasses import field
from datetime import datetime

from beanie import Link, Document

from honeypot.client import Client


class Session(Document):
    client: Link[Client]

    client_port: int
    server_port: int
    protocol: str

    created_at: datetime = field(default_factory=datetime.now)
