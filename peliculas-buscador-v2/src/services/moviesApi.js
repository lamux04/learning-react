const API_KEY = 'dcab944d';

export async function moviesRequest (search) {
  const result = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`);
  const data = await result.json();
  const newMovies = data.Search?.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    type: movie.Type,
    url: movie.Poster
  }));
  return { newMovies };
}
