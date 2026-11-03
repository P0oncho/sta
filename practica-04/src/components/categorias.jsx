import Movie from './pelis';

function Category({ title, movies }) {
return (
    <section className="categoria">
    <h2>Categoría: {title}</h2>

    <div className="peliculas">
        {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
        ))}
    </div>
    </section>
);
}

export default Category;
