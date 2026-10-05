from base_datos import leer_json, guardar_json

def manejar_get_actores(partes):
    lista = leer_json("actores.json")
    
    # Obtener todos los actores (/actores)
    if len(partes) == 2:
        return 200, lista
        
    # Obtener un actor concreto (/actores/5)
    elif len(partes) == 3:
        id_buscado = int(partes[2])
        for actor in lista:
            if actor["id"] == id_buscado:
                return 200, actor
        return 404, {"error": "Actor no encontrado"}
        
    return 404, {"error": "Ruta incorrecta"}

def manejar_post_actores(partes, datos):
    # Crear un actor (/actores)
    if len(partes) == 2:
        lista = leer_json("actores.json")
        id_mas_alto = 0
        for actor in lista:
            if actor["id"] > id_mas_alto:
                id_mas_alto = actor["id"]
                
        nuevo_item = {
            "id": id_mas_alto + 1,
            "nombre": datos["nombre"],
            "año_nacimiento": int(datos["ano_nacimiento"])
        }
        lista.append(nuevo_item)
        guardar_json("actores.json", lista)
        return 201, nuevo_item
        
    return 404, {"error": "Ruta incorrecta"}

def manejar_put_actores(partes, datos):
    # Modificar actor completo (/actores/5)
    if len(partes) == 3:
        id_buscado = int(partes[2])
        lista = leer_json("actores.json")
        
        for i in range(len(lista)):
            if lista[i]["id"] == id_buscado:
                lista[i]["nombre"] = datos["nombre"]
                lista[i]["año_nacimiento"] = int(datos["ano_nacimiento"])
                guardar_json("actores.json", lista)
                return 200, lista[i]
                
        return 404, {"error": "Actor no encontrado"}
    return 404, {"error": "Ruta incorrecta"}

def manejar_patch_actores(partes, datos):
    # Modificar actor parcialmente (/actores/5)
    if len(partes) == 3:
        id_buscado = int(partes[2])
        lista = leer_json("actores.json")
        
        for i in range(len(lista)):
            if lista[i]["id"] == id_buscado:
                if "nombre" in datos:
                    lista[i]["nombre"] = datos["nombre"]
                if "año_nacimiento" in datos:
                    lista[i]["año_nacimiento"] = int(datos["ano_nacimiento"])
                guardar_json("actores.json", lista)
                return 200, lista[i]
                
        return 404, {"error": "Actor no encontrado"}
    return 404, {"error": "Ruta incorrecta"}

def manejar_delete_actores(partes):
    # Borrar actor (/actores/5)
    if len(partes) == 3:
        id_buscado = int(partes[2])
        lista_actores = leer_json("actores.json")
        nueva_lista = []
        
        for actor in lista_actores:
            if actor["id"] != id_buscado:
                nueva_lista.append(actor)
                
        if len(lista_actores) != len(nueva_lista):
            guardar_json("actores.json", nueva_lista)
            
            # Borrado en Cascada: Buscamos este ID en las películas y lo eliminamos
            lista_pelis = leer_json("peliculas.json")
            for peli in lista_pelis:
                if id_buscado in peli["actores"]:
                    peli["actores"].remove(id_buscado)
            guardar_json("peliculas.json", lista_pelis)
            
            return 204, {}
            
        return 404, {"error": "Actor no encontrado"}
    return 404, {"error": "Ruta incorrecta"}