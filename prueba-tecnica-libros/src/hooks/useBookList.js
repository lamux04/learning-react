import { useContext } from 'react';
import { ContextBookList } from '../contexts/bookList';

export function useBookList () {
  const contextValue = useContext(ContextBookList);

  if (!contextValue) throw new Error('Context is not exists');

  return contextValue;
}
