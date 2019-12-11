FROM node:latest

RUN npm install -g json-server

# 1. It is possible to copy app files to the docker VM with command 
# COPY people /data/people
# 2. Or mount app from host to Volume when running container

WORKDIR /data/people
VOLUME /data/people

EXPOSE 3000

ADD run.sh /run.sh
ENTRYPOINT ["bash", "/run.sh"]

# Or use an entrypoint instead of run.sh:
# ENTRYPOINT ["json-server", "-H", "0.0.0.0", "--watch", "persons.json", "--static", "./" ]

# docker build -t json-server Documents/docker/02_bonus/json/

# 1.
# docker run -d -it --name people -p 3000:3000 \
# -v /Users/frenna/Documents/docker/02_bonus/json/people:/data/people json

# 2.
# docker run -d -it --name people -p 3000:3000 json