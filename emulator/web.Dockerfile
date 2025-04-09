FROM python:3.10-slim AS python-base
WORKDIR /app

RUN apt-get -y update && apt-get -y install gunicorn

COPY ./requirements.txt /app
COPY ./emulator/requirements_web.txt /app
RUN pip install -r requirements_web.txt

ARG MONGO_PWD
ENV PYTHONPATH "/app/emulator:/app/src"
ENV DOCKER_ENV "True"
ENV MONGO_PWD ${MONGO_PWD}

FROM python-base AS web
WORKDIR /app

COPY ./src /app/src
COPY ./emulator /app/emulator

EXPOSE 8080

CMD gunicorn --worker-connections 100 --workers 2 -b 0.0.0.0:8080 server.web_app:app
