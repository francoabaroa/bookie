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
  SELECT_BOOK_CHECKBOX,
  SHOW_BOOK,
  UNSELECT_BOOK_CHECKBOX,
  UPDATE_BOOK_BEGIN,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_FAILURE,
} from '../actions/actions';

import { PageEnum } from '../enums/enums';

import { alphabetizeBooks } from '../utils/utils';

const initialState = {
  activeBook: {},
  bookAlphabetizedMap: {},
  books: [],
  currentPageEnum: PageEnum.ROOT,
  error: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK_PAGE:
      return {
        ...state,
        currentPageEnum: PageEnum.ADD,
        error: null,
        loading: false,
      };

    case ADD_BOOK_BEGIN:
      return {
        ...state,
        currentPageEnum: PageEnum.ROOT,
        error: null,
        loading: true,
      };

    case ADD_BOOK_SUCCESS:
      const newestBookList = [action.payload.book].concat(action.payload.books);
      return {
        ...state,
        activeBook: {},
        bookAlphabetizedMap: alphabetizeBooks(newestBookList),
        books: newestBookList,
        currentPageEnum: PageEnum.ROOT,
        loading: false,
        selectCheckboxClicked: false,
      };

    case ADD_BOOK_FAILURE:
      return {
        ...state,
        currentPageEnum: PageEnum.ROOT,
        error: action.payload.error,
        loading: false,
      };

    case DELETE_BOOK_BEGIN:
      return {
        ...state,
        currentPageEnum: PageEnum.ROOT,
        error: null,
        loading: true,
      };

    case DELETE_BOOK_SUCCESS:
      const filteredBooks = action.payload.books.filter(book => {
        return book.id !== action.payload.deleteBookId;
      });
      const filteredMap = alphabetizeBooks(filteredBooks);
      return {
        ...state,
        activeBook: {},
        bookAlphabetizedMap: filteredMap,
        books: filteredBooks,
        currentPageEnum: PageEnum.ROOT,
        loading: false,
        selectCheckboxClicked: false,
      };

    case DELETE_BOOK_FAILURE:
      return {
        ...state,
        currentPageEnum: PageEnum.ROOT,
        error: action.payload.error,
        loading: false,
      };

    case EDIT_BOOK:
      return {
        ...state,
        activeBook: action.payload.activeBook,
        currentPageEnum: PageEnum.EDIT,
        error: null,
        loading: false,
        selectCheckboxClicked: false,
      };

    case FETCH_BOOKS_BEGIN:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case FETCH_BOOKS_SUCCESS:
      let map = alphabetizeBooks(action.payload.books);
      return {
        ...state,
        bookAlphabetizedMap: map,
        books: action.payload.books,
        loading: false,
      };

    case FETCH_BOOKS_FAILURE:
      return {
        ...state,
        bookAlphabetizedMap: {},
        books: [],
        error: action.payload.error,
        loading: false,
      };

    case GO_HOME:
      return {
        ...state,
        activeBook: {},
        currentPageEnum: PageEnum.ROOT,
        error: null,
        loading: false,
        selectCheckboxClicked: false,
      };

    case SELECT_BOOK_CHECKBOX:
      return {
        ...state,
        activeBook: action.payload.activeBook,
        currentPageEnum: PageEnum.ROOT,
        error: null,
        loading: false,
        selectCheckboxClicked: true,
      };

    case SHOW_BOOK:
      return {
        ...state,
        activeBook: action.payload.activeBook,
        currentPageEnum: PageEnum.SHOW,
        error: null,
        loading: false,
      };

    case UNSELECT_BOOK_CHECKBOX:
      return {
        ...state,
        activeBook: {},
        currentPageEnum: PageEnum.ROOT,
        error: null,
        loading: false,
        selectCheckboxClicked: false,
      };

    case UPDATE_BOOK_BEGIN:
      return {
        ...state,
        currentPageEnum: PageEnum.ROOT,
        error: null,
        loading: true,
        selectCheckboxClicked: false,
      };

    case UPDATE_BOOK_SUCCESS:
      const updatedBooks = action.payload.books.map(book => {
        if (book.id === action.payload.activeBook.id) {
          return action.payload.activeBook;
        } else {
          return book;
        }
      });
      const updatedMap = alphabetizeBooks(updatedBooks);
      return {
        ...state,
        activeBook: {},
        bookAlphabetizedMap: updatedMap,
        books: updatedBooks,
        currentPageEnum: PageEnum.ROOT,
        loading: false,
        selectCheckboxClicked: false,
      };

    case UPDATE_BOOK_FAILURE:
      return {
        ...state,
        currentPageEnum: PageEnum.ROOT,
        error: action.payload.error,
        loading: false,
      };

    default:
      return state;
  }
};
