FROM golang:1.19

WORKDIR /app

COPY . .

RUN go mod download && go mod verify

# Parece que no hay que instalar nada de momento
#RUN go install .
