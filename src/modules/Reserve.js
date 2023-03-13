import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchReservation, setMsgAction } from '../redux/user/session-redux';

const Reserve = () => {
  const { books } = useSelector((state) => state.books);
  const { creationMsg, user } = useSelector((state) => state.users);

  const isLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));

  const dispatch = useDispatch();

  const location = useLocation();

  const navigate = useNavigate();

  const { chosenBookId } = location.state || -1;

  const [dateOfBooking, setDateOfBooking] = useState('');
  const [dateOfDelivery, setDateOfDelivery] = useState('');
  const [bookId, setBookId] = useState(chosenBookId);
  const [city, setCity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [created, setCreated] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setTimeout(() => {
        navigate('/user/login');
      }, 2000);
    }
    if (creationMsg === 'Reservation has been created successfully!') {
      setCreated(true);
      setErrorMessage('');
      setErrorMessage('');
      dispatch(setMsgAction());
      setTimeout(() => {
        navigate('/reservations');
      }, 2500);
    }
    if (creationMsg === 'Reservation is not successful.') {
      setErrorMessage('The Book is out of stock.');
      dispatch(setMsgAction());
    }
  }, [creationMsg, created, dispatch, navigate, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="popup-message">
        <p>Please log in to access this page</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dateOfDelivery === '' || city === '' || dateOfBooking === '' || bookId === -1) {
      setErrorMessage('All fields are required');
      return;
    }
    dispatch(fetchReservation({
      city, dateOfBooking, dateOfDelivery, book_id: bookId, user_id: user.id,
    }));
  };

  const getCurrentDate = () => new Date().toJSON().slice(0, 10);

  return (
    <section className="reserve-book-page">
      <h1>Order A Book</h1>

      <div className="reserve-page-divider" />
      <form onSubmit={handleSubmit} className="reserve-form">
        <select defaultValue={chosenBookId || ''} name="book_id" id="book-drop-down" onChange={(e) => setBookId(e.target.value)}>
          <option value="">Select a Book</option>
          {books.map((book) => (
            <option
              key={book.id + book.title}
              value={book.id}
            >
              {`${book.title} ${book.author}`}
            </option>
          ))}
        </select>

        <input type="string" id="city" name="city" onChange={(e) => setCity(e.target.value)} />

        <input type="date" id="date-picker" name="date_of_booking" min={getCurrentDate()} onChange={(e) => setDateOfBooking(e.target.value)} />

        <input type="date" id="date-picker" name="date_of_delivery" min={getCurrentDate()} onChange={(e) => setDateOfDelivery(e.target.value)} />

        <p className="error-messages">{errorMessage}</p>
        <input type="submit" value="Book Now" />
      </form>

      <div className={`popup-message ${created ? '' : 'hidden'}`}>
        <p>Reservation has been created successfully!</p>
      </div>
    </section>
  );
};

export default Reserve;
