FROM debian

# Set the Teamspeak version to download
ENV TSV=3.8.0

ENV TS3SERVER_LICENSE=accept

WORKDIR /Users/frenna/teamspeak

RUN apt-get -y update && \
		apt-get upgrade -y && \
    apt-get install -y wget bzip2 && \
    wget http://dl.4players.de/ts/releases/${TSV}/teamspeak3-server_linux_amd64-${TSV}.tar.bz2 && \
    tar -xvf teamspeak3-server_linux_amd64-${TSV}.tar.bz2

#  9987 default voice
# 10011 server query
# 30033 file transport
EXPOSE 9987/udp 10011 30033

WORKDIR /Users/frenna/teamspeak/teamspeak3-server_linux_amd64

ENTRYPOINT sh ts3server_minimal_runscript.sh

#docker build -t "ex01:Dockerfile" .
#docker run -it --rm -p=9987:9987/udp  -p=10011:10011 -p=30033:30033 ex01:Dockerfile