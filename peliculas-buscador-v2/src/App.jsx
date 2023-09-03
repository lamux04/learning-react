import './App.css';
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';
import { useForm } from './hooks/useForm';
import { useFirstRender } from './hooks/useFirstRender';
import debounce from 'just-debounce-it';
import { useState } from 'react';

function App () {
  const { error, validateSearch } = useForm();
  const { firstSearch, notFirstSearch } = useFirstRender();
  const [check, setCheck] = useState(false);
  const { movies, getMovies, loading } = useMovies({ firstSearch, check });

  const getMoviesOnChange = debounce(getMovies, 300);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const { search: searchInput } = ev.target.elements;

    if (error) return;

    if (firstSearch.current) notFirstSearch();
    getMovies(searchInput.value, check);
  };

  const handleChange = (ev) => {
    if (validateSearch({ search: ev.target.value })) return;
    if (firstSearch.current) notFirstSearch();
    getMoviesOnChange(ev.target.value);
  };

  const handleCheck = (ev) => {
    if (!firstSearch.current) getMoviesOnChange(ev.target.parentElement.elements.search.value);
    setCheck(!check);
  };

  return (
    <>
      <header>
        <h1>Buscador de peliculas</h1>
        <form onSubmit={handleSubmit}>
          <input name='search' type="text" placeholder='Star wars...' onChange={handleChange} />
          <input type="checkbox" name="order" checked={check} onChange={handleCheck}/>
          <input type="submit" value="Buscar"/>
        </form>
      </header>
      <main>
        {loading && <div className='spinner'></div>}
        <p style={{ color: 'red' }}>{error}</p>
        {!firstSearch.current && <Movies movies={movies} order={check} />}
      </main>
    </>
  );
}

export default App;
