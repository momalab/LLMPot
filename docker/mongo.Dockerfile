FROM mongo:latest

RUN mkdir -p /dump

COPY ./dump /dump

RUN mongorestore /dump && mongod
