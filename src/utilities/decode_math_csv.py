import json
from pymodbus.constants import Endian
from pymodbus.payload import BinaryPayloadDecoder

def parse_jsonl(file_path):
    new_lines = []
    with open(file_path, 'r') as file:
        for line in file:
            if line.__contains__('source_text,target_text\n'):
                continue

            context = line.split(':')[0][-8:]
            response = line.rsplit(',')[1][-9:-1]

            context_parts = [context[:4], context[4:]]
            response_parts = [response[:4], response[4:]]

            print(response_parts)

            i_dec = BinaryPayloadDecoder.fromRegisters([int(context_parts[0], 16), int(context_parts[1], 16)], Endian.BIG, wordorder=Endian.LITTLE)
            r_dec = BinaryPayloadDecoder.fromRegisters([int(response_parts[0], 16), int(response_parts[1], 16)], Endian.BIG, wordorder=Endian.LITTLE)

            i_dec = i_dec.decode_32bit_float()
            r_dec = r_dec.decode_32bit_float()

            # Create a new dictionary with the updated values
            new_data = {
                'i_dec': i_dec,
                'r_dec': r_dec,
            }

            new_lines.append(new_data)

    new_file_path = './test.jsonl'
    with open(new_file_path, 'w') as new_file:
        for line in new_lines:
            new_file.write(json.dumps(line) + '\n')


parse_jsonl('/media/shared/ICSPot/outputs/datasets/parsed/mbtcp-expo10-c1-s1024.csv')