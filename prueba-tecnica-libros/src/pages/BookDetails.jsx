import { useParams } from 'react-router-dom';
import { useBookList } from '../hooks/useBookList';

export function BookDetails ({ books }) {
  const { isbn: ISBN } = useParams();
  const { bookList } = useBookList();
  let book = books.find(book => book.ISBN === ISBN);
  if (!book) book = bookList.find(book => book.ISBN === ISBN);
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '25px'
    }}>
      <button style={{
        position: 'absolute',
        top: 0,
        left: 0,
        margin: '20px'
      }} onClick={() => { window.location.href = '/'; }}>Volver</button>
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <p>{book.description}</p>
      <p>{book.year}</p>
      <img style={{
        maxWidth: '800px',
        width: '80%'
      }} src={book.urlImg} alt={book.title} />
    </main>

  );
}
