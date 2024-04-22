FROM python:3.10-slim as python-base
WORKDIR /app

COPY ./requirements.txt /app
COPY ./emulator/requirements_modbus.txt /app

RUN pip install -r ./requirements_modbus.txt

ENV PYTHONPATH "/app/emulator:/app/src"
ENV DOCKER_ENV "True"

FROM python-base as model
WORKDIR /app

COPY ./checkpoints/honeypot.json /app/checkpoints/honeypot.json

FROM model as modbus

COPY ./src /app/src
COPY ./emulator /app/emulator
COPY ./experiments /app/experiments

EXPOSE 5020

CMD python emulator/server/modbus_app.py
