import { useId } from 'react';
import './Filters.css';
import { posibleGenres, pagesRange } from '../constants/filters';
import { useFilters } from '../hooks/useFilters';

export function Filters () {
  const { filters, changeGenre, changePagesRange, changeSearch } = useFilters();
  const maxPagesId = useId();
  const genreId = useId();
  const searchId = useId();

  const handleChangePages = event => {
    changePagesRange(event.target.value);
  };

  const handleChangeGenre = event => {
    changeGenre(event.target.value);
  };

  const handleChangeSearch = event => {
    changeSearch(event.target.value);
  };

  return (
    <div className='filters'>
      <div className="filters_pages">
        <label htmlFor={maxPagesId}>Maximo numero de paginas</label>
        <input type="range" id={maxPagesId} min={pagesRange.min} max={pagesRange.max} onChange={handleChangePages} value={filters.maxPages}/>
        <p>{filters.maxPages}</p>
      </div>

      <div className="filters_search">
        <label htmlFor={searchId}>Buscar</label>
        <input type="text" placeholder='Harry Potter...' onChange={handleChangeSearch}/>
      </div>

      <div className="filters_category">
        <label htmlFor={genreId}>Género</label>
        <select id={genreId} onChange={handleChangeGenre}>
          {
            posibleGenres.map((genre, index) => (
              <option key={index} value={genre[0]}>{genre[1]}</option>
            ))
          }
        </select>
      </div>
    </div>
  );
}
