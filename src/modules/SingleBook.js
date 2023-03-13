import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoChevronForwardCircleOutline } from 'react-icons/io5';

const SingleBook = () => {
  const { id } = useParams();
  const book = useSelector((state) => state.books.books).find(
    (item) => item.id === Number(id),
  );
  const state = useSelector((state) => state.books.books);

  if (!book && state.length === 0) {
    return <div className="loading">Loading</div>;
  }
  if (!book && state.length !== 0) {
    return <div className="loading">Element not found</div>;
  }
  return (
    <section className="book-details-page">
      <div className="book-photo-container">
        <img
          src={book.book_cover_image}
          alt="book"
          className="detailsPageBookPhoto"
        />
      </div>
      <div className="book-details-container">
        <h1>
          {book.title}
          {' '}
          {book.author}
        </h1>
        <ul className="details">
          <li>
            <span>Genre: </span>
            <span>{book.genre}</span>
          </li>
          <li>
            <span>Publisher: </span>
            <span>{book.genre}</span>
          </li>
          <li>
            <span>Date of Publication: </span>
            <span>
              {book.date_of_publication}
            </span>
          </li>
          <li>
            <span>Pages: </span>
            <span>{book.pages}</span>
          </li>
          <li>
            <span>Price: $</span>
            <span>{book.price}</span>
          </li>
        </ul>
        <Link
          className="makeReservationButton"
          to="/reserve"
          state={{ chosenBookId: book.id }}
        >
          <button type="button">
            Make reservation
            <IoChevronForwardCircleOutline className="reserve-arrow-icon" />

          </button>
        </Link>
      </div>
    </section>
  );
};

export default SingleBook;
