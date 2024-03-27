class Validator:

    def __init__(self, request, response):
        self.request = request
        if ":" in request:
            self.request = request[:-1]
        self.response = response
        hex_chunks_query = [self.request[i:i + 2] for i in range(0, len(self.request), 2)]
        hex_chunks_response = [self.response[i:i + 2] for i in range(0, len(self.response), 2)]
        self.query_header = hex_chunks_query[:7]
        self.query_payload = hex_chunks_query[7:]
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
                pass
            if (q_fc == "03") and (r_fc == "83"):
                pass
            if (q_fc == "05") and (r_fc == "85"):
                pass
            if (q_fc == "06") and (r_fc == "86"):
                pass
            if (q_fc == "15") and (r_fc == "8f"):
                pass
            if (q_fc == "16") and (r_fc == "90"):
                pass
            else:
                raise ValueError(f"FC: {r_fc}, expected: {q_fc}")

        elif r_fc == q_fc:
            if fc == "01":
                self._read_coils()
            if fc == "02":
                self._read_discrete_inputs()
            if fc == "03":
                self._read_holding_registers()
            if fc == "04":
                self._read_input_registers()
            if fc == "05":
                self._write_single_coil()
            if fc == "06":
                self._write_single_register()
            if fc == "0f": # 15
                self._write_multiple_coils()
            if fc == "10": # 16
                self._write_multiple_registers()


    def _read_coils(self):
        bit_count = int(self.query_payload[-1], base=16)
        byte_count = int(self.response_payload[1], base=16)
        expected_byte_count = int(bit_count / 8)
        if bit_count < 8:
            expected_byte_count = int(bit_count / 8) + 1
        if byte_count != expected_byte_count:
            raise ValueError(f"byte_count: {byte_count}, expected: {expected_byte_count}")

    def _read_discrete_inputs(self):
        bit_count = int(self.query_payload[-1], base=16)
        byte_count = int(self.response_payload[1], base=16)
        expected_byte_count = int(bit_count / 8)
        if bit_count < 8:
            expected_byte_count = int(bit_count / 8) + 1
        if byte_count != expected_byte_count:
            raise ValueError(f"byte_count: {byte_count}, expected: {expected_byte_count}")

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
        word_count = int(self.query_payload[-1], base=16)
        num_registers = int(len(self.response_payload[2:]) / 2)
        if num_registers != word_count:
            raise ValueError(f"num_registers: {num_registers}, expected: {word_count}")
        byte_count = int(self.response_payload[1], base=16)
        length_registers = len(self.response_payload[2:])
        if byte_count != length_registers:
            raise ValueError(f"byte_count: {byte_count}, expected: {length_registers}")

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
        if self.response_payload != self.query_payload:
            raise ValueError(f"payload: {self.response_payload}, expected: {self.query_payload}")

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
    val = Validator("00c50000000d0010a149000306000900000000", "00c500000003009002")
    val.check_payload()