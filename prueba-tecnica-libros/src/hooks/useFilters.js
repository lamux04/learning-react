import { FiltersContext } from '../contexts/filters';
import { useContext } from 'react';

export function useFilters () {
  const contextValues = useContext(FiltersContext);

  if (!contextValues) throw new Error('The context not exists');
  return contextValues;
}
