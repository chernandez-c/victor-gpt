# Victor GPT    

El proyecto cuenta con 2 subproyectos (un cliente y un backend) y un orquestador que se sirve de un **nginx** como proxy.

## Servicios

### frontend

Frontend en `react` con la vista de Víctor.

Aquí es donde el interactuará con todo lo que le pongamos

Lo serviremos en el proxy bajo `/`. Lo exponemos en localhost en el puerto `9000`. 

Los administradores acceden a su vista desde `/admin`.

### backend

Api escrita en `go`. 

Incluiremos aquí todas las utilidades que queramos que corran en el servidor. 

Lo serviremos en el proxy bajo `/api`. Corre en el puerto `2000`.

### compose

Utilizamos docker-compose para orquestar todos los contenedores. La configuración del orquestador está alojada en el directorio `compose`.

Además, utilizaremos como proxy un **nginx** configurado dentro del propio proyecto de `compose` (`proxy/nginx.conf`). Este proxy será un 5º servicio.

## ¿Cómo lo pongo a funcionar?

1. Instalar docker y docker-compose
2. Ir al directorio de compose `cd compose`. 
3. "Construimos" el proyecto (Se instalan dependencias y generan los contenedores). Ejecutar `docker-compose build`.
4. Levantamos los contenedores. Ejecutar `docker-compose up`.

Ya debería estar funcionando y podemos ver la web en http://localhost:8080/
