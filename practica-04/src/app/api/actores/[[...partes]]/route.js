import {
  manejarGetActores,
  manejarPostActores,
  manejarPutActores,
  manejarPatchActores,
  manejarDeleteActores,
} from "@/app/lib/actores_rutas.js";
import { leerDatos, partesDeLaRuta, responder } from "@/app/lib/peticiones.js";

export async function GET(_request, { params }) {
  const { partes } = await params;
  const [codigo, respuesta] = await manejarGetActores(
    partesDeLaRuta(partes, "actores"),
  );
  return responder(codigo, respuesta);
}

export async function POST(request, { params }) {
  const { partes } = await params;
  const datos = await leerDatos(request);
  const [codigo, respuesta] = await manejarPostActores(
    partesDeLaRuta(partes, "actores"),
    datos,
  );
  return responder(codigo, respuesta);
}

export async function PUT(request, { params }) {
  const { partes } = await params;
  const datos = await leerDatos(request);
  const [codigo, respuesta] = await manejarPutActores(
    partesDeLaRuta(partes, "actores"),
    datos,
  );
  return responder(codigo, respuesta);
}

export async function PATCH(request, { params }) {
  const { partes } = await params;
  const datos = await leerDatos(request);
  const [codigo, respuesta] = await manejarPatchActores(
    partesDeLaRuta(partes, "actores"),
    datos,
  );
  return responder(codigo, respuesta);
}

export async function DELETE(_request, { params }) {
  const { partes } = await params;
  const [codigo, respuesta] = await manejarDeleteActores(
    partesDeLaRuta(partes, "actores"),
  );
  return responder(codigo, respuesta);
}
