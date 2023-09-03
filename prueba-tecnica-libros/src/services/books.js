import booksJSON from '../resources/books.json';

export function getInitialBooks () {
  const books = booksJSON.library.map(book => ({
    title: book.book.title,
    pages: book.book.pages,
    genre: book.book.genre,
    urlImg: book.book.cover,
    description: book.book.synopsis,
    year: book.book.year,
    ISBN: book.book.ISBN,
    author: book.book.author.name
  }));

  return books;
}
