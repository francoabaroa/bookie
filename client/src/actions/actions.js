const API = 'api/v1/books.json';

export const ADD_BOOK_BEGIN = 'ADD_BOOK_BEGIN';
export const ADD_BOOK_FAILURE = 'ADD_BOOK_FAILURE';
export const ADD_BOOK_PAGE = 'ADD_BOOK_PAGE';
export const ADD_BOOK_SUCCESS = 'ADD_BOOK_SUCCESS';

export const FETCH_BOOKS_BEGIN = 'FETCH_BOOKS_BEGIN';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';

export const DELETE_BOOK_BEGIN = 'DELETE_BOOK_BEGIN';
export const DELETE_BOOK_SUCCESS = 'DELETE_BOOK_SUCCESS';
export const DELETE_BOOK_FAILURE = 'DELETE_BOOK_FAILURE';

function addBook(book) {
  // TODO: fix no-useless-concat
  // TODO: show relevant error message to user
  const url = 'api/v1/books';
  const body = JSON.stringify({
    book: { isbn: book.isbn, title: book.title, notes: book.notes },
  });
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  })
    .then(handleErrors)
    .then(res => res.json());
}

function fetchBooks() {
  return fetch(API)
    .then(handleErrors)
    .then(res => res.json());
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const addBookPage = () => ({
  type: ADD_BOOK_PAGE,
});

export const addBookBegin = () => ({
  type: ADD_BOOK_BEGIN,
});

export const addBookSuccess = (book, books) => ({
  type: ADD_BOOK_SUCCESS,
  payload: { book, books },
});

export const addBookFailure = error => ({
  type: ADD_BOOK_FAILURE,
  payload: { error },
});

export function addBookAction(book, books) {
  return dispatch => {
    dispatch(addBookBegin());
    return addBook(book)
      .then(json => {
        dispatch(addBookSuccess(json, books));
        return json;
      })
      .catch(error => dispatch(addBookFailure(error)));
  };
}

export function addBookPageAction() {
  return dispatch => {
    dispatch(addBookPage());
  };
}

export const fetchBooksBegin = () => ({
  type: FETCH_BOOKS_BEGIN,
});

export const fetchBooksSuccess = books => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: { books },
});

export const fetchBooksFailure = error => ({
  type: FETCH_BOOKS_FAILURE,
  payload: { error },
});

export function fetchBooksAction() {
  return dispatch => {
    dispatch(fetchBooksBegin());
    return fetchBooks()
      .then(json => {
        dispatch(fetchBooksSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchBooksFailure(error)));
  };
}
