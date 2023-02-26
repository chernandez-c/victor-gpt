FROM golang:1.19 AS BASE

WORKDIR /app

COPY . .

RUN go mod download && go mod verify

# Parece que no hay que instalar nada de momento
#RUN go install .

FROM BASE AS develop
VOLUME [ "/app" ]

FROM BASE AS production

# Inicia el servidor
CMD go run .