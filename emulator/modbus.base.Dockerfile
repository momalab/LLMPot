FROM python:3.10-slim
WORKDIR /app

COPY . /app

RUN pip install -r ./emulator/requirements_modbus.txt

ENV PYTHONPATH "/app/emulator:/app/src"
ENV DOCKER_ENV "True"
