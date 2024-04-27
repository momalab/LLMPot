class Validator:

    def __init__(self, request, response, end_address):
        self.request = request
        if ":" in request:
            self.request = request[:-1]
        self.response = response
        self._end_address = end_address
        hex_chunks_query = [self.request[i:i + 2] for i in range(0, len(self.request), 2)]
        hex_chunks_response = [self.response[i:i + 2] for i in range(0, len(self.response), 2)]

        self.query_tpkt = hex_chunks_query[:4] #4 bytes
        self.query_iso = hex_chunks_query[4:7] #3 bytes
        self.query_s7comm = hex_chunks_query[7:]
        self.response_tpkt = hex_chunks_response[:4] #4 bytes
        self.response_iso = hex_chunks_response[4:7] #3 bytes
        self.response_s7comm = hex_chunks_response[7:]

        self.query_header = self.query_s7comm[:10]
        self.query_payload = self.query_s7comm[10:]
        self.response_header = self.response_s7comm[:12] # error code and class
        self.response_payload = self.response_s7comm[12:]

    def check_header_ids(self):
        q_pid = self.query_header[0]
        r_pid = self.response_header[0]
        if r_pid != q_pid:
            raise ValueError(f"PID: {r_pid}, expected: {q_pid}")
        if (q_pid != "32") or (r_pid != "32"):
            raise ValueError(f"{q_pid} QPID and {r_pid} RPID, expected 32")

        job = self.query_header[1]
        ack_data = self.response_header[1]
        if job != "01":
            raise ValueError(f"{job} Job ID, expected 01")
        if ack_data != "03":
            raise ValueError(f"{ack_data} ACK_Data ID, expected 03")

        q_parameter_length = int(self.query_header[7], base=16)
        r_parameter_length = int(self.response_header[7], base=16)
        q_expected_length = len(self.query_payload)+1
        r_expected_length = len(self.response_payload)+1
        if q_parameter_length != q_expected_length:
            raise ValueError(f"q_parameter_length: {q_parameter_length}, expected: {q_expected_length}")
        if r_parameter_length != r_expected_length:
            raise ValueError(f"r_parameter_length: {r_parameter_length}, expected: {r_expected_length}")

    def check_payload(self):
        fc = self.response_payload[0]
        q_fc = self.query_payload[0]
        r_fc = self.response_payload[0]

        if r_fc != q_fc:
            raise ValueError(f"Unexpected condition! {fc} - {q_fc} - {r_fc}")

        q_data_length = int(self.query_header[9], base=16)
        if (q_data_length == "00") and (q_fc != "04"):
            raise ValueError(f"{q_fc} supposed to be read 0x04")
        if (q_data_length != "00") and (q_fc != "05"):
            raise ValueError(f"{q_fc} supposed to be write 0x05")

        r_data_length = int(self.response_header[9], base=16)
        data = self.response_payload[2:]
        if len(data) != r_data_length:
            raise ValueError(f"r_data_length: {r_data_length}, expected: {len(data)}")

        q_item_count = int(self.query_payload[1], base=16)
        r_item_count = int(self.response_payload[1], base=16)
        if r_item_count != q_item_count:
            raise ValueError(f"item_count {r_item_count} expected: {q_item_count}")


if __name__ == '__main__':
    val = Validator("0300001902f080320300002f0000020004000004010a000004", "0300001902f080320300002f0000020004000004010a000004", 3)
    val.check_payload()
