import './Home.css';
import { Header } from '../components/Header';
import { Books } from '../components/Books';
import { useContext } from 'react';
import { FiltersContext } from '../contexts/filters';
import { filterBooks } from '../logic/filterBooks';
import { Aside } from '../components/Aside';

export function Home ({ books, dispatchBooks }) {
  const { filters } = useContext(FiltersContext);

  const { filteredBooks } = filterBooks(books, filters);

  return (
    <>
      <Header
        nlibrosDisponibles={filteredBooks?.length}
      />
      <Aside/>
      <main>
        <Books
          books={filteredBooks}
        />
      </main>
    </>
  );
}
