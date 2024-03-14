from dataclasses import field
from datetime import datetime
from typing import Optional

from beanie import Link, Document

from honeypot.session import Session


class Request(Document):
    session: Optional[Link[Session]] = None
    client: Link[Session]

    uri: Optional[str] = None
    request: Optional[dict] = None
    request_method: Optional[str] = None
    response: Optional[dict] = None

    response_time: Optional[datetime] = None
    request_time: datetime = field(default_factory=datetime.now)
