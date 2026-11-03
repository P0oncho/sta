import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// Los JSON viven en la carpeta "data" de la raíz del proyecto.
const CARPETA_DATOS = path.join(process.cwd(), "data");

export async function leerJson(nombreArchivo) {
  const texto = await readFile(path.join(CARPETA_DATOS, nombreArchivo), "utf-8");
  return JSON.parse(texto);
}

export async function guardarJson(nombreArchivo, datos) {
  const textoJson = JSON.stringify(datos, null, 4);
  await writeFile(path.join(CARPETA_DATOS, nombreArchivo), textoJson, "utf-8");
}
