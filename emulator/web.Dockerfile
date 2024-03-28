FROM web:1.0
WORKDIR /app

EXPOSE 8080

CMD gunicorn --worker-connections 100 --workers 2 -b 0.0.0.0:8080 server.web_app:app
