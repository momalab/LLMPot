from snap7.server import Server
from snap7.types import wordlen_to_ctypes, WordLen
from snap7.types import srvAreaDB, srvAreaMK
import logging

def setup_logging():
    logging.basicConfig(format='%(asctime)s %(levelname)-8s %(message)s',
                        level=logging.DEBUG,
                        datefmt='%Y-%m-%d %H:%M:%S')

def start_server():

    setup_logging()
    logging.info("Starting S7comm Server..")
    server = Server()

    size = 100
    DBdata = (wordlen_to_ctypes[WordLen.Byte.value] * size)() #Byte x size = 2 byte > word
    DBdata_1 = (wordlen_to_ctypes[WordLen.Byte.value] * size)()
    MKdata = (wordlen_to_ctypes[WordLen.Byte.value] * size)()
    # MKdata_1 = (wordlen_to_ctypes[WordLen.Bit.value] * size)() #ERROR

    server.register_area(srvAreaDB, 0, DBdata)
    server.register_area(srvAreaDB, 1, DBdata_1)
    server.register_area(srvAreaMK, 0, MKdata)
    # server.register_area(srvAreaMK, 1, MKdata_1) #ERROR cant register more than 1

    try:
        server.start_to("127.0.0.1", 102)
        server.get_status()
    except Exception as e:
        logging.error(f"Failed to start server: {e}")
        raise

    try:
        while True:
            continue
    except KeyboardInterrupt:
        print("Server is stopping...")
        server.stop()
        server.destroy()

if __name__ == '__main__':
    start_server()
