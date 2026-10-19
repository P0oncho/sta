
import { useEffect, useState } from 'react';
import './App.css';
import Category from './components/categorias';

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/peliculas')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('Error al obtener las películas');
        }

        return respuesta.json();
      })
      .then((datos) => {
        setPeliculas(datos);
      })
      .catch((error) => {
        console.error('Error al cargar las películas:', error);
        setError('No se han podido cargar las películas.');
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p>Cargando películas...</p>;
  }

  if (error) {
    return (
      <p>
        {error} Comprueba que la API Python esté funcionando en el puerto 8000.
      </p>
    );
  }

  const categorias = [
    ...new Set(peliculas.map((pelicula) => pelicula.categoria)),
  ];

  return (
    <div className="app">
      <header>Mi app de cine</header>

      {categorias.map((categoria) => (
        <Category
          key={categoria}
          title={categoria}
          movies={peliculas.filter(
            (pelicula) => pelicula.categoria === categoria
          )}
        />
      ))}
    </div>
  );
}

export default App;
