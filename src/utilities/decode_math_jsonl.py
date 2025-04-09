import json
from pymodbus.constants import Endian
from pymodbus.payload import BinaryPayloadDecoder

def parse_jsonl(file_path):
    new_lines = []
    with open(file_path, 'r') as file:
        for line in file:
            data = json.loads(line)

            context = data['context'].split(':')[0][-8:]
            response = data['response'][-8:]
            expected_response = data['expected_response'][-8:]

            context_parts = [context[:4], context[4:]]
            response_parts = [response[:4], response[4:]]
            expected_response_parts = [expected_response[:4], expected_response[4:]]

            i_dec = BinaryPayloadDecoder.fromRegisters([int(context_parts[0], 16), int(context_parts[1], 16)], Endian.BIG, wordorder=Endian.LITTLE)
            r_dec = BinaryPayloadDecoder.fromRegisters([int(response_parts[0], 16), int(response_parts[1], 16)], Endian.BIG, wordorder=Endian.LITTLE)
            er_dec = BinaryPayloadDecoder.fromRegisters([int(expected_response_parts[0], 16), int(expected_response_parts[1], 16)], Endian.BIG, wordorder=Endian.LITTLE)

            i_dec = i_dec.decode_32bit_float()
            r_dec = r_dec.decode_32bit_float()
            er_dec = er_dec.decode_32bit_float()

            # Create a new dictionary with the updated values
            new_data = {
                'context': data['context'],
                'response': data['response'],
                'expected_response': data['expected_response'],
                'i_dec': i_dec,
                'r_dec': r_dec,
                'er_dec': er_dec
            }

            new_lines.append(new_data)

    new_file_path = './epoch-22_val_type-validator-new.jsonl'
    with open(new_file_path, 'w') as new_file:
        for line in new_lines:
            new_file.write(json.dumps(line) + '\n')


parse_jsonl('/media/shared/ICSPot/checkpoints/mbtcp-math-functions.json/mbtcp-expo10-c1-s4096/20240426T2033/epoch-26_val_type-exact.jsonl')