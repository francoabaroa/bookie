const API = 'api/v1/books.json';
export const FETCH_BOOKS_BEGIN = "FETCH_BOOKS_BEGIN";
export const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";
export const FETCH_BOOKS_FAILURE = "FETCH_BOOKS_FAILURE";

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

export const fetchBooksBegin = () => ({
  type: FETCH_BOOKS_BEGIN
});

export const fetchBooksSuccess = books => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: { books }
});

export const fetchBooksFailure = error => ({
  type: FETCH_BOOKS_FAILURE,
  payload: { error }
});

export function fetchBooksAction() {
 return dispatch => {
    dispatch(fetchBooksBegin());
    return fetchBooks()
      .then(json => {
        dispatch(fetchBooksSuccess(json));
        return json;
      })
      .catch(error =>
        dispatch(fetchBooksFailure(error))
      );
  };
}