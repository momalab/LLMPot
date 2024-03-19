FROM modbus:1.0
WORKDIR /app

COPY ./src /app/src
COPY ./emulator /app/emulator

EXPOSE 5020

CMD python emulator/server/modbus_app.py
