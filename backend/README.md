# Backend principal en Golang


API HTTP genérica para los usos que se nos ocurran 

- Subir y descargar ficheros
- Enviar y recibir mensajes

Ejemplo:

Para enviar mensajes a la bandeja de entrada de alguien, el cliente deberá hacer algo como lo siguiente:

curl -X POST http://localhost:2000/conversation/inbox/victor -d "{\"from\":\"admin\",\"message\":\"prueba_json\"}"

O bien, enviar el mensaje en el query_string:

curl -X POST  http://localhost:2000/conversation/inbox/victor?message=probando


Para recuperar el primer mensaje en la cola, el cliente deberá hacer algo como:

curl -X GET  http://localhost:2000/conversation/inbox/victor 