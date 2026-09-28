from base_datos import leer_json, guardar_json

def manejar_get_peliculas(partes):
    lista_pelis = leer_json("peliculas.json")
    lista_actores = leer_json("actores.json")
    
    # Si piden TODAS las películas (/peliculas)
    if len(partes) == 2:
        pelis_listas_para_enviar = []
        
        for peli in lista_pelis:
            actores_completos = []
            
            # Por cada ID de actor en la película, buscamos sus datos reales
            for id_actor in peli["actores"]:
                for actor in lista_actores:
                    if actor["id"] == id_actor:
                        actores_completos.append(actor["nombre"]) # Guardamos el objeto entero
            
            # Creamos una copia de la película pero con la lista de actores llena
            peli_terminada = {
                "id": peli["id"],
                "nombre": peli["nombre"],
                "año": peli["año"],
                "actores": actores_completos
            }
            pelis_listas_para_enviar.append(peli_terminada)
            
        return 200, pelis_listas_para_enviar
        
    # Si piden UNA película concreta (/peliculas/5)
    elif len(partes) == 3:
        id_buscado = int(partes[2])
        
        for peli in lista_pelis:
            if peli["id"] == id_buscado:
                actores_completos = []
                
                # Hacemos exactamente lo mismo: buscar los datos de sus actores
                for id_actor in peli["actores"]:
                    for actor in lista_actores:
                        if actor["id"] == id_actor:
                            actores_completos.append(actor["nombre"])
                            
                peli_terminada = {
                    "id": peli["id"],
                    "nombre": peli["nombre"],
                    "año": peli["año"],
                    "actores": actores_completos
                }
                return 200, peli_terminada
                
        return 404, {"error": "Película no encontrada"}
        
    return 404, {"error": "Ruta incorrecta"}

def manejar_post_peliculas(partes, datos):
    lista = leer_json("peliculas.json")
    
    # Crear nueva película (/peliculas)
    if len(partes) == 2:
        id_mas_alto = 0
        for peli in lista:
            if peli["id"] > id_mas_alto:
                id_mas_alto = peli["id"]
                
        nuevo_item = {
            "id": id_mas_alto + 1,
            "nombre": datos["nombre"],
            "año": datos["año"],
            "actores": []
        }
        lista.append(nuevo_item)
        guardar_json("peliculas.json", lista)
        return 201, nuevo_item
        
    # Añadir actor a película (/peliculas/5/actores)
    elif len(partes) == 4 and partes[3] == "actores":
        id_peli = int(partes[2])
        id_actor = datos["id_actor"]
        
        for peli in lista:
            if peli["id"] == id_peli:
                if id_actor not in peli["actores"]:
                    peli["actores"].append(id_actor)
                guardar_json("peliculas.json", lista)
                return 200, peli
        return 404, {"error": "Película no encontrada"}
        
    return 404, {"error": "Ruta incorrecta"}

def manejar_put_peliculas(partes, datos):
    if len(partes) == 3:
        id_buscado = int(partes[2])
        lista = leer_json("peliculas.json")
        
        for i in range(len(lista)):
            if lista[i]["id"] == id_buscado:
                lista[i]["nombre"] = datos["nombre"]
                lista[i]["año"] = datos["año"]
                lista[i]["actores"] = datos["actores"]
                guardar_json("peliculas.json", lista)
                return 200, lista[i]
                
        return 404, {"error": "Película no encontrada"}
    return 404, {"error": "Ruta incorrecta"}

def manejar_patch_peliculas(partes, datos):
    if len(partes) == 3:
        id_buscado = int(partes[2])
        lista = leer_json("peliculas.json")
        
        for i in range(len(lista)):
            if lista[i]["id"] == id_buscado:
                if "nombre" in datos:
                    lista[i]["nombre"] = datos["nombre"]
                if "año" in datos:
                    lista[i]["año"] = datos["año"]
                if "actores" in datos:
                    lista[i]["actores"] = datos["actores"]
                guardar_json("peliculas.json", lista)
                return 200, lista[i]
                
        return 404, {"error": "Película no encontrada"}
    return 404, {"error": "Ruta incorrecta"}

def manejar_delete_peliculas(partes):
    lista = leer_json("peliculas.json")
    
    # Borrar película completa (/peliculas/5)
    if len(partes) == 3:
        id_buscado = int(partes[2])
        nueva_lista = []
        for peli in lista:
            if peli["id"] != id_buscado:
                nueva_lista.append(peli)
                
        if len(lista) != len(nueva_lista):
            guardar_json("peliculas.json", nueva_lista)
            return 204, {}
        return 404, {"error": "Película no encontrada"}
        
    # Quitar actor de película (/peliculas/5/actores/2)
    elif len(partes) == 5 and partes[3] == "actores":
        id_peli = int(partes[2])
        id_actor = int(partes[4])
        
        for peli in lista:
            if peli["id"] == id_peli:
                if id_actor in peli["actores"]:
                    peli["actores"].remove(id_actor)
                guardar_json("peliculas.json", lista)
                return 200, peli
        return 404, {"error": "Película o actor no encontrado"}
        
    return 404, {"error": "Ruta incorrecta"}
