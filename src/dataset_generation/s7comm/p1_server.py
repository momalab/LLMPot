import time
import logging
from snap7.server import Server
from snap7.types import wordlen_to_ctypes, WordLen, srvAreaDB, srvAreaMK


def setup_logging():
    logging.basicConfig(format='%(asctime)s %(levelname)-8s %(message)s',
                        level=logging.DEBUG,
                        datefmt='%Y-%m-%d %H:%M:%S')


def start_server():

    setup_logging()
    logging.info("Starting S7comm Server..")
    server = Server()

    size = 2
    DBdata = (wordlen_to_ctypes[WordLen.Byte.value] * size)()
    MKData = (wordlen_to_ctypes[WordLen.Byte.value] * size)()
    server.register_area(srvAreaDB, 0, DBdata)
    server.register_area(srvAreaMK, 0, MKData)

    try:
        server.start_to('127.0.0.1', 102)
        server.get_status()
    except Exception as e:
        logging.error(f"Failed to start server: {e}")
        raise

    try:
        while True:
            temp = int.from_bytes(DBdata, byteorder='big')
            print(f"temp: {temp}")
            if temp > 25:
                MKData[0] = 1
                cooling_system = MKData[0]
                cooling_status = bool(cooling_system)
                print(f"cooling status is: {cooling_status}")
            else:
                MKData[0] = 0
                cooling_system = MKData[0]
                cooling_status = bool(cooling_system)
                print(f"cooling status is: {cooling_status}")
            time.sleep(0.1)
    except KeyboardInterrupt:
        print("Server is stopping...")
        server.stop()
        server.destroy()

if __name__ == '__main__':
    start_server()
