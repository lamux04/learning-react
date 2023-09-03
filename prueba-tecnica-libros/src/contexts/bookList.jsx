import { createContext, useReducer } from 'react';
import { reducerBookList } from '../reducer/bookList';

export const ContextBookList = createContext();

export function BookListProvider ({ children, books, dispatchBooks }) {
  const initialState = JSON.parse(window.localStorage.getItem('bookList')) || [];
  const [bookList, dispatchBookList] = useReducer(reducerBookList, initialState);

  const addBook = newBook => {
    dispatchBookList({
      type: 'ADD_ELEMENT',
      newBook,
      bookList: true
    });
    dispatchBooks({
      type: 'REMOVE_ELEMENT',
      ISBN: newBook.ISBN,
      bookList: false
    });
  };

  const removeBook = oldBook => {
    dispatchBookList({
      type: 'REMOVE_ELEMENT',
      ISBN: oldBook.ISBN,
      bookList: true
    });
    dispatchBooks({
      type: 'ADD_ELEMENT',
      newBook: oldBook,
      bookList: false
    });
  };

  return (
    <ContextBookList.Provider
      value={{
        bookList,
        addBook,
        removeBook
      }}
    >
      {children}
    </ContextBookList.Provider>
  );
}
