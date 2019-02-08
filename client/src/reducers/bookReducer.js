import {
  FETCH_BOOKS_BEGIN,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE
} from '../actions/actions';

const initialState = {
  books: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_BOOKS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Reset any errors
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_BOOKS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the books with the ones from the server
      return {
        ...state,
        loading: false,
        books: action.payload.books
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
        books: []
      };

    default:
      return state;
  }
}