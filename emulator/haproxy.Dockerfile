FROM haproxy:latest

COPY ./certificates /usr/local/etc/haproxy/certificates
COPY haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
