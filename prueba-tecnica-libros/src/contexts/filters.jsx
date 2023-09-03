import { createContext, useState } from 'react';
import { pagesRange, posibleGenres } from '../constants/filters';

export const FiltersContext = createContext();

export function FiltersProvider ({ children }) {
  const [filters, setFilters] = useState({
    genre: 'all',
    maxPages: 2000,
    search: ''
  });

  const changeGenre = newGenre => {
    const genreExist = posibleGenres.find(genre => genre[0] === newGenre);
    if (!genreExist) throw new Error('The genre not exists');
    setFilters(previousFilters => ({
      ...previousFilters,
      genre: newGenre
    }));
  };

  const changePagesRange = newMax => {
    if (newMax < pagesRange.min || newMax > pagesRange.max) throw new Error('The max of pages not exists');
    setFilters(previousFilters => ({
      ...previousFilters,
      maxPages: newMax
    }));
  };

  const changeSearch = newSearch => {
    setFilters(previousFilters => ({
      ...previousFilters,
      search: newSearch
    }));
  };

  return (
    <FiltersContext.Provider
      value={{
        filters,
        changeGenre,
        changePagesRange,
        changeSearch
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
