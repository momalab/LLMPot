import sys
import traceback
import numpy as np
import pandas as pd
from result import Result
from simplet5 import SimpleT5
from typing import Optional, TextIO
from transformers import ByT5Tokenizer 

#1: byt5, 2:byt5-small, 3:finetuned_model, 4:test_set, 5:0 no context 1 with context

def packet_chunks(query, dataFromServer=1):
    hex_chunks_query = [query[i:i + 2] for i in range(0, len(query), 2)] 
    hex_chunks_response = [dataFromServer[i:i + 2] for i in range(0, len(dataFromServer), 2)] 
    query_header = hex_chunks_query[:7] 
    query_payload = hex_chunks_query[7:] 
    response_header = hex_chunks_response[:7] 
    response_payload = hex_chunks_response[7:] 
    return query_header, query_payload, response_header, response_payload 

def check_header_IDs(query_header, response_header, query_payload):
    q_TID = query_header[:2]
    r_TID = response_header[:2]
    if r_TID != q_TID:
        raise Exception(f"Trans_ID: {r_TID}, expected: {q_TID}")
    q_PID = query_header[2:4]
    r_PID = response_header[2:4]
    if r_PID != q_PID:
        raise Exception(f"Protocol_ID: {r_PID}, expected: {q_PID}")
    q_UID = query_header[-1]
    r_UID = response_header[-1]
    if r_UID != q_UID:
        raise Exception(f"Uni_ID: {r_UID}, expected: {q_UID}")
    length = int(query_header[5], base=16)
    expected_length = len(query_payload)+1
    if length != expected_length:
        raise Exception(f"length: {length}, expected: {expected_length}")

def check_payload(query_payload, response_payload=1): 
    fc = response_payload[0]
    q_FC = query_payload[0]
    r_FC = response_payload[0]
    if r_FC != q_FC:
        raise Exception(f"FC: {r_FC}, expected: {q_FC}")

    if fc == "01":  
        bit_count = int(query_payload[-1], base=16)
        byte_count = int(response_payload[1], base=16)
        expected_byte_count = int(bit_count/8)+1
        if byte_count != expected_byte_count:
            raise Exception(f"byte_count: {byte_count}, expected: {expected_byte_count}")
    if fc == "03": 
        reference_number = query_payload[1:3]
        word_count = int(query_payload[-1], base=16)
        num_registers = int(len(response_payload[2:])/2)
        if num_registers != word_count:
            raise Exception(f"num_registers: {num_registers}, expected: {word_count}")
        byte_count = int(response_payload[1], base=16)
        length_regiters = len(response_payload[2:])
        if byte_count != length_regiters:
            raise Exception(f"byte_count: {byte_count}, expected: {length_regiters}")
    if fc == "05": #Note: response must be exactly the same as the query (length as well)
        if response_payload != query_payload:
            raise Exception(f"payload: {response_payload}, expected: {query_payload}")
    if fc == "15": # Note: response payload = query payload up to the Bit Count/ query has additional attributes Byte count and Data (1byte each) - 5chunks
        q_ref = query_payload[1:3]
        r_ref = response_payload[1:3]
        if r_ref != q_ref:
            raise Exception(f"Reference: {r_ref}, expected: {q_ref}")
        q_bitCount = query_payload[3:5]
        r_bitCount = response_payload[3:5]
        if r_bitCount != q_bitCount:
            raise Exception(f"Bit_Count: {r_bitCount}, expected: {q_bitCount}") 
        q_byte_count = int(query_payload[5], base=16)
        data_length = len(query_payload) - len(query_payload[:6])
        if data_length != q_byte_count:
            raise Exception(f"data_length: {data_length}, expected: {q_byte_count}")
    if fc == "16":
        q_ref = query_payload[1:3]
        r_ref = response_payload[1:3]
        reference_number = q_ref
        if r_ref != q_ref:
            raise Exception(f"Reference: {r_ref}, expected: {q_ref}")
        q_wordCount = query_payload[3:5]
        r_wordCount = response_payload[3:5]
        if r_wordCount != q_wordCount:
            raise Exception(f"Word_count: {r_wordCount}, expected: {q_wordCount}")
        word_count = int(query_payload[4], base=16) 
        num_registers = int(len(query_payload[6:])/2)
        if num_registers != word_count:
            raise Exception(f"num_registers: {num_registers}, expected: {word_count}")
        byte_count = int(query_payload[5], base=16)  
        bytes_registers = len(query_payload[6:])
        if bytes_registers != byte_count:
            raise Exception(f"bytes_registers: {bytes_registers}, expected: {byte_count}")



def validate(model: SimpleT5, result_file: TextIO, test_set: []):
    to_save: Result = Optional[Result]
    for i in range(len(test_set)):
        try:
            query = test_set['request'][i]
            expected_response = test_set['response'][i]
            to_save = Result(index=i, request=query) #wireshark_index=int(test_set['wireshark_index'][i])

            if "|" in sample:
                question = query[query.rindex("|")+1:len(query)-1]
                context = query[:query.rindex("|")]
                inputs = model.tokenizer([question],[context], return_tensors="pt")
                output = tokenizer.decode(inputs['input_ids'][0])
                predicted_response = model.predict(output) #top_p = 0.1
            else:
                predicted_response = model.predict(query)[0]

            query_header, query_payload, response_header, response_payload = packet_chunks(question, predicted_response)
            check_header_IDs(query_header, response_header, query_payload)
            check_payload(query_payload, response_payload)

            to_save = Result()
            to_save.index = i
            to_save.request = query
            to_save.response = predicted_response
            to_save.valid = True

        except Exception: #as exception #print(f"Invalid: {counter_invalid}. Exception: {exception}")
            to_save.valid = False
            to_save.expected = expected_response
            to_save.traceback = traceback.format_exc()
        finally:
            result_file.write(json.dumps(to_save.__dict__) + "\n")
    
def main():

    model = SimpleT5()
    model.load_model(f"{sys.argv[1]}", f"../models/{sys.argv[3]}", use_gpu=True) #model name format: byt5-small_dataset_5epcohs_32precision.csv
    tokenizer = ByT5Tokenizer.from_pretrained(f"google/{sys.argv[2]}")
    test_set = pd.read_csv(f"../datasets/test/{sys.argv[4]}")

    with open(f"./data/{sys.argv[3]}.jsonl", "a") as results_file:
        validate(model, results_file, test_set)
    
    
if __name__ == '__main__':
    main()