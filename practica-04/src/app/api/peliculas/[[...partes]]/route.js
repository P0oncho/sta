import {
  manejarGetPeliculas,
  manejarPostPeliculas,
  manejarPutPeliculas,
  manejarPatchPeliculas,
  manejarDeletePeliculas,
} from "@/app/lib/peliculas_rutas.js";
import { leerDatos, partesDeLaRuta, responder } from "@/app/lib/peticiones.js";

export async function GET(_request, { params }) {
  const { partes } = await params;
  const [codigo, respuesta] = await manejarGetPeliculas(
    partesDeLaRuta(partes, "peliculas"),
  );
  return responder(codigo, respuesta);
}

export async function POST(request, { params }) {
  const { partes } = await params;
  const datos = await leerDatos(request);
  const [codigo, respuesta] = await manejarPostPeliculas(
    partesDeLaRuta(partes, "peliculas"),
    datos,
  );
  return responder(codigo, respuesta);
}

export async function PUT(request, { params }) {
  const { partes } = await params;
  const datos = await leerDatos(request);
  const [codigo, respuesta] = await manejarPutPeliculas(
    partesDeLaRuta(partes, "peliculas"),
    datos,
  );
  return responder(codigo, respuesta);
}

export async function PATCH(request, { params }) {
  const { partes } = await params;
  const datos = await leerDatos(request);
  const [codigo, respuesta] = await manejarPatchPeliculas(
    partesDeLaRuta(partes, "peliculas"),
    datos,
  );
  return responder(codigo, respuesta);
}

export async function DELETE(_request, { params }) {
  const { partes } = await params;
  const [codigo, respuesta] = await manejarDeletePeliculas(
    partesDeLaRuta(partes, "peliculas"),
  );
  return responder(codigo, respuesta);
}
