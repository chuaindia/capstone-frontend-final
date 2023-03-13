import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';

const Home = () => {
  const { books } = useSelector((state) => state.books);
  const isLoggedIn = useSelector((state) => state.users.logged_in);

  return (
    <section className="main-page-section">
      <div className="heading">
        <h1>BOOKS</h1>
        {books.length !== 0 ? <p>Please choose your favourite book!</p> : ''}
      </div>

      <div className="divider">
        {[...Array(20)].map(() => (
          <div key={Math.random(100)} className="divider-bullet" />
        ))}
      </div>

      {books.length !== 0 ? (
        <Carousel books={books} />
      ) : (
        <div className="no-items-available">
          <div> There are no books currently available</div>
          {isLoggedIn && (
            <Link to="/add_book">
              {' '}
              <button type="button">Add a book now!</button>
            </Link>
          )}
        </div>
      )}
    </section>
  );
};

export default Home;
