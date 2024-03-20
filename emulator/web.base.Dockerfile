FROM python:3.10-slim
WORKDIR /app

COPY . /app

RUN pip install -r requirements_web.txt

ENV PYTHONPATH /app
ENV DOCKER_ENV "True"
