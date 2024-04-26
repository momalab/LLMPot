class Validator:

    def __init__(self, request, response, end_address):
        self.request = request
        if ":" in request:
            self.request = request[:-1]
        self.response = response
        self._end_address = end_address
        hex_chunks_query = [self.request[i:i + 2] for i in range(0, len(self.request), 2)]
        hex_chunks_response = [self.response[i:i + 2] for i in range(0, len(self.response), 2)]
        self.query_header = hex_chunks_query[:10]
        self.query_payload = hex_chunks_query[10:]
        # self.address = int(self.query_payload[1] + self.query_payload[2], base=16) #NOTE: FIXX
        self.response_header = hex_chunks_response[:12] #NOTE EXCEPTIONS ARE ADDED HERE
        self.response_payload = hex_chunks_response[12:]

    def check_header_ids(self):
        q_pid = self.query_header[:2]
        r_pid = self.response_header[:2]
        if r_pid != q_pid:
            raise ValueError(f"Protocol_ID: {r_pid}, expected: {q_pid}")

        parameter_length = int(self.query_header[7:9], base=16)
        expected_length = len(self.query_payload)+1
        if parameter_length != expected_length:
            raise ValueError(f"length: {parameter_length}, expected: {expected_length}")

    def check_payload(self):
        fc = self.response_payload[0]
        q_fc = self.query_payload[0]
        r_fc = self.response_payload[0]
        
        if self.response_header[-1] != 0:
            error = self.response_header[-2]
            error_class = error[0]
            error_code = error[1]
            raise ValueError("This is an exception response")

        data_length = int(self.query_header[9:11], base=16) #either 0 for read or a number for write
        if (data_length == 0) and (q_fc != "04"):
            raise ValueError(f"{q_fc} supposed to be read 0x04")
        if (data_length != 0) and (q_fc != "05"):
            raise ValueError(f"{q_fc} supposed to be write 0x05")

        if r_fc == q_fc:
            if fc == "04":
                self._read_function()
            elif fc == "05":
                self._write_function()

    def _read_function(self):
        

    def _write_function(self):
        



if __name__ == '__main__':
    val = Validator("000100000006000100050001", "00010000000400010100", 3)
    val.check_payload()
