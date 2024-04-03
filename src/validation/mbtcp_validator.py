class Validator:

    def __init__(self, request, response, end_address):
        self.request = request
        if ":" in request:
            self.request = request[:-1]
        self.response = response
        self._end_address = end_address
        hex_chunks_query = [self.request[i:i + 2] for i in range(0, len(self.request), 2)]
        hex_chunks_response = [self.response[i:i + 2] for i in range(0, len(self.response), 2)]
        self.query_header = hex_chunks_query[:7]
        self.query_payload = hex_chunks_query[7:]
        self.address = int(self.query_payload[1] + self.query_payload[2], base=16)
        self.response_header = hex_chunks_response[:7]
        self.response_payload = hex_chunks_response[7:]

    def check_header_ids(self):
        q_tid = self.query_header[:2]
        r_tid = self.response_header[:2]
        if r_tid != q_tid:
            raise ValueError(f"Trans_ID: {r_tid}, expected: {q_tid}")
        q_pid = self.query_header[2:4]
        r_pid = self.response_header[2:4]
        if r_pid != q_pid:
            raise ValueError(f"Protocol_ID: {r_pid}, expected: {q_pid}")
        q_uid = self.query_header[-1]
        r_uid = self.response_header[-1]
        if r_uid != q_uid:
            raise ValueError(f"Uni_ID: {r_uid}, expected: {q_uid}")
        length = int(self.query_header[5], base=16)
        expected_length = len(self.query_payload)+1
        if length != expected_length:
            raise ValueError(f"length: {length}, expected: {expected_length}")

    def check_payload(self):
        fc = self.response_payload[0]
        q_fc = self.query_payload[0]
        r_fc = self.response_payload[0]

        if r_fc != q_fc:
            # EXCEPTIONS
            if (q_fc == "01") and (r_fc == "81"):
                return
            elif (q_fc == "02") and (r_fc == "82"):
                return
            elif (q_fc == "03") and (r_fc == "83"):
                return
            elif (q_fc == "04") and (r_fc == "84"):
                return
            elif (q_fc == "05") and (r_fc == "85"):
                return
            elif (q_fc == "06") and (r_fc == "86"):
                return
            elif (q_fc == "0f") and (r_fc == "8f"):
                return
            elif (q_fc == "10") and (r_fc == "90"):
                return
            else:
                raise ValueError(f"FC: {r_fc}, expected: {q_fc}")

        if self.address > self._end_address:
            raise ValueError(f"Should have thrown an exception since requested address: {self.address} exceeds: {self._end_address}")

        elif r_fc == q_fc:
            if fc == "01":
                self._read_coils()
            elif fc == "02":
                self._read_discrete_inputs()
            elif fc == "03":
                self._read_holding_registers()
            elif fc == "04":
                self._read_input_registers()
            elif fc == "05":
                self._write_single_coil()
            elif fc == "06":
                self._write_single_register()
            elif fc == "0f":  # 15
                self._write_multiple_coils()
            elif fc == "10":  # 16
                self._write_multiple_registers()
        else:
            raise ValueError(f"Unexpected condition! {fc} - {q_fc} - {r_fc}")

    def _read_coils(self):
        bit_count = int(self.query_payload[-1], base=16)
        byte_count = int(self.response_payload[1], base=16)
        expected_byte_count = int(bit_count / 8)
        if bit_count < 8:
            expected_byte_count = int(bit_count / 8) + 1
        if byte_count != expected_byte_count:
            raise ValueError(f"byte_count: {byte_count}, expected: {expected_byte_count}")

    def _read_discrete_inputs(self):
        self._read_coils()

    def _read_holding_registers(self):
        word_count = int(self.query_payload[-1], base=16)
        num_registers = int(len(self.response_payload[2:]) / 2)
        if num_registers != word_count:
            raise ValueError(f"num_registers: {num_registers}, expected: {word_count}")
        byte_count = int(self.response_payload[1], base=16)
        length_registers = len(self.response_payload[2:])
        if byte_count != length_registers:
            raise ValueError(f"byte_count: {byte_count}, expected: {length_registers}")

    def _read_input_registers(self):
        self._read_holding_registers()

    def _write_single_coil(self):
        if self.response_payload != self.query_payload:
            raise ValueError(f"payload: {self.response_payload}, expected: {self.query_payload}")

    def _write_multiple_coils(self):
        q_ref = self.query_payload[1:3]
        r_ref = self.response_payload[1:3]
        if r_ref != q_ref:
            raise ValueError(f"Reference: {r_ref}, expected: {q_ref}")
        q_bit_count = self.query_payload[3:5]
        r_bit_count = self.response_payload[3:5]
        if r_bit_count != q_bit_count:
            raise ValueError(f"Bit_Count: {r_bit_count}, expected: {q_bit_count}")
        q_byte_count = int(self.query_payload[5], base=16)
        data_length = len(self.query_payload) - len(self.query_payload[:6])
        if data_length != q_byte_count:
            raise ValueError(f"data_length: {data_length}, expected: {q_byte_count}")

    def _write_single_register(self):
        self._write_single_coil()

    def _write_multiple_registers(self):
        q_ref = self.query_payload[1:3]
        r_ref = self.response_payload[1:3]
        if r_ref != q_ref:
            raise ValueError(f"Reference: {r_ref}, expected: {q_ref}")
        q_word_count = self.query_payload[3:5]
        r_word_count = self.response_payload[3:5]
        if r_word_count != q_word_count:
            raise ValueError(f"Word_count: {r_word_count}, expected: {q_word_count}")
        word_count = int(self.query_payload[4], base=16)
        num_registers = int(len(self.query_payload[6:]) / 2)
        if num_registers != word_count:
            raise ValueError(f"num_registers: {num_registers}, expected: {word_count}")
        byte_count = int(self.query_payload[5], base=16)
        bytes_registers = len(self.query_payload[6:])
        if bytes_registers != byte_count:
            raise ValueError(f"bytes_registers: {bytes_registers}, expected: {byte_count}")


if __name__ == '__main__':
    val = Validator("000100000006000100050001", "00010000000400010100", 3)
    val.check_payload()
