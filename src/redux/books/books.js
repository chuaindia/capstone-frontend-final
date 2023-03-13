import { setRemoveReservationsAction } from '../user/session-redux';

// Actions
const SET_BOOKS = 'books/books/SET_BOOKS';
const FULLFILED = 'books/books/FULLFILED';
const STATUS = 'books/books/STATUS';
const CLEAR = 'books/books/CLEAR';
const DELETE_BOOK = 'books/books/DELETE_BOOK';
const LINK = 'http://127.0.0.1:3000/api/v1/books';

// initial state
const initialState = {
  books: [],
  message: '',
};

// Reducer
const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS:
      return { books: [...action.payload] };
    case FULLFILED:
      return {
        books: [...state.books, action.payload.obj],
        message: action.payload.msg,
      };
    case STATUS:
      return {
        books: [...state.books],
        message: action.payload,
      };
    case CLEAR:
      return {
        books: [...state.books],
        message: action.payload,
      };
    case DELETE_BOOK:
      return {
        books: [...state.books.filter((item) => item.id !== action.payload)],
      };
    default:
      return state;
  }
};

// Action Creators
const setBooksAction = (booksList) => ({
  type: SET_BOOKS,
  payload: booksList,
});

const fullfiled = (obj, msg) => ({
  type: FULLFILED,
  payload: { obj, msg },
});

const status = (msg) => ({
  type: STATUS,
  payload: msg,
});

const clear = () => ({
  type: CLEAR,
  payload: '',
});

const deleteBook = (id) => ({
  type: DELETE_BOOK,
  payload: id,
});

const fetchBooks = () => async (dispatch) => {
  await fetch(LINK, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((result) => result.json())
    .then((res) => {
      const booksList = res.map((item) => ({
        id: item.id,
        title: item.title,
        author: item.author,
        bookcoverimage: item.book_cover_image,
        genre: item.genre,
        publisher: item.publisher,
        dateofpublication: item.date_of_publication,
        pages: item.pages,
        language: item.language,
        isbn: item.isbn,
        price: item.price,
      }));
      dispatch(setBooksAction(booksList));
    });
};

const addBook = (obj) => async (dispatch) => fetch(LINK, {
  method: 'POST',
  body: JSON.stringify(obj),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((res) => res.json())
  .then((data) => {
    if (data.book_obj) {
      const bookObj = {
        id: data.book_obj.id,
        title: data.book_obj.title,
        author: data.book_obj.author,
        bookcoverimage: data.book_obj.book_cover_image,
        genre: data.book_obj.genre,
        publisher: data.book_obj.publisher,
        dateofpublication: data.book_obj.date_of_publication,
        pages: data.book_obj.pages,
        language: data.book_obj.language,
        isbn: data.book_obj.isbn,
        price: data.book_obj.price,
      };
      dispatch(fullfiled(bookObj, data.message));
    } else {
      dispatch(status('Book already exists'));
    }
  });

const destroyBook = (id) => async (dispatch) => fetch(`http://127.0.0.1:3000/api/v1/books/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((res) => res.json())
  .then((data) => {
    if (data.message === 'Book has been destroyed successfully!') {
      dispatch(deleteBook(id));
      dispatch(setRemoveReservationsAction(id));
    }
  });

export {
  fetchBooks, setBooksAction,
  fullfiled, addBook, destroyBook,
  clear, status, deleteBook,
};

export default booksReducer;
