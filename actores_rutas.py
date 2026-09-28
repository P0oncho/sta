from base_datos import leer_json, guardar_json

def manejar_get_actores(partes):
    lista = leer_json("actores.json")
    
    if len(partes) == 2:
        return 200, lista
        
    elif len(partes) == 3:
        id_buscado = int(partes[2])
        for actor in lista:
            if actor["id"] == id_buscado:
                return 200, actor
        return 404, {"error": "Actor no encontrado"}
        
    return 404, {"error": "Ruta incorrecta"}

def manejar_post_actores(partes, datos):
    if len(partes) == 2:
        lista = leer_json("actores.json")
        id_mas_alto = 0
        for actor in lista:
            if actor["id"] > id_mas_alto:
                id_mas_alto = actor["id"]
                
        nuevo_item = {
            "id": id_mas_alto + 1,
            "nombre": datos["nombre"],
            "año_nacimiento": datos["año_nacimiento"]
        }
        lista.append(nuevo_item)
        guardar_json("actores.json", lista)
        return 201, nuevo_item
        
    return 404, {"error": "Ruta incorrecta"}

def manejar_put_actores(partes, datos):
    if len(partes) == 3:
        id_buscado = int(partes[2])
        lista = leer_json("actores.json")
        
        for i in range(len(lista)):
            if lista[i]["id"] == id_buscado:
                lista[i]["nombre"] = datos["nombre"]
                lista[i]["año_nacimiento"] = datos["año_nacimiento"]
                guardar_json("actores.json", lista)
                return 200, lista[i]
                
        return 404, {"error": "Actor no encontrado"}
    return 404, {"error": "Ruta incorrecta"}

def manejar_patch_actores(partes, datos):
    if len(partes) == 3:
        id_buscado = int(partes[2])
        lista = leer_json("actores.json")
        
        for i in range(len(lista)):
            if lista[i]["id"] == id_buscado:
                if "nombre" in datos:
                    lista[i]["nombre"] = datos["nombre"]
                if "año_nacimiento" in datos:
                    lista[i]["año_nacimiento"] = datos["año_nacimiento"]
                guardar_json("actores.json", lista)
                return 200, lista[i]
                
        return 404, {"error": "Actor no encontrado"}
    return 404, {"error": "Ruta incorrecta"}

def manejar_delete_actores(partes):
    if len(partes) == 3:
        id_buscado = int(partes[2])
        lista_actores = leer_json("actores.json")
        nueva_lista = []
        
        for actor in lista_actores:
            if actor["id"] != id_buscado:
                nueva_lista.append(actor)
                
        if len(lista_actores) != len(nueva_lista):
            guardar_json("actores.json", nueva_lista)
            
            # Borrado en Cascada en películas
            lista_pelis = leer_json("peliculas.json")
            for peli in lista_pelis:
                if id_buscado in peli["actores"]:
                    peli["actores"].remove(id_buscado)
            guardar_json("peliculas.json", lista_pelis)
            
            return 204, {}
            
        return 404, {"error": "Actor no encontrado"}
    return 404, {"error": "Ruta incorrecta"}
