import Movie from './pelis';
import Link from 'next/link';

function Category({ title, movies }) {
return (
    <section className="categoria">
    <h2>
        <Link href={`/categoria/${encodeURIComponent(title)}`}>
            Categoría: {title}
        </Link>
    </h2>

    <div className="peliculas">
        {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
        ))}
    </div>
    </section>
);
}

export default Category;
