FROM modbus:1.0
WORKDIR /app

COPY ./src /app
COPY ./emulator /app

EXPOSE 5020

CMD python emulator/server/modbus_app.py
