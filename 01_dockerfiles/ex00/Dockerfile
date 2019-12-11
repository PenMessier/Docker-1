FROM alpine

RUN apk update && \
    apk upgrade && \
    apk add vim

ENTRYPOINT vim

# docker build -t "ex00:Dockerfile" .
# docker run --rm -ti ex00:Dockerfile