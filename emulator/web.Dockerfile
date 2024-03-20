FROM web:1.0
WORKDIR /app

EXPOSE 8443

CMD gunicorn --certfile=server/ca.crt --keyfile=server/ca.key --worker-connections 100 --workers 2 -b 0.0.0.0:8443 server.web_app:app
