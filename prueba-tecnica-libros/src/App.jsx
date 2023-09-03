import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { BookDetails } from './pages/BookDetails';
import { getInitialBooks } from './services/books';
import { reducerBookList } from './reducer/bookList';
import { useReducer } from 'react';
import { BookListProvider } from './contexts/bookList';

function App () {
  const initialBooks = JSON.parse(window.localStorage.getItem('books')) || getInitialBooks();
  const [books, dispatchBooks] = useReducer(reducerBookList, initialBooks);
  return (
    <BookListProvider books={books} dispatchBooks={dispatchBooks}>
      <Routes>
        <Route path='/' element={<Home books={books} dispatchBooks={dispatchBooks}/>} />
        <Route path='/books/:isbn' element={<BookDetails books={books} />} />
        <Route path='*' element={<h1>Error 404 - Not found</h1>} />
      </Routes>
    </BookListProvider>
  );
}

export default App;
