import asyncio
from datetime import datetime
import struct
import traceback
from typing import List

from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from honeypot.client import Client, Request
from validation.mbtcp_validator import Validator


async def init():
    client = AsyncIOMotorClient(
        "mongodb://127.0.0.1:27017/modbus?authSource=admin&directConnection=true")
    db = client["modbus"]

    await init_beanie(database=db, document_models=[Client, Request])


async def query():
    pipeline = [
        {
            "$lookup": {
                "from": "Request",
                "localField": "requests.$id",
                "foreignField": "_id",
                "as": "requestDetails"
            }
        },
        {
            "$addFields": {
                "numberOfRequests": {"$size": "$requestDetails"}
            }
        },
        {
            "$match": {
                "numberOfRequests": {"$gt": 1},
                "first_contact": {"$gt": datetime.strptime('2023-05-01T00:00:00Z', '%Y-%m-%dT%H:%M:%SZ')}
            }
        },
        {
            "$project": {
                "id": 1,
                "ip": 1,
                "requestDetails": "$requestDetails",
                "number_of_requests": "$numberOfRequests",
                "first_contact": 1
            }
        },
    ]


    # clients = await Client.aggregate(pipeline).to_list(None)
    # clients = await Client.find_all().to_list(None)
    # requests = await Request.find_all().to_list(None)
    specific_datetime = datetime(2023, 6, 10, 0, 0, 0)
    requests = await Request.find(Request.request_time > specific_datetime).to_list()
    print(f"Number of clients: {len(requests)}")
    total = len(requests)

    valid = 0
    valid_request = 0
    # for client in clients:
    #     client = Client.model_validate(client)
    #     await client.fetch_all_links()
    for request in requests:
        request_inst = Request.model_validate(request)
        is_valid, explanation = validate_modbus_tcp_request(
            request_inst.request)
        if is_valid:
            valid_request += 1
        else:
            # print(f"Invalid request: {request_inst.request} : {explanation}")
            continue
        try:
            # print(f"Request: {request_inst.request} : {request_inst.response}")
            validation = Validator(request_inst.request, request_inst.response, request_inst.response, 39)
            validation.check_header_ids()
            validation.check_payload()
            valid += 1
        except Exception as e:
            print(f"Request: {request_inst.request} : {request_inst.response} : {e}")
            pass
            # print("Validation failed", traceback.format_exc())

    print(f"Valid requests: {valid}/{valid_request}/{total}")


def validate_modbus_tcp_request(hex_str: str):
    try:
        message_bytes = bytes.fromhex(hex_str)
    except ValueError:
        return False, "Invalid hexadecimal string."

    if len(message_bytes) < 8:
        return False, "Request too short to be valid."

    transaction_id, protocol_id, length, unit_id = struct.unpack(
        '>HHHB', message_bytes[:7])

    if protocol_id != 0:
        return False, "Invalid protocol ID, should be 0 for Modbus TCP."

    # Length field value should be total length minus 6 bytes of the header
    if length != len(message_bytes) - 6:
        return False, "Mismatch in length field."

    func_code = message_bytes[7]
    valid_func_codes = [43]
    # valid_func_codes = [43, 1, 5, 15, 3, 6, 16]
    valid_func_codes.extend([2, 4, 7, 8, 17, 20, 21, 22, 23, 24])
    if func_code not in valid_func_codes:
        return False, f"Invalid function code: {func_code}"

    return True, "Valid Modbus TCP request."


async def main():
    await init()
    await query()

asyncio.run(main())
