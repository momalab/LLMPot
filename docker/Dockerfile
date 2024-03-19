FROM ubuntu:latest

RUN apt-get update && apt-get upgrade -y && apt-get install -y nmap python2 git build-essential net-tools iputils-ping vim
RUN apt-get install -y libevent-dev libdumbnet-dev libpcap-dev libpcre3-dev libedit-dev bison flex libtool zlib1g-dev

RUN ln -s /usr/bin/python2 /usr/local/bin/python

RUN git clone https://github.com/DataSoft/Honeyd.git
WORKDIR /Honeyd
#RUN git checkout honeyd-1.6.7
COPY makefile_git_diff.patch .
COPY mac_address.patch .
RUN git apply makefile_git_diff.patch
RUN git apply mac_address.patch

RUN ./autogen.sh
RUN ./configure
RUN make
RUN make install

COPY wago.conf .

EXPOSE 80 22 502

#ENTRYPOINT ["honeyd"]
#CMD ["-d", "-f", "/Honeyd/wago.conf", "-i", "eth0"]
