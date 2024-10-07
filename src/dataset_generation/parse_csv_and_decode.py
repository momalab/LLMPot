import csv

from pymodbus.constants import Endian
from pymodbus.payload import BinaryPayloadDecoder

from cfg import DATASET_PARSED

import matplotlib.pyplot as plt

with open(f'{DATASET_PARSED}/mbtcp-testbed.json/mbtcp-testbed-sp80-c1-s1600.csv', 'r') as file:
    reader = csv.reader(file)

    next(reader)

    values_dict = {}
    values_dict['time'] = []
    values_dict['ws'] = []
    for row in reader:
        print(row)
        time = row[0].split('|')[0]
        hex_value = row[1][len(row[1])-4:]
        print(f"hex_value: {hex_value}")
        decimal_value = int(hex_value, 16)
        decoder = BinaryPayloadDecoder.fromRegisters([decimal_value], Endian.BIG, wordorder=Endian.LITTLE)
        print(f"read_holding_registers: {decoder.decode_16bit_uint()}")

        values_dict['time'].append(row[0].split('|')[0])
        values_dict['ws'].append(decimal_value)


# import plotly.graph_objects as go

# fig = go.Figure(data=go.Scatter(x=values_dict['time'], y=values_dict['ws']))
# fig.update_layout(xaxis_title='Time', yaxis_title='WS', title='WS vs Time')
# fig.update_layout(plot_bgcolor='white')  # Set the background color to white
# fig.show()

plt.plot(values_dict['time'], values_dict['ws'])
plt.xticks(range(0, len(values_dict['time']), 100))
plt.xlabel('Time')
plt.ylabel('WS')
plt.title('WS vs Time')
# plt.show()
plt.savefig('/Users/cv43/nyuad/source/ICSPot/src/dataset_generation/plot.pdf')
