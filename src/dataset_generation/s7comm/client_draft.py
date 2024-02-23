from snap7.util import get_word, set_word, get_bool

def read_temperature(client: Client, data_block, address, num_bytes):
    try:
        temperature_status = client.read_area(Areas.DB, data_block, address, num_bytes)
        print(f"Temp at {data_block} is: {get_word(temperature_status, 0)}")
        return temperature_status
    except RuntimeError:
        print("----- Exception -----")
    except IndexError:
        print("----- Exception -----")


def write_temperature(client: Client, data_block, temp, address):
    try:
        new_temp = set_word(bytearray(2), 0, temp)
        temperature_update = client.write_area(Areas.DB, data_block, address, new_temp)
        print(f"Temp at {data_block} updated to: {get_word(new_temp, 0)}")
        return temperature_update
    except RuntimeError:
        print("----- Exception -----")
    except IndexError:
        print("----- Exception -----")


def read_cooling(client: Client, data_block, address, num_bytes):
    try:
        cooling_system_status = client.read_area(Areas.MK, data_block, address, num_bytes)
        print(f"Cooling at {data_block} is: {get_bool(cooling_system_status, 0, 0)}")
        return cooling_system_status
    except RuntimeError:
        print("----- Exception -----")
    except IndexError:
        print("----- Exception -----")


def write_cooling(client: Client, data_block, cool, address):
    try:
        cooling_system_update = client.write_area(Areas.MK, data_block, address, cool)
        print(f"Cooling at {data_block} updated to: {get_bool(cool, 0, 0)}")
        return cooling_system_update
    except RuntimeError:
        print("----- Exception -----")
    except IndexError:
        print("----- Exception -----")