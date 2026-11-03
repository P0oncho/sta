import { leerJson, guardarJson } from "./base_datos.js";

export async function manejarGetActores(partes) {
  const lista = await leerJson("actores.json");

  // Obtener todos los actores (/actores)
  if (partes.length === 2) {
    return [200, lista];
  }

  // Obtener un actor concreto (/actores/5)
  if (partes.length === 3) {
    const idBuscado = Number(partes[2]);
    for (const actor of lista) {
      if (actor["id"] === idBuscado) {
        return [200, actor];
      }
    }
    return [404, { error: "Actor no encontrado" }];
  }

  return [404, { error: "Ruta incorrecta" }];
}

export async function manejarPostActores(partes, datos) {
  // Crear un actor (/actores)
  if (partes.length === 2) {
    const lista = await leerJson("actores.json");

    let idMasAlto = 0;
    for (const actor of lista) {
      if (actor["id"] > idMasAlto) {
        idMasAlto = actor["id"];
      }
    }

    const nuevoItem = {
      id: idMasAlto + 1,
      nombre: datos["nombre"],
      "año_nacimiento": Number(datos["ano_nacimiento"]),
    };

    lista.push(nuevoItem);
    await guardarJson("actores.json", lista);
    return [201, nuevoItem];
  }

  return [404, { error: "Ruta incorrecta" }];
}

export async function manejarPutActores(partes, datos) {
  // Modificar actor completo (/actores/5)
  if (partes.length === 3) {
    const idBuscado = Number(partes[2]);
    const lista = await leerJson("actores.json");

    for (const actor of lista) {
      if (actor["id"] === idBuscado) {
        actor["nombre"] = datos["nombre"];
        actor["año_nacimiento"] = Number(datos["ano_nacimiento"]);
        await guardarJson("actores.json", lista);
        return [200, actor];
      }
    }

    return [404, { error: "Actor no encontrado" }];
  }
  return [404, { error: "Ruta incorrecta" }];
}

export async function manejarPatchActores(partes, datos) {
  // Modificar actor parcialmente (/actores/5)
  if (partes.length === 3) {
    const idBuscado = Number(partes[2]);
    const lista = await leerJson("actores.json");

    for (const actor of lista) {
      if (actor["id"] === idBuscado) {
        if ("nombre" in datos) {
          actor["nombre"] = datos["nombre"];
        }
        if ("ano_nacimiento" in datos) {
          actor["año_nacimiento"] = Number(datos["ano_nacimiento"]);
        }
        await guardarJson("actores.json", lista);
        return [200, actor];
      }
    }

    return [404, { error: "Actor no encontrado" }];
  }
  return [404, { error: "Ruta incorrecta" }];
}

export async function manejarDeleteActores(partes) {
  // Borrar actor (/actores/5)
  if (partes.length === 3) {
    const idBuscado = Number(partes[2]);
    const listaActores = await leerJson("actores.json");

    const nuevaLista = [];
    for (const actor of listaActores) {
      if (actor["id"] !== idBuscado) {
        nuevaLista.push(actor);
      }
    }

    if (listaActores.length !== nuevaLista.length) {
      await guardarJson("actores.json", nuevaLista);

      // Borrado en cascada: buscamos este ID en las películas y lo eliminamos
      const listaPelis = await leerJson("peliculas.json");
      for (const peli of listaPelis) {
        const indice = peli["actores"].indexOf(idBuscado);
        if (indice !== -1) {
          peli["actores"].splice(indice, 1);
        }
      }
      await guardarJson("peliculas.json", listaPelis);

      return [204, {}];
    }

    return [404, { error: "Actor no encontrado" }];
  }
  return [404, { error: "Ruta incorrecta" }];
}
