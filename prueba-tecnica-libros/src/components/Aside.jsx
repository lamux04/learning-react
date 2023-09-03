import './Aside.css';
import { useAside } from '../hooks/useAside';
import { useBookList } from '../hooks/useBookList';

export function Aside () {
  const { bookList, removeBook } = useBookList();
  const { $aside, handleCloseAside, handleOpenAside } = useAside();
  const hasList = bookList?.length > 0;

  return (
    <>
      <button className="openAside" onClick={handleOpenAside}>⬅️</button>
      <aside ref={$aside} style={{ display: 'none' }}>
        <button className='closeAside' onClick={handleCloseAside}>❌</button>
        <ul>
          {
            hasList &&
            bookList.map(book => (
              <li key={book.ISBN} className='book-of-list'>
                <button className="close-button" onClick={() => { removeBook(book); }}>❌</button>
                <img src={book.urlImg} alt={book.title} onClick={() => { window.location.href = `/books/${book.ISBN}`; }}/>
              </li>
            ))
          }
        </ul>
      </aside>
    </>
  );
}
