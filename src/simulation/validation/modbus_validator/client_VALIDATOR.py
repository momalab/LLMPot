import socket
import pandas as pd
#from packet_validator import Validator

test_set = pd.read_csv("/home/dunia/ICSPot/src/simulation/validation/test_set.csv")

def packet_chunks(query, dataFromServer):
    hex_chunks_query = [query[i:i + 2] for i in range(0, len(query), 2)] #print(f"hex_chunks_query is {hex_chunks_query}, len is {len(hex_chunks_query)}")
    hex_chunks_response = [dataFromServer[i:i + 2] for i in range(0, len(dataFromServer), 2)] #print(f"hex_chunks_response is {hex_chunks_response}, len is {len(hex_chunks_response)}")
    # DIVIDE Header and payload
    query_header = hex_chunks_query[:7] #print(f"query_header is {query_header}, len is {len(query_header)}")
    query_payload = hex_chunks_query[7:] #print(f"query_payload is {query_payload}, len is {len(query_payload)}")
    response_header = hex_chunks_response[:7] #print(f"response_header is {response_header}, len is {len(response_header)}")
    response_payload = hex_chunks_response[7:] #print(f"response_payload is {response_payload}, len is {len(response_payload)}")
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

def check_payload(query_payload, response_payload): 
    fc = response_payload[0]
    q_FC = query_payload[0]
    r_FC = response_payload[0]
    if r_FC != q_FC:
        raise Exception(f"FC: {r_FC}, expected: {q_FC}")

    if fc == "01": #Note: reference number cant be verified - depicted on wireshark only/ the Bit Count 
        bit_count = int(query_payload[-1], base=16)
        byte_count = int(response_payload[1], base=16)
        expected_byte_count = int(bit_count/8)+1
        if byte_count != expected_byte_count:
            raise Exception(f"byte_count: {byte_count}, expected: {expected_byte_count}")
        
    if fc == "03": #Note: reference (registers address) cant be verified - depicted on wireshark only
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
        if r_ref != q_ref:
            raise Exception(f"Reference: {r_ref}, expected: {q_ref}")
        q_wordCount = query_payload[3:5]
        r_wordCount = response_payload[3:5]
        if r_wordCount != q_wordCount:
            raise Exception(f"Word_count: {r_wordCount}, expected: {q_wordCount}")
        word_count = int(query_payload[4], base=16) #word count = number of registers
        num_registers = int(len(query_payload[6:])/2)
        if num_registers != word_count:
            raise Exception(f"num_registers: {num_registers}, expected: {word_count}")
        byte_count = int(query_payload[5], base=16) #byte count = number of bytes for all registers 
        bytes_registers = len(query_payload[6:])
        if bytes_registers != byte_count:
            raise Exception(f"bytes_registers: {bytes_registers}, expected: {byte_count}")

list = []
counter_invalid = 0

try:
    for i in range(len(test_set)): 
        clientSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        clientSocket.connect(("127.0.0.1", 5020))

        try:
            query = test_set['request'][i]
            #print('query is:', query)
            clientSocket.sendall(bytes.fromhex(query))
            dataFromServer = clientSocket.recv(1024)

            dataFromServer = dataFromServer.hex()
            #print(f"dataFromServer is:{dataFromServer}")

            query_header, query_payload, response_header, response_payload = packet_chunks(query, dataFromServer)
            check_header_IDs(query_header, response_header, query_payload)
            check_payload(query_payload, response_payload)
            print("Valid")

        except Exception as e:
            counter_invalid += 1
            print(f"Invalid. Exception_counter: {counter_invalid}")
            list.append([query, dataFromServer, e])


        clientSocket.close()

    exception_list = pd.DataFrame(list, columns=['Query', 'ResponseReceived', 'Exception'])
    exception_list.to_csv('exception_list.csv', index=True)

except KeyboardInterrupt:
    print("Client stopped by user.")

finally:
    clientSocket.close()