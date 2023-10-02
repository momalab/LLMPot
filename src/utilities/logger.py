import datetime
import logging

from logging.handlers import TimedRotatingFileHandler

root = logging.getLogger()
root.setLevel(logging.INFO)

logFormatter = logging.Formatter("%(asctime)s [%(threadName)-12.12s] [%(levelname)-5.5s]  %(message)s")

fileHandler = TimedRotatingFileHandler(filename='log', when="midnight", backupCount=100)
fileHandler.setFormatter(logFormatter)
root.addHandler(fileHandler)

consoleHandler = logging.StreamHandler()
consoleHandler.setFormatter(logFormatter)
root.addHandler(consoleHandler)
