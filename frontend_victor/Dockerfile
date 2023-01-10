FROM node:16.15.1-slim

# variables de entorno
#ENV NPM_REGISTRY http://mi_registro

# espacio de trabajo
WORKDIR /app

# copiar repositorio
COPY ./client/package*.json ./
COPY ./client/ .

# instalar dependencias
RUN npm install

## Esto lo meto en el compose
#CMD npm start
