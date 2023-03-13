import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Book = (props) => {
  const { obj } = props;

  return (
    <div className="book-card">
      <div className="profile-pic-container">
        <img src={obj.book_cover_image} alt="Book-Cover" />
      </div>

      <Link to={`/book/${obj.id}`}><h2>{`${obj.title} ${obj.author}`}</h2></Link>

      <div className="divider">
        {
          [...Array(20)].map(() => <div key={Math.random(100)} className="divider-bullet" />)
        }
      </div>

      <div className="book-description">
        {`${obj.genre}`}
      </div>

      <div className="book-description">
        {`${obj.publisher}`}
      </div>

      <div className="book-description">
        {`${obj.date_of_publication}`}
      </div>

      <div className="book-description">
        {`${obj.pages}`}
      </div>

      <div className="book-description">
        {`${obj.language}`}
      </div>

      <div className="book-description">
        {`${obj.isbn}`}
      </div>

      <div className="book-description">
        {`${obj.price}`}
      </div>

    </div>

  );
};

Book.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    book_cover_image: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    date_of_publication: PropTypes.string.isRequired,
    pages: PropTypes.number.isRequired,
    language: PropTypes.string.isRequired,
    isbn: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Book;
