from datetime import datetime
from typing import List

from beanie import Document, Indexed, Link
from pydantic import Field

from model.web.request import Request


class Client(Document):
    ip: Indexed(str, unique=True)
    requests: List[Link[Request]] = Field(default_factory=list)

    first_contact: datetime = Field(default_factory=datetime.now)
