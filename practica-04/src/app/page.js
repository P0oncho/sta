import { Suspense } from "react";
import { connection } from "next/server";
import Category from "@/components/categorias.jsx";

async function ListaDePeliculas() {
  // Fuerza a que el fetch ocurra en cada petición y no durante el prerender.
  await connection();

  let peliculas;

  try {
    // El fetch se hace en el servidor: el navegador nunca llama a la API.
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

  const categorias = [...new Set(peliculas.map((peli) => peli.categoria))];

  return categorias.map((categoria) => (
    <Category
      key={categoria}
      title={categoria}
      movies={peliculas.filter((peli) => peli.categoria === categoria)}
    />
  ));
}

export default function Home() {
  return (
    <div className="app">
      <header>Mi app de cine</header>

      <Suspense fallback={<p>Cargando películas...</p>}>
        <ListaDePeliculas />
      </Suspense>
    </div>
  );
}
