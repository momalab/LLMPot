from datetime import datetime
from typing import Optional

from beanie import Document
from pydantic import Field


class Request(Document):
    client: str = Field(default=None)

    uri: str
    request: dict = Field(default_factory=dict)
    request_method: str = Field(default=None)
    response: Optional[dict] = Field(default={})

    response_time: Optional[datetime] = Field(default=None)
    request_time: datetime = Field(default_factory=datetime.now)
