FROM golang:1.19 AS base

WORKDIR /app

COPY . .

RUN go mod download && go mod verify

# Parece que no hay que instalar nada de momento
#RUN go install .

FROM base AS develop
VOLUME [ "/app" ]

FROM base AS production

# Inicia el servidor
CMD go run .