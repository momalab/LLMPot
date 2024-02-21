from snap7.server import Server
from snap7.types import wordlen_to_ctypes, WordLen
from snap7.types import srvAreaDB, srvAreaPA, srvAreaTM, srvAreaCT
import logging

def setup_logging():
    logging.basicConfig(format='%(asctime)s %(levelname)-8s %(message)s',
                        level=logging.DEBUG,
                        datefmt='%Y-%m-%d %H:%M:%S')

def start_server():

    setup_logging()
    logging.info("Starting S7comm Server..")
    server = Server()

    size = 2
    DBdata = (wordlen_to_ctypes[WordLen.Byte.value] * size)() #Byte x size = 2 byte > word
    PAdata = (wordlen_to_ctypes[WordLen.Byte.value] * size)()
    TMdata = (wordlen_to_ctypes[WordLen.Byte.value] * size)()
    CTdata = (wordlen_to_ctypes[WordLen.Byte.value] * size)()
    server.register_area(srvAreaDB, 0, DBdata)
    server.register_area(srvAreaPA, 0, PAdata)
    server.register_area(srvAreaTM, 0, TMdata)
    server.register_area(srvAreaCT, 0, CTdata)

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
