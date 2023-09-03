import './App.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMovies } from './hooks/useMovies';
import { Movies } from './components/movies';
import debounce from 'just-debounce-it';

function useSearch () {
  const [search, updateSearch] = useState('');
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === '';
      return;
    }

    if (search === '') {
      setError('No se puede buscar una pelicula vacia');
      return;
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con un numero');
      return;
    }

    if (search.length < 3) {
      setError('La busqueda debe tener al menos 3 caracteres');
      return;
    }
    setError(null);
  }, [search]);

  return { search, error, updateSearch };
}

function App () {
  const [sort, setSort] = useState(false);
  const { search, error: error1, updateSearch } = useSearch();
  const { movies, getMovies, loading, error: error2 } = useMovies({ search, sort });

  const error = error1 || error2;

  const debouncedGetMovies = useCallback(debounce(search => {
    getMovies({ search });
  }, 300), []);

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(event.target.value);
    debouncedGetMovies(newSearch);
  };

  const handleCheck = (event) => {
    setSort(!sort);
  };

  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form action="" className="form" onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} type="text" placeholder='Avengers, Star Wars, The Matrix...' />
          <input type="checkbox" checked={sort} onClick={handleCheck} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading && <p>Cargando...</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
