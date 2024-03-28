FROM python:3.10-slim
WORKDIR /app

COPY ./emulator/requirements_modbus.txt /app

RUN pip install -r ./requirements_modbus.txt

COPY . /app

ENV PYTHONPATH "/app/emulator:/app/src"
ENV DOCKER_ENV "True"
