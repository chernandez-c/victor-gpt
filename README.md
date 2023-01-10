# Victor GPT    


El proyecto cuenta con 4 subproyectos (un servicio cada uno) y un orquestador que se sirve de un **nginx** como proxy.

## Servicios

### frontend_victor

Frontend en `react` con la vista de Victor.

Aquí es donde el interactuará con todo lo que le pongamos

Lo serviremos en el proxy bajo `/`. Lo exponemos en localhost en el puerto `9000`. 


### frontend_admin

Frontend en `react` con la vista de Administrador. 

Lo utilizaremos para hacerle todas las magias a Victor

Se sirve en el proxy bajo `/admin`. Lo exponemos en localhost en el puerto `9001`. 


### backend-principal

Api escrita en `go`. 

Incluiremos aquí todas las utilidades que queramos que corran en el servidor. 

Lo serviremos en el proxy bajo `/api`. Corre en el puerto `2000`.


### ChatGPT-API-server

Api escrita en `go`. 

Para utilizar `ChatGPT` desde nuestra aplicación. Hay que acabar de afinar...

Lo serviremos en el proxy bajo `/chat-gpt`. Corre en el puerto `2001`.


### compose

Utilizamos docker-compose para orquestar todos los contenedores. La configuración del orquestador está alojada en el directorio `compose`.

Además, utilizaremos como proxy un **nginx** configurado dentro del propio proyecto de `compose` (`proxy/nginx.conf`). Este proxy será un 5º servicio.

## ¿Cómo lo pongo a funcionar?

1. Instalar docker y docker-compose
2. Ir al directorio de compose `cd compose`. 
3. "Construimos" el proyecto (Se instalan dependencias y generan los contenedores). Ejecutar `docker-compose build`.
4. Levantamos los contenedores. Ejecutar `docker-compose up`.

Ya debería estar funcionando y podemos ver la web en http://localhost:8080/