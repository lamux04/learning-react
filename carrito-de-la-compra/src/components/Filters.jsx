import { useId } from 'react';
import './filters.css';
import { useFilters } from '../hooks/useFilters';

export function Filters () {
  const { filters, setFilters: changeFilters } = useFilters();
  const minPriceFilterId = useId();
  const categoryFilterId = useId();

  const handleChangeMinPrice = event => {
    changeFilters(previousFilters => ({
      ...previousFilters,
      minPrice: event.target.value
    }));
  };

  const handleChangeCategory = event => {
    changeFilters(previousFilters => ({
      ...previousFilters,
      category: event.target.value
    }));
  };

  return (
    <section className="filters">
      <div>
        <label htmlFor={minPriceFilterId}>Price</label>
        <input
          type="range"
          id={minPriceFilterId}
          min='0'
          max='1000'
          onChange={handleChangeMinPrice}
        />
        <span>{filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Categorias</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value="all">Todas</option>
          <option value="laptops">Portátiles</option>
          <option value="smartphones">Móviles</option>
        </select>
      </div>
    </section>
  );
}
