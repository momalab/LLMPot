import json
from datetime import datetime
from functools import wraps

from flask import request

from honeypot.client import Client
from honeypot.request import Request


def log_transport(func):
        @wraps(func)
        async def decorated_function(*args, **kwargs):
            payload = None
            if request.data:
                payload = json.loads(request.data)
            environment = request.environ
            client_ip = environment["REMOTE_ADDR"]
            request_method = environment["REQUEST_METHOD"]
            request_uri = environment["REQUEST_URI"]

            client = await Client.find(Client.ip == client_ip).first_or_none()
            if client is None:
                client = Client(ip=client_ip)
                await client.insert()

            client_request = Request(client=client.id, request_method=request_method, uri=request_uri, request=payload)
            response = func(*args, **kwargs)
            client_request.response_time = datetime.now()
            await client_request.save()

            return response

        return decorated_function
