function Movie ({ movie }) {
  return (
    <li className="movies_li">
      <img src={movie.url} alt={`Poster of ${movie.title}`} />
      <p className="movies_li_title">{movie.title}</p>
      <p className="movies_li_year">{movie.year}</p>
    </li>
  );
}

function MoviesWithResults ({ movies }) {
  return (
    <ul className="movies">
      {
        movies.map(movie => {
          return (
            <Movie movie={movie} key={movie.id} />
          );
        })
      }
    </ul>
  );
}

function MoviesWithNoResults () {
  return (
    <p>No se encontraron resultados</p>
  );
}

export function Movies ({ movies, order }) {
  const hasMovies = movies?.length > 0;

  let moviesOrdered;

  if (order) {
    moviesOrdered = movies?.sort((a, b) => -(a.year - b.year));
  } else {
    moviesOrdered = movies?.sort((a, b) => (a.year - b.year));
  }

  return (
    hasMovies
      ? <MoviesWithResults movies={moviesOrdered} />
      : <MoviesWithNoResults />
  );
}
