FROM python:3.10-slim AS python-base

ARG CHECKPOINT_PATH
ARG EXPERIMENT_PATH

WORKDIR /app

COPY ./requirements.txt /app
COPY ./emulator/requirements_modbus.txt /app

RUN pip install -r ./requirements_modbus.txt

ENV PYTHONPATH "/app/emulator:/app/src"
ENV DOCKER_ENV "True"

FROM python-base AS model
WORKDIR /app

COPY ${CHECKPOINT_PATH} /app/checkpoints/honeypot.json

FROM model AS modbus

COPY ./src /app/src
COPY ./emulator /app/emulator
COPY ${EXPERIMENT_PATH} /app/experiments/honeypot.json

EXPOSE 5020

CMD python emulator/server/modbus_app.py
