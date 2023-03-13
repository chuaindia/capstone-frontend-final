import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { destroyBook } from '../../redux/books/books';

const DeleteBook = () => {
  const dispatch = useDispatch();

  const redirection = useNavigate();

  const availableBooks = useSelector((store) => store.books.books);

  const isLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));

  useEffect(() => {
    if (!isLoggedIn) {
      setTimeout(() => {
        redirection('/user/login');
      }, 2000);
    }
  });

  const removeData = (e) => {
    const id = Number(e.target.value);
    dispatch(destroyBook(id));
  };

  if (isLoggedIn) {
    return (
      <section className="delete-book-page">
        <h1>Delete a book</h1>

        {availableBooks.length !== 0 ? (
          <ul className="available-books-list">
            {availableBooks.map((item) => (
              <li className="available-book" key={item.id}>
                <span>
                  {item.title}
                  {' '}
                  {item.author}
                </span>
                <button
                  type="button"
                  name="delete"
                  className="delete-btn"
                  value={item.id}
                  onClick={removeData}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-items-available">
            <div>There are no books available.</div>
            <button type="button"><Link to="/"> Go back to the home page</Link></button>
          </div>
        )}
      </section>
    );
  }
  return (
    <div className="popup-message">
      <p>Please log in to access this page</p>
    </div>
  );
};

export default DeleteBook;
