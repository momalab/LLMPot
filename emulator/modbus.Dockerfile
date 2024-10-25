FROM python:3.10-slim AS python-base

WORKDIR /app

COPY ./requirements.txt /app
COPY ./emulator/requirements_modbus.txt /app
RUN pip install -r ./requirements_modbus.txt

ENV PYTHONPATH "/app/emulator:/app/src"
ENV DOCKER_ENV "True"

ARG EXPERIMENT_PATH
ARG CHECKPOINT_PATH
ARG CHECKPOINT_PATH_TARGET
ARG EXPERIMENT
ARG MONGO_PWD

ENV EXPERIMENT_PATH ${EXPERIMENT_PATH}
ENV EXPERIMENT ${EXPERIMENT}
ENV MONGO_PWD ${MONGO_PWD}

FROM python-base AS model
WORKDIR /app

FROM model AS modbus

COPY ./src /app/src
COPY ./emulator /app/emulator
COPY ${EXPERIMENT_PATH} /app/${EXPERIMENT_PATH}
COPY ${CHECKPOINT_PATH} /app/${CHECKPOINT_PATH_TARGET}

EXPOSE 5020

CMD python emulator/server/modbus_app.py
