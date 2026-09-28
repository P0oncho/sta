Github Pages
https://p0oncho.github.io/sta/


=========================================================
      DOCUMENTACIÓN DE LA API: PELÍCULAS Y ACTORES
=========================================================
URL Base: http://localhost:8000
Herramienta de prueba recomendada: cURL (Terminal)

=========================================================
1. CÓDIGOS DE ESTADO (HTTP STATUS CODES)
=========================================================
- 200 OK          : Petición correcta.
- 201 Created     : Recurso creado con éxito.
- 204 No Content  : Borrado con éxito (no devuelve texto).
- 400 Bad Request : Petición mal formada.
- 404 Not Found   : Ruta o ID no existe.
- 500 Server Error: Error interno del servidor.

=========================================================
2. RECURSO: PELÍCULAS (/peliculas)
=========================================================

--- OBTENER TODAS LAS PELÍCULAS ---
Comando : curl -X GET "http://localhost:8000/peliculas"
Salida  : 200 OK (Array JSON con todas las películas)

--- OBTENER UNA PELÍCULA POR ID ---
Comando : curl -X GET "http://localhost:8000/peliculas/1"
Salida  : 200 OK
{
  "id": 1, 
  "nombre": "Matrix", 
  "año": 1999, 
  "actores":  [
    "Keanu Reeves",
    "Carrie-Anne Moss",
    "Laurence Fishburne"
  ]

}

--- CREAR UNA PELÍCULA ---
Comando : curl -X POST "http://localhost:8000/peliculas?nombre=Dune&año=2021"
Salida  : 201 Created (Devuelve la película creada con su nuevo ID)

--- MODIFICAR PELÍCULA COMPLETA ---
Comando : curl -X PUT "http://localhost:8000/peliculas/1?nombre=Dune Parte 2&año=2024"
Salida  : 200 OK (Devuelve la película con los datos reemplazados)

--- MODIFICAR PELÍCULA PARCIALMENTE ---
Comando : curl -X PATCH "http://localhost:8000/peliculas/1?año=2025"
Salida  : 200 OK (Devuelve la película actualizada)

--- BORRAR UNA PELÍCULA ---
Comando : curl -X DELETE "http://localhost:8000/peliculas/1"
Salida  : 204 No Content (No imprime nada en consola, solo vuelve al prompt)


=========================================================
3. RECURSO: ACTORES (/actores)
=========================================================

--- OBTENER TODOS LOS ACTORES ---
Comando : curl -X GET "http://localhost:8000/actores"
Salida  : 200 OK (Array JSON con todos los actores)

--- OBTENER UN ACTOR POR ID ---
Comando : curl -X GET "http://localhost:8000/actores/1"
Salida  : 200 OK (JSON del actor solicitado)

--- CREAR UN ACTOR ---
Comando : curl -X POST "http://localhost:8000/actores?nombre=Zendaya Maree&año_nacimiento=1996"
Salida  : 201 Created (Devuelve el actor creado con su ID)

--- MODIFICAR ACTOR (COMPLETO O PARCIAL) ---
Comando : curl -X PATCH "http://localhost:8000/actores/1?nombre=Keanu Charles Reeves"
Salida  : 200 OK 

--- BORRAR UN ACTOR ---
Comando : curl -X DELETE "http://localhost:8000/actores/1"
Info    : Borrado en cascada. Elimina al actor y busca en peliculas.json para borrar su ID de cualquier reparto.
Salida  : 204 No Content


=========================================================
4. RECURSO: RELACIONES (REPARTO)
=========================================================

--- AÑADIR UN ACTOR A UNA PELÍCULA ---
Comando : curl -X POST "http://localhost:8000/peliculas/1/actores?id_actor=2"
Salida  : 200 OK (Devuelve la película con el actor añadido)

--- QUITAR UN ACTOR DE UNA PELÍCULA ---
Comando : curl -X DELETE "http://localhost:8000/peliculas/1/actores/2"
Salida  : 200 OK (Devuelve la película sin el actor ID 2)
