from dataclasses import field
from datetime import datetime
from typing import Annotated

from beanie import Document, Indexed


class Client(Document):
    ip: Annotated[str, Indexed(unique=True)]
    first_contact: datetime = field(default_factory=datetime.now)
