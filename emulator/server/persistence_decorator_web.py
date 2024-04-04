import json
from datetime import datetime
from functools import wraps

from beanie import WriteRules
from flask import request

from cfg import PROJECT_ROOT_DIR
from model.web.client import Client
from model.web.request import Request
from utilities.no_torch_logger import NoTorchLogger

logger = NoTorchLogger("web_server_pers", f"{PROJECT_ROOT_DIR}/logs")


def log_transport(func):
        @wraps(func)
        async def decorated_function(*args, **kwargs):
            payload = {}
            if request.data:
                payload = json.loads(request.data)
            logger.warning(request)
            logger.warning(request.environ)
            environment = request.environ
            client_ip = environment["REMOTE_ADDR"]
            request_method = environment["REQUEST_METHOD"]
            request_uri = environment["RAW_URI"]

            client = await Client.find_one(Client.ip == client_ip)
            if client is None:
                client = Client(ip=client_ip)
                await client.insert()

            client_request = Request(client=client.id.__str__(), request_method=request_method, uri=request_uri, request=payload)
            response = func(*args, **kwargs)
            client_request.response_time = datetime.now()
            client.requests.append(client_request)
            await client.save(link_rule=WriteRules.WRITE)

            return response

        return decorated_function
