from dataclasses import field
from datetime import datetime
from typing import Annotated, List

from beanie import Document, Indexed, Link
from pydantic import Field

from model.modbus.request import Request


class Client(Document):
    ip: Annotated[str, Indexed(unique=True)]
    requests: List[Link[Request]] = Field(default_factory=list)

    first_contact: datetime = field(default_factory=datetime.now)
