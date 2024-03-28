import logging
import os

from logging.handlers import TimedRotatingFileHandler

from pytorch_lightning.utilities import rank_zero_only


class TheLogger(logging.Logger):

    def __init__(self, name: str, path: str):
        super().__init__(name)
        logging.root.setLevel(logging.INFO)

        log_formatter = logging.Formatter("%(asctime)s [%(threadName)-12.12s] [%(levelname)-5.5s]  %(message)s")

        os.makedirs(path, exist_ok=True)

        file_handler = TimedRotatingFileHandler(filename=f"{path}/{name}", when="midnight", backupCount=1000)
        file_handler.setFormatter(log_formatter)
        self.addHandler(file_handler)

        console_handler = logging.StreamHandler()
        console_handler.setFormatter(log_formatter)
        self.addHandler(console_handler)

    @rank_zero_only
    def info(self, msg, *args, **kwargs):
        super().info(msg, *args, **kwargs)

    @rank_zero_only
    def error(self, msg, *args, **kwargs):
        super().info(msg, *args, **kwargs)

    @rank_zero_only
    def warning(self, msg, *args, **kwargs):
        super().info(msg, *args, **kwargs)

    @rank_zero_only
    def debug(self, msg, *args, **kwargs):
        super().info(msg, *args, **kwargs)
