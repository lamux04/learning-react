import { useBookList } from '../hooks/useBookList';
import './Books.css';

export function Book ({ book, addBook }) {
  return (
    <li className='liBook'>
      <div
        className='book'
        style={{
          backgroundImage: `url(${book.urlImg})`
        }}
        onClick={() => { window.location.href = `/books/${book.ISBN}`; }}
      >
      </div>
      <button onClick={() => { addBook(book); }}>Add to Cart</button>
    </li>

  );
}

export function Books ({ books }) {
  const { addBook } = useBookList();
  const hasBooks = books?.length > 0;
  return (
    hasBooks &&
    <ul>
      {
        books.map(book => (
          <Book
            key={book.ISBN}
            book={book}
            addBook={addBook}
          />
        ))
      }
    </ul>
  );
}
