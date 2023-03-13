import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchBooks } from './redux/books/books';
import './App.css';
import Nav from './modules/Nav';
import Home from './modules/Home';
import Error404 from './modules/Error404';
import Login from './modules/user-sessions/login';
import Signup from './modules/user-sessions/signup';
import AddBook from './modules/user-actions/AddBook';
import DeleteBook from './modules/user-actions/DeleteBook';
import SingleBook from './modules/SingleBook';
import Reserve from './modules/Reserve';
import { userSession } from './redux/user/session-redux';
import Reservations from './modules/Reservations';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBooks());
    if (localStorage.getItem('user')) {
      const username = localStorage.getItem('user');
      dispatch(userSession({ username }, 'login'));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/add_book" element={<AddBook />} />
        <Route path="/delete_book" element={<DeleteBook />} />
        <Route path="/book/:id" element={<SingleBook />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
