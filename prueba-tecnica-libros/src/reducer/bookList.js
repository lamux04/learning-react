import { updateBookList, updateBooks } from '../logic/localStorage';

export function reducerBookList (state, action) {
  switch (action.type) {
    case 'REMOVE_ELEMENT': {
      const newState = state.filter(book => book.ISBN !== action.ISBN);
      if (action.bookList) updateBookList(newState);
      else updateBooks(newState);
      return newState;
    }
    case 'ADD_ELEMENT': {
      const newState = structuredClone(state);
      newState.push(action.newBook);
      if (action.bookList) updateBookList(newState);
      else updateBooks(newState);
      return newState;
    }
  }
}
