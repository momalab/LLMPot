import pandas as pd
import ipinfo
import json


def get_ip_info(ip):
    try:
        details = handler.getDetails(ip)
        return {
            'IP': details.ip,
            'Country': details.country,
        }
    except Exception as e:
        return {'error': str(e), 'IP': ip}


# df1 = pd.read_csv('ips.csv', header=None)
df2 = pd.read_csv('ips.csv')
print(len(df2))
exit()
access_token = '0ebf08812946ec'
handler = ipinfo.getHandler(access_token)

country_count = {}
unknown_ips = []

for index, row in df2.iterrows():
    ip = row['ip']
    info = get_ip_info(ip)
    country = info.get('Country')
    if country:
        if country in country_count:
            country_count[country] += 1
        else:
            country_count[country] = 1
    else:
        unknown_ips.append(info['IP'])

# with open('unknown_ips.log', 'w') as log_file:
#     for ip in unknown_ips:
#         log_file.write(ip + '\n')

with open('country_counts.json', 'w') as json_file:
    json.dump(country_count, json_file, indent=4)