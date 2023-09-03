import { Filters } from './Filters';
import './Header.css';
import { useBookList } from '../hooks/useBookList';

export function Header ({ nlibrosDisponibles }) {
  const { bookList } = useBookList();
  const nlibrosLista = bookList?.length;
  return (
    <header>
      <p className='libros-disponibles'>{nlibrosDisponibles} libros disponibles</p>
      {nlibrosLista > 0 && <p className='libros-lista'>{nlibrosLista} por leer</p>}
      <Filters/>
    </header>
  );
}
