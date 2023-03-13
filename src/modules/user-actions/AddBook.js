/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBook, clear } from '../../redux/books/books';

const AddBook = () => {
  const dispatch = useDispatch();

  const [overlay, setOverlay] = useState(false);

  const {
    register,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
  });

  const redirection = useNavigate();

  const returnMsg = useSelector((state) => state.books);

  const isLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));

  const postData = (data) => {
    const obj = { ...data };
    if (data.ig_link === '') {
      delete obj.ig_link;
    }
    if (data.twitter_link === '') {
      delete obj.twitter_link;
    }
    if (data.fb_link === '') {
      delete obj.fb_link;
    }
    dispatch(addBook(obj));
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setTimeout(() => {
        redirection('/user/login');
      }, 2000);
    }
    if (returnMsg) {
      if (returnMsg.message === 'Book has been created successfully!') {
        setOverlay(true);
        setTimeout(() => {
          dispatch(clear());
          redirection('/');
        }, 2500);
      } else if (returnMsg.message === 'Book already exists') {
        setOverlay(true);
        setTimeout(() => {
          dispatch(clear());
          setOverlay(false);
        }, 2500);
      }
    }
  }, [returnMsg, dispatch, redirection, isLoggedIn]);

  if (isLoggedIn) {
    return (
      <section className="add-book-page">
        <h1>ADD A BOOK</h1>
        <div className="add-book-page-divider" />

        <form
          action=""
          className="add-book-form"
          onSubmit={handleSubmit(postData)}
        >
          <input
            type="input"
            name="title"
            placeholder="Title*"
            {...register('title', {
              required: {
                value: true,
                message: 'Title is a required field',
              },
            })}
          />

          <input
            type="input"
            name="author"
            placeholder="Author*"
            {...register('author', {
              required: {
                value: true,
                message: 'Author is a required field',
              },
            })}
          />

          <input
            type="input"
            name="book_cover_image"
            placeholder="Book Cover Image"
            {...register('book_cover_image', {
              required: {
                value: true,
                message: 'Book Cover image is a required field',
              },
            })}
          />

          <input
            type="input"
            name="genre"
            placeholder="Genre"
            {...register('genre', {
              required: {
                value: true,
                message: 'Genre is a required field',
              },
            })}
          />

          <input
            type="input"
            name="publisher"
            placeholder="Publisher's Name"
            {...register('publisher', {
              required: {
                value: true,
                message: 'Publisher is a required field',
              },
            })}
          />

          <input
            type="input"
            name="date_of_publication"
            placeholder="Date of Publication"
            {...register('date_of_publication')
          }
          />

          <input
            type="number"
            name="pages"
            placeholder="Pages"
            {...register('pages')
          }
          />

          <input
            type="input"
            name="language"
            placeholder="Language in which the book is written"
            {...register('language')
          }
          />

          <input
            type="input"
            name="isbn"
            placeholder="ISBN of the Book"
            {...register('isbn')
          }
          />

          <input
            type="number"
            name="price"
            placeholder="Price of the Book"
            {...register('price')
          }
          />

          <button type="submit" name="additem" className="session-btn">
            Add Book
          </button>
        </form>

        <div className={`popup-message ${overlay ? '' : 'hidden'}`}>
          <p>{returnMsg.message}</p>
        </div>
      </section>
    );
  }

  return (
    <div className="popup-message">
      <p>Please login to view this page</p>
    </div>
  );
};

export default AddBook;
