FROM python:3.10-slim as python-base
WORKDIR /app

RUN apt-get -y update && apt-get -y install gunicorn

COPY ./requirements.txt /app
COPY ./emulator/requirements_web.txt /app
RUN pip install -r requirements_web.txt

ENV PYTHONPATH "/app/emulator:/app/src"
ENV DOCKER_ENV "True"

FROM python-base as web
WORKDIR /app

COPY ./src /app/src
COPY ./emulator /app/emulator

EXPOSE 8080

CMD gunicorn --worker-connections 100 --workers 2 -b 0.0.0.0:8080 server.web_app:app
