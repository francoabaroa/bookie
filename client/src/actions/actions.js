const API = 'api/v1/books.json';

export const ADD_BOOK_BEGIN = 'ADD_BOOK_BEGIN';
export const ADD_BOOK_FAILURE = 'ADD_BOOK_FAILURE';
export const ADD_BOOK_PAGE = 'ADD_BOOK_PAGE';
export const ADD_BOOK_SUCCESS = 'ADD_BOOK_SUCCESS';

export const DELETE_BOOK_BEGIN = 'DELETE_BOOK_BEGIN';
export const DELETE_BOOK_SUCCESS = 'DELETE_BOOK_SUCCESS';
export const DELETE_BOOK_FAILURE = 'DELETE_BOOK_FAILURE';

export const EDIT_BOOK = 'EDIT_BOOK';

export const FETCH_BOOKS_BEGIN = 'FETCH_BOOKS_BEGIN';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';

export const GO_HOME = 'GO_HOME';

export const SELECT_BOOK_CHECKBOX = 'SELECT_BOOK_CHECKBOX';

export const SHOW_BOOK = 'SHOW_BOOK';

export const UNSELECT_BOOK_CHECKBOX = 'UNSELECT_BOOK_CHECKBOX';

export const UPDATE_BOOK_BEGIN = 'UPDATE_BOOK_BEGIN';
export const UPDATE_BOOK_SUCCESS = 'UPDATE_BOOK_SUCCESS';
export const UPDATE_BOOK_FAILURE = 'UPDATE_BOOK_FAILURE';

function addBook(book) {
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

function deleteBook(activeBookId) {
  // TODO: show relevant error message to user
  // TODO: fix no-useless-concat
  let url = 'api/v1/books' + '/' + activeBookId;
  return fetch(url, { method: 'delete' })
    .then(handleErrors)
    .then(res => {
      console.log(res);
    });
}

function fetchBooks() {
  return fetch(API)
    .then(handleErrors)
    .then(res => res.json());
}

function updateBook(activeBook) {
  // TODO: fix no-useless-concat
  // TODO: show relevant error message to user
  const url = 'api/v1/books' + '/' + activeBook.id;
  const body = JSON.stringify({
    book: {
      isbn: activeBook.isbn,
      title: activeBook.title,
      notes: activeBook.notes,
    },
  });
  return fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  })
    .then(handleErrors)
    .then(res => {
      console.log(res);
    });
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

export const deleteBookBegin = () => ({
  type: DELETE_BOOK_BEGIN,
});

export const deleteBookSuccess = (deleteBookId, books) => ({
  type: DELETE_BOOK_SUCCESS,
  payload: { deleteBookId, books },
});

export const deleteBookFailure = error => ({
  type: DELETE_BOOK_FAILURE,
  payload: { error },
});

export function deleteBookAction(activeBookId, books) {
  return dispatch => {
    dispatch(deleteBookBegin());
    return deleteBook(activeBookId)
      .then(json => {
        dispatch(deleteBookSuccess(activeBookId, books));
        return json;
      })
      .catch(error => dispatch(deleteBookFailure(error)));
  };
}

export const editBook = activeBook => ({
  type: EDIT_BOOK,
  payload: { activeBook },
});

export function editBookAction(activeBook) {
  return dispatch => {
    dispatch(editBook(activeBook));
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

export const goHome = () => ({
  type: GO_HOME,
});

export function goHomeAction() {
  return dispatch => {
    dispatch(goHome());
  };
}

export const selectBookCheckbox = activeBook => ({
  type: SELECT_BOOK_CHECKBOX,
  payload: { activeBook },
});

export function selectBookCheckboxAction(activeBook) {
  return dispatch => {
    dispatch(selectBookCheckbox(activeBook));
  };
}

export const showBook = activeBook => ({
  type: SHOW_BOOK,
  payload: { activeBook },
});

export function showBookAction(activeBook) {
  return dispatch => {
    dispatch(showBook(activeBook));
  };
}

export const unselectBookCheckbox = activeBook => ({
  type: UNSELECT_BOOK_CHECKBOX,
});

export function unselectBookCheckboxAction() {
  return dispatch => {
    dispatch(unselectBookCheckbox());
  };
}

export const updateBookBegin = () => ({
  type: UPDATE_BOOK_BEGIN,
});

export const updateBookSuccess = (activeBook, books) => ({
  type: UPDATE_BOOK_SUCCESS,
  payload: { activeBook, books },
});

export const updateBookFailure = error => ({
  type: UPDATE_BOOK_FAILURE,
  payload: { error },
});

export function updateBookAction(activeBook, books) {
  return dispatch => {
    dispatch(updateBookBegin());
    return updateBook(activeBook)
      .then(json => {
        dispatch(updateBookSuccess(activeBook, books));
        return json;
      })
      .catch(error => dispatch(updateBookFailure(error)));
  };
}
