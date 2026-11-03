// Utilidades compartidas por las Route Handlers de la API.

// Reconstruye el array de "partes" con el mismo formato que usaba server.py:
// /api/actores/5 -> ["", "actores", "5"]
export function partesDeLaRuta(partes, recurso) {
  return ["", recurso, ...(partes ?? [])];
}

// Lee los datos enviados: JSON en el body o parámetros en la URL.
export async function leerDatos(request) {
  const tipoContenido = request.headers.get("content-type") ?? "";

  if (tipoContenido.includes("application/json")) {
    try {
      return await request.json();
    } catch {
      return {};
    }
  }

  const datos = {};
  for (const [clave, valor] of request.nextUrl.searchParams) {
    if (clave in datos) {
      if (Array.isArray(datos[clave])) {
        datos[clave].push(valor);
      } else {
        datos[clave] = [datos[clave], valor];
      }
    } else {
      datos[clave] = valor;
    }
  }
  return datos;
}

// Construye la respuesta HTTP. Un 204 no puede llevar cuerpo.
export function responder(codigo, cuerpo) {
  if (codigo === 204) {
    return new Response(null, { status: 204 });
  }
  return Response.json(cuerpo, { status: codigo });
}
