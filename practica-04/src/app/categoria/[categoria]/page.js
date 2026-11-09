import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import Category from "@/components/categorias.jsx";

// Lee los params DENTRO del Suspense: así no bloquea el prerender.
async function ContenidoDeCategoria({ params }) {
  const { categoria } = await params;
  const categoriaDecodificada = decodificar(categoria);

  return <PeliculasDeCategoria categoria={categoriaDecodificada} />;
}

async function PeliculasDeCategoria({ categoria }) {
  // Fuerza a que el fetch ocurra en cada petición y no durante el prerender.
  await connection();

  let peliculas;

  try {
    const respuesta = await fetch(`${process.env.API_URL}/peliculas`);

    if (!respuesta.ok) {
      throw new Error(`La API respondió con estado ${respuesta.status}`);
    }

    peliculas = await respuesta.json();
  } catch (error) {
    console.error("Error al cargar las películas:", error);
    return (
      <p>
        No se han podido cargar las películas. Comprueba que la API esté
        funcionando.
      </p>
    );
  }

  const peliculasDeCategoria = peliculas.filter(
    (peli) => peli.categoria === categoria,
  );

  if (peliculasDeCategoria.length === 0) {
    return <p>No hay películas en la categoría «{categoria}».</p>;
  }

  return <Category title={categoria} movies={peliculasDeCategoria} />;
}

function decodificar(valor) {
  try {
    return decodeURIComponent(valor);
  } catch {
    return valor;
  }
}

export default function CategoriaPage({ params }) {
  return (
    <div className="app">
      <header>Mi app de cine</header>

      <Link href="/" className="volver">
        ← Volver a todas las categorías
      </Link>

      <Suspense fallback={<p>Cargando películas...</p>}>
        <ContenidoDeCategoria params={params} />
      </Suspense>
    </div>
  );
}