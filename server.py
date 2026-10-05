import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qsl

import peliculas_rutas
import actores_rutas

class MiAPI(BaseHTTPRequestHandler):
    
    def mandar_respuesta(self, codigo, diccionario):
        self.send_response(codigo)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        texto = json.dumps(diccionario)
        self.wfile.write(texto.encode('utf-8'))

    def leer_datos(self):
        # 1. Arreglamos la codificación de la ñ
        ruta_arreglada = self.path.encode('latin-1').decode('utf-8')
        
        # 2. Extraemos los parámetros brutos
        parametros = urlparse(ruta_arreglada).query
        lista_parametros = parse_qsl(parametros)
        
        datos = {}
        for clave, valor in lista_parametros:
            if clave in datos:
                # Si la clave ya existe y es una lista, añadimos el valor
                if isinstance(datos[clave], list):
                    datos[clave].append(valor)
                # Si existe pero aún no es lista, la convertimos
                else:
                    datos[clave] = [datos[clave], valor]
            else:
                # Si no existe, la guardamos normalmente
                datos[clave] = valor
                
        return datos

    def do_GET(self):
        # Separa la ruta base ("/actores") de los parámetros
        url_limpia = urlparse(self.path).path
        partes = url_limpia.split('/') 

        if len(partes) > 1 and partes[1] == "peliculas":
            codigo, respuesta = peliculas_rutas.manejar_get_peliculas(partes)
            self.mandar_respuesta(codigo, respuesta)
            
        elif len(partes) > 1 and partes[1] == "actores":
            codigo, respuesta = actores_rutas.manejar_get_actores(partes)
            self.mandar_respuesta(codigo, respuesta)
            
        else:
            self.mandar_respuesta(404, {"error": "Ruta incorrecta"})
            
    def do_POST(self):
        url_limpia = urlparse(self.path).path
        partes = url_limpia.split('/')
        datos = self.leer_datos()
        
        if len(partes) > 1 and partes[1] == "peliculas":
            codigo, respuesta = peliculas_rutas.manejar_post_peliculas(partes, datos)
            self.mandar_respuesta(codigo, respuesta)
            
        elif len(partes) > 1 and partes[1] == "actores":
            codigo, respuesta = actores_rutas.manejar_post_actores(partes, datos)
            self.mandar_respuesta(codigo, respuesta)
            
        else:
            self.mandar_respuesta(404, {"error": "Ruta incorrecta"})

    def do_PUT(self):
        url_limpia = urlparse(self.path).path
        partes = url_limpia.split('/')
        datos = self.leer_datos()
        
        if len(partes) > 1 and partes[1] == "peliculas":
            codigo, respuesta = peliculas_rutas.manejar_put_peliculas(partes, datos)
            self.mandar_respuesta(codigo, respuesta)
            
        elif len(partes) > 1 and partes[1] == "actores":
            codigo, respuesta = actores_rutas.manejar_put_actores(partes, datos)
            self.mandar_respuesta(codigo, respuesta)
            
        else:
            self.mandar_respuesta(404, {"error": "Ruta incorrecta"})

    def do_PATCH(self):
        url_limpia = urlparse(self.path).path
        partes = url_limpia.split('/')
        datos = self.leer_datos()
        
        if len(partes) > 1 and partes[1] == "peliculas":
            codigo, respuesta = peliculas_rutas.manejar_patch_peliculas(partes, datos)
            self.mandar_respuesta(codigo, respuesta)
            
        elif len(partes) > 1 and partes[1] == "actores":
            codigo, respuesta = actores_rutas.manejar_patch_actores(partes, datos)
            self.mandar_respuesta(codigo, respuesta)
            
        else:
            self.mandar_respuesta(404, {"error": "Ruta incorrecta"})

    def do_DELETE(self):
        url_limpia = urlparse(self.path).path
        partes = url_limpia.split('/')
        
        if len(partes) > 1 and partes[1] == "peliculas":
            codigo, respuesta = peliculas_rutas.manejar_delete_peliculas(partes)
            self.mandar_respuesta(codigo, respuesta)
            
        elif len(partes) > 1 and partes[1] == "actores":
            codigo, respuesta = actores_rutas.manejar_delete_actores(partes)
            self.mandar_respuesta(codigo, respuesta)
            
        else:
            self.mandar_respuesta(404, {"error": "Ruta incorrecta"})

if __name__ == '__main__':
    puerto = 8000
    servidor = HTTPServer(('localhost', puerto), MiAPI)
    print("Servidor funcionando en el puerto", puerto)
    servidor.serve_forever()