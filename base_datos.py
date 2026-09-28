import json

def leer_json(nombre_archivo):
    f = open(nombre_archivo, "r", encoding="utf-8")
    texto = f.read()
    f.close()
    return json.loads(texto)

def guardar_json(nombre_archivo, datos):
    f = open(nombre_archivo, "w", encoding="utf-8")
    texto_json = json.dumps(datos, indent=4)
    f.write(texto_json)
    f.close()
