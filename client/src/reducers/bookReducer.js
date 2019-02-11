import {
  ADD_BOOK_BEGIN,
  ADD_BOOK_FAILURE,
  ADD_BOOK_PAGE,
  ADD_BOOK_SUCCESS,
  DELETE_BOOK_BEGIN,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAILURE,
  EDIT_BOOK,
  FETCH_BOOKS_BEGIN,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  GO_HOME,
  SHOW_BOOK,
  UPDATE_BOOK_BEGIN,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_FAILURE,
} from '../actions/actions';

import { PageEnum } from '../enums/enums';

const initialState = {
  // TODO: alpha
  activeBook: {},
  bookAlphabetizedMap: {},
  books: [],
  loading: false,
  error: null,
  currentPageEnum: PageEnum.ROOT,
};

function alphabetize(books) {
  const alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  const alphabetizedMap = {};
  alphabet.forEach(x => {
    alphabetizedMap[x.toUpperCase()] = [];
  });
  books.forEach(y => {
    let firstLetter = y.title[0].toUpperCase();
    alphabetizedMap[firstLetter].push(y);
  });
  return alphabetizedMap;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK_PAGE:
      return {
        ...state,
        loading: false,
        error: null,
        currentPageEnum: PageEnum.ADD,
      };

    case ADD_BOOK_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        currentPageEnum: PageEnum.ROOT,
      };

    case ADD_BOOK_SUCCESS:
      const newestBookList = [action.payload.book].concat(action.payload.books);
      return {
        ...state,
        loading: false,
        books: newestBookList,
        selectCheckboxClicked: false,
        activeBook: {},
        bookAlphabetizedMap: alphabetize(newestBookList),
        currentPageEnum: PageEnum.ROOT,
      };

    case ADD_BOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        currentPageEnum: PageEnum.ROOT,
      };

    case DELETE_BOOK_SUCCESS:
      const filteredBooks = action.payload.books.filter(book => {
        return book.id !== action.payload.deleteBookId;
      });
      const filteredMap = alphabetize(filteredBooks);
      return {
        ...state,
        loading: false,
        books: filteredBooks,
        selectCheckboxClicked: false,
        activeBook: {},
        bookAlphabetizedMap: filteredMap,
        currentPageEnum: PageEnum.ROOT,
      };

    case DELETE_BOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        currentPageEnum: PageEnum.ROOT,
      };

    case EDIT_BOOK:
      return {
        ...state,
        loading: false,
        error: null,
        selectCheckboxClicked: false,
        activeBook: action.payload.activeBook,
        currentPageEnum: PageEnum.EDIT,
      };

    case FETCH_BOOKS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Reset any errors
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_BOOKS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the books with the ones from the server
      let map = alphabetize(action.payload.books);
      return {
        ...state,
        loading: false,
        books: action.payload.books,
        bookAlphabetizedMap: map,
      };

    case FETCH_BOOKS_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have books to display anymore, so set `books` empty.
      // This is all up to you and your app though:
      // maybe you want to keep the books around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        books: [],
        bookAlphabetizedMap: {},
      };

    case GO_HOME:
      return {
        ...state,
        loading: false,
        error: null,
        activeBook: {},
        selectCheckboxClicked: false,
        currentPageEnum: PageEnum.ROOT,
      };

    case SHOW_BOOK:
      return {
        ...state,
        loading: false,
        error: null,
        activeBook: action.payload.activeBook,
        currentPageEnum: PageEnum.SHOW,
      };

    case UPDATE_BOOK_BEGIN:
      return {
        ...state,
        loading: true,
        selectCheckboxClicked: false,
        error: null,
        currentPageEnum: PageEnum.ROOT,
      };

    case UPDATE_BOOK_SUCCESS:
      const updatedBooks = action.payload.books.map(book => {
        if (book.id === action.payload.activeBook.id) {
          return action.payload.activeBook;
        } else {
          return book;
        }
      });
      const updatedMap = alphabetize(updatedBooks);
      return {
        ...state,
        loading: false,
        selectCheckboxClicked: false,
        activeBook: {},
        books: updatedBooks,
        bookAlphabetizedMap: updatedMap,
        currentPageEnum: PageEnum.ROOT,
      };

    case UPDATE_BOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        currentPageEnum: PageEnum.ROOT,
      };

    default:
      return state;
  }
};
