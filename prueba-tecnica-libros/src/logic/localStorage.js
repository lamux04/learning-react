export function updateBookList (bookList) {
  window.localStorage.setItem('bookList', JSON.stringify(bookList));
}

export function updateBooks (books) {
  window.localStorage.setItem('books', JSON.stringify(books));
}
