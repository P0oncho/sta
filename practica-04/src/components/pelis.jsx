"use client";

import { useState } from 'react';

function Movie({ movie }) {
const [mostrarInfo, setMostrarInfo] = useState(false);

return (
    <article className="pelicula">
    <h3>{movie.nombre}</h3>

    {mostrarInfo && (
        <div className="movie-info">
        <p>Año: {movie['año']}</p>
        <p>
            Actores:{' '}
            {movie.actores?.length
            ? movie.actores.join(', ')
            : 'No hay actores registrados'}
        </p>
        </div>
    )}

    <button onClick={() => setMostrarInfo(!mostrarInfo)}>
        {mostrarInfo ? 'Menos información' : 'Más información'}
    </button>
    </article>
);
}

export default Movie;
