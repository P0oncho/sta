import { leerJson, guardarJson } from "./base_datos.js";

export async function manejarGetPeliculas(partes) {
  const listaPelis = await leerJson("peliculas.json");
  const listaActores = await leerJson("actores.json");

  // Obtener todas las películas (/peliculas)
  if (partes.length === 2) {
    const pelisListasParaEnviar = [];

    for (const peli of listaPelis) {
      const nombresActores = [];

      for (const idActor of peli["actores"]) {
        for (const actor of listaActores) {
          if (actor["id"] === idActor) {
            nombresActores.push(actor["nombre"]);
          }
        }
      }

      const peliTerminada = {
        id: peli["id"],
        nombre: peli["nombre"],
        "año": peli["año"],
        categoria: peli["categoria"],
        actores: nombresActores,
      };
      pelisListasParaEnviar.push(peliTerminada);
    }

    return [200, pelisListasParaEnviar];
  }

  // Obtener una película concreta (/peliculas/5)
  if (partes.length === 3) {
    const idBuscado = Number(partes[2]);

    for (const peli of listaPelis) {
      if (peli["id"] === idBuscado) {
        const nombresActores = [];

        for (const idActor of peli["actores"]) {
          for (const actor of listaActores) {
            if (actor["id"] === idActor) {
              nombresActores.push(actor["nombre"]);
            }
          }
        }

        const peliTerminada = {
          id: peli["id"],
          nombre: peli["nombre"],
          "año": peli["año"],
          categoria: peli["categoria"],
          actores: nombresActores,
        };
        return [200, peliTerminada];
      }
    }

    return [404, { error: "Película no encontrada" }];
  }

  return [404, { error: "Ruta incorrecta" }];
}

export async function manejarPostPeliculas(partes, datos) {
  const lista = await leerJson("peliculas.json");

  // Crear nueva película (/peliculas)
  if (partes.length === 2) {
    let idMasAlto = 0;
    for (const peli of lista) {
      if (peli["id"] > idMasAlto) {
        idMasAlto = peli["id"];
      }
    }

    const nuevoItem = {
      id: idMasAlto + 1,
      nombre: datos["nombre"],
      "año": Number(datos["ano"]),
      categoria: datos["categoria"],
      actores: [],
    };
    lista.push(nuevoItem);
    await guardarJson("peliculas.json", lista);
    return [201, nuevoItem];
  }

  // Añadir actor a película (/peliculas/5/actores)
  if (partes.length === 4 && partes[3] === "actores") {
    const idPeli = Number(partes[2]);

    // 1. Normalizar los datos: asegurarnos de que siempre sea una lista
    let idsNuevos;
    if (Array.isArray(datos["id_actor"])) {
      idsNuevos = datos["id_actor"].map((idActor) => Number(idActor));
    } else {
      idsNuevos = [Number(datos["id_actor"])];
    }

    // 2. Buscar la película y añadir todos los IDs
    for (const peli of lista) {
      if (peli["id"] === idPeli) {
        // Añadimos los IDs y guardamos en disco (solo los números)
        for (const idNuevo of idsNuevos) {
          if (!peli["actores"].includes(idNuevo)) {
            peli["actores"].push(idNuevo);
          }
        }
        await guardarJson("peliculas.json", lista);

        // 3. Hacer el "join" para mostrar los nombres al cliente
        const listaActores = await leerJson("actores.json");
        const nombresActores = [];

        for (const idActorEnPeli of peli["actores"]) {
          for (const actor of listaActores) {
            if (actor["id"] === idActorEnPeli) {
              nombresActores.push(actor["nombre"]);
            }
          }
        }

        // Creamos el paquete final para mostrar
        const peliTerminada = {
          id: peli["id"],
          nombre: peli["nombre"],
          "año": peli["año"],
          categoria: peli["categoria"],
          actores: nombresActores,
        };

        return [200, peliTerminada];
      }
    }

    return [404, { error: "Película no encontrada" }];
  }

  return [404, { error: "Ruta incorrecta" }];
}

export async function manejarPutPeliculas(partes, datos) {
  // Modificar película completa (/peliculas/5)
  if (partes.length === 3) {
    const idBuscado = Number(partes[2]);
    const lista = await leerJson("peliculas.json");

    for (const peli of lista) {
      if (peli["id"] === idBuscado) {
        peli["nombre"] = datos["nombre"];
        peli["año"] = Number(datos["ano"]);
        await guardarJson("peliculas.json", lista);
        return [200, peli];
      }
    }

    return [404, { error: "Película no encontrada" }];
  }
  return [404, { error: "Ruta incorrecta" }];
}

export async function manejarPatchPeliculas(partes, datos) {
  // Modificar película parcialmente (/peliculas/5)
  if (partes.length === 3) {
    const idBuscado = Number(partes[2]);
    const lista = await leerJson("peliculas.json");

    for (const peli of lista) {
      if (peli["id"] === idBuscado) {
        if ("nombre" in datos) {
          peli["nombre"] = datos["nombre"];
        }
        if ("ano" in datos) {
          peli["año"] = Number(datos["ano"]);
        }
        await guardarJson("peliculas.json", lista);
        return [200, peli];
      }
    }

    return [404, { error: "Película no encontrada" }];
  }
  return [404, { error: "Ruta incorrecta" }];
}

export async function manejarDeletePeliculas(partes) {
  const lista = await leerJson("peliculas.json");

  // Borrar película completa (/peliculas/5)
  if (partes.length === 3) {
    const idBuscado = Number(partes[2]);
    const nuevaLista = [];
    for (const peli of lista) {
      if (peli["id"] !== idBuscado) {
        nuevaLista.push(peli);
      }
    }

    if (lista.length !== nuevaLista.length) {
      await guardarJson("peliculas.json", nuevaLista);
      return [204, {}];
    }
    return [404, { error: "Película no encontrada" }];
  }

  // Quitar actor de película (/peliculas/5/actores/2)
  if (partes.length === 5 && partes[3] === "actores") {
    const idPeli = Number(partes[2]);
    const idActor = Number(partes[4]);

    for (const peli of lista) {
      if (peli["id"] === idPeli) {
        const indice = peli["actores"].indexOf(idActor);
        if (indice !== -1) {
          peli["actores"].splice(indice, 1);
        }
        await guardarJson("peliculas.json", lista);
        return [200, peli];
      }
    }
    return [404, { error: "Película o actor no encontrado" }];
  }

  return [404, { error: "Ruta incorrecta" }];
}
