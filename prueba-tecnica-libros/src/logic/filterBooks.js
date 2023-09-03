import { posibleGenres } from '../constants/filters';

export function filterBooks (books, filters) {
  const { genre, maxPages, search } = filters;
  let actualGenre = posibleGenres.find(posibleGenre => posibleGenre[0] === genre);
  actualGenre = actualGenre[1];
  const filteredBooks = books?.filter(book => (
    book.pages < maxPages &&
    (
      actualGenre === 'Todos' ||
      actualGenre === book.genre
    ) &&
    book.title.toLowerCase().includes(search.toLowerCase())
  ));

  return { filteredBooks };
}
