const API_KEY = 'dcab944d';

export async function searchMovies ({ search }) {
  if (search === '') return null;

  try {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`);
    const json = await response.json();

    const movies = json.Search;

    return movies?.map(movie => {
      return {
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
      };
    });
  } catch (err) {
    throw new Error('Error searching movies');
  }
}
