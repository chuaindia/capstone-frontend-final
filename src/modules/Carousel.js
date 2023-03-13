import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { IconContext } from 'react-icons';
import PropTypes from 'prop-types';
import Book from './Book';

const Carousel = ({ books }) => {
  const handlePrevClick = () => {
    const carousel = document.querySelector('.carousel');
    const item = document.querySelector('.book-card');
    carousel.scrollLeft -= item.clientWidth;
  };
  const handleNextClick = () => {
    const carousel = document.querySelector('.carousel');
    const item = document.querySelector('.book-card');
    carousel.scrollLeft += item.clientWidth;
  };

  return (
    <div className="carousel-container">
      <button
        type="button"
        className="previous"
        onClick={() => {
          handlePrevClick();
        }}
      >
        <IconContext.Provider value={{ size: '1.15rem', color: 'white' }}>
          <div>
            <BiLeftArrow />
          </div>
        </IconContext.Provider>
      </button>
      <ul className="carousel">
        {books.map((item) => (
          <li key={item.id}>
            <Book obj={item} />
          </li>
        ))}
      </ul>
      <button
        className="next"
        type="button"
        onClick={() => {
          handleNextClick();
        }}
      >
        <IconContext.Provider value={{ size: '1.15rem', color: 'white' }}>
          <div>
            <BiRightArrow />
          </div>
        </IconContext.Provider>
      </button>
    </div>
  );
};

Carousel.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
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
    }),
  ).isRequired,
};

export default Carousel;
