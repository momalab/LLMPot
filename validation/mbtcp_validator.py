class Validator:

    def __init__(self, query, dataFromServer):
        self.query = query
        self.dataFromServer = dataFromServer

        
    def packet_chunks(self): 
        hex_chunks_query = [self.query[i:i + 2] for i in range(0, len(self.query), 2)] 
        hex_chunks_response = [self.dataFromServer[i:i + 2] for i in range(0, len(self.dataFromServer), 2)] 
        query_header = hex_chunks_query[:7] 
        query_payload = hex_chunks_query[7:] 
        response_header = hex_chunks_response[:7] 
        response_payload = hex_chunks_response[7:] 
        return self.query_header, self.query_payload, self.response_header, self.response_payload 

    def check_header_IDs(self): #, query_header, response_header, query_payload
        q_TID = self.query_header[:2]
        r_TID = self.response_header[:2]
        if r_TID != q_TID:
            raise Exception(f"Trans_ID: {r_TID}, expected: {q_TID}")
        q_PID = self.query_header[2:4]
        r_PID = self.response_header[2:4]
        if r_PID != q_PID:
            raise Exception(f"Protocol_ID: {r_PID}, expected: {q_PID}")
        q_UID = self.query_header[-1]
        r_UID = self.response_header[-1]
        if r_UID != q_UID:
            raise Exception(f"Uni_ID: {r_UID}, expected: {q_UID}")
        length = int(self.query_header[5], base=16)
        expected_length = len(self.query_payload)+1
        if length != expected_length:
            raise Exception(f"length: {length}, expected: {expected_length}")

    def check_payload(self): #, query_payload, response_payload=1
        fc = self.response_payload[0]
        q_FC = self.query_payload[0]
        r_FC = self.response_payload[0]
        if r_FC != q_FC:
            raise Exception(f"FC: {r_FC}, expected: {q_FC}")

        if fc == "01":  
            bit_count = int(self.query_payload[-1], base=16)
            byte_count = int(self.response_payload[1], base=16)
            expected_byte_count = int(bit_count/8)+1
            if byte_count != expected_byte_count:
                raise Exception(f"byte_count: {byte_count}, expected: {expected_byte_count}")
        
        if fc == "03": 
            reference_number = self.query_payload[1:3]
            word_count = int(self.query_payload[-1], base=16)
            num_registers = int(len(self.response_payload[2:])/2)
            if num_registers != word_count:
                raise Exception(f"num_registers: {num_registers}, expected: {word_count}")
            byte_count = int(self.response_payload[1], base=16)
            length_regiters = len(self.response_payload[2:])
            if byte_count != length_regiters:
                raise Exception(f"byte_count: {byte_count}, expected: {length_regiters}")
        
        if fc == "05": #Note: response must be exactly the same as the query (length as well)
            if self.response_payload != self.query_payload:
                raise Exception(f"payload: {self.response_payload}, expected: {self.query_payload}")
        
        if fc == "15": # Note: response payload = query payload up to the Bit Count/ query has additional attributes Byte count and Data (1byte each) - 5chunks
            q_ref = self.query_payload[1:3]
            r_ref = self.response_payload[1:3]
            if r_ref != q_ref:
                raise Exception(f"Reference: {r_ref}, expected: {q_ref}")
            q_bitCount = self.query_payload[3:5]
            r_bitCount = self.response_payload[3:5]
            if r_bitCount != q_bitCount:
                raise Exception(f"Bit_Count: {r_bitCount}, expected: {q_bitCount}") 
            q_byte_count = int(self.query_payload[5], base=16)
            data_length = len(self.query_payload) - len(self.query_payload[:6])
            if data_length != q_byte_count:
                raise Exception(f"data_length: {data_length}, expected: {q_byte_count}")
        
        if fc == "16":
            q_ref = self.query_payload[1:3]
            r_ref = self.response_payload[1:3]
            reference_number = q_ref
            if r_ref != q_ref:
                raise Exception(f"Reference: {r_ref}, expected: {q_ref}")
            q_wordCount = self.query_payload[3:5]
            r_wordCount = self.response_payload[3:5]
            if r_wordCount != q_wordCount:
                raise Exception(f"Word_count: {r_wordCount}, expected: {q_wordCount}")
            word_count = int(self.query_payload[4], base=16) 
            num_registers = int(len(self.query_payload[6:])/2)
            if num_registers != word_count:
                raise Exception(f"num_registers: {num_registers}, expected: {word_count}")
            byte_count = int(self.query_payload[5], base=16)  
            bytes_registers = len(self.query_payload[6:])
            if bytes_registers != byte_count:
                raise Exception(f"bytes_registers: {bytes_registers}, expected: {byte_count}")
