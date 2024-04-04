FROM cv43nyu/allippe:modbus
WORKDIR /app

COPY ./src /app/src
COPY ./emulator /app/emulator
COPY ./experiments /app/experiments

EXPOSE 5020

CMD python emulator/server/modbus_app.py
