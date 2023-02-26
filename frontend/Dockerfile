FROM node:16.15.1-slim AS BASE

# variables de entorno
#ENV NPM_REGISTRY http://mi_registro

# espacio de trabajo
WORKDIR /app

# copiar repositorio
COPY ./client/package*.json ./
COPY ./client/ .

# instalar dependencias
RUN npm install


FROM BASE AS develop
VOLUME [ "/app" ]


FROM BASE AS production
# Inicia el servidor
CMD npm start