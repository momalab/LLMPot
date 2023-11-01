import logging

from logging.handlers import TimedRotatingFileHandler


class TheLogger(logging.Logger):

    def __init__(self, name: str, path: str):
        super().__init__(name)
        logging.root.setLevel(logging.INFO)

        log_formatter = logging.Formatter("%(asctime)s [%(threadName)-12.12s] [%(levelname)-5.5s]  %(message)s")

        file_handler = TimedRotatingFileHandler(filename=f"{path}/{name}", when="midnight", backupCount=100)
        file_handler.setFormatter(log_formatter)
        logging.root.addHandler(file_handler)

        console_handler = logging.StreamHandler()
        console_handler.setFormatter(log_formatter)
        logging.root.addHandler(console_handler)
