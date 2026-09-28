import json
from http.server import BaseHTTPRequestHandler, HTTPServer

# Importamos nuestros archivos como si fueran herramientas
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
        tamaño = int(self.headers.get('Content-Length', 0))
        if tamaño > 0:
            cuerpo = self.rfile.read(tamaño)
            return json.loads(cuerpo)
        return {}

    def do_GET(self):
        url = self.path
        partes = url.split('/') 

        # Enrutador
        if len(partes) > 1 and partes[1] == "peliculas":
            codigo, respuesta = peliculas_rutas.manejar_get_peliculas(partes)
            self.mandar_respuesta(codigo, respuesta)
            
        elif len(partes) > 1 and partes[1] == "actores":
            codigo, respuesta = actores_rutas.manejar_get_actores(partes)
            self.mandar_respuesta(codigo, respuesta)
            
        else:
            self.mandar_respuesta(404, {"error": "Ruta incorrecta"})
            
    def do_POST(self):
        url = self.path
        partes = url.split('/')
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
        url = self.path
        partes = url.split('/')
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
        url = self.path
        partes = url.split('/')
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
        url = self.path
        partes = url.split('/')
        
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
