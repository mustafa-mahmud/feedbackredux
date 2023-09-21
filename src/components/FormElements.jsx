import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addFeedback,
  fetchFeedback,
  editFeedback,
} from '../redux/slices/feedbackSlice.js';
import Ratings from './Ratings';
import Card from './shared/Card';

const FormElements = () => {
  const { reviews, editId, feedbackItems } = useSelector(
    (store) => store.feedback
  );
  const dispatch = useDispatch();

  const [rating, setRating] = useState(10);
  const [isDisabled, setIsDisabled] = useState(true);
  const [text, setText] = useState('');
  const [msg, setMsg] = useState('');

  const handleChangeRating = (e) => {
    setRating(e.target.value);
  };

  const handleChangeText = (e) => {
    const newFB = e.target.value;

    verification(newFB);
    setText(newFB);
  };

  const verification = (newFB) => {
    if (newFB.trim().length < 10) {
      setMsg('Text must be al lest 10 Characters...');
      setIsDisabled(true);
    } else {
      setMsg('');
      setIsDisabled(false);
    }
  };

  const submitHandle = (e) => {
    e.preventDefault();

    if (editId) {
      const newFB = {
        id: editId,
        text,
        rating: Number(rating),
      };

      dispatch(editFeedback({ id: editId, newFB }));
      // dispatch(fetchFeedback());
    } else {
      const newFB = {
        text,
        rating: Number(rating),
      };

      dispatch(addFeedback(newFB));
    }
    setText('');
    setRating(10);
    setIsDisabled(true);
  };

  useEffect(() => {
    if (editId) {
      const feedback = feedbackItems.find((item) => item.id === editId);

      setText(feedback.text);
      setRating(feedback.rating);
    }
  }, [editId]);

  useEffect(() => {
    dispatch(fetchFeedback());
  }, []);

  ///////////////////////////////////////////////////////////////////
  return (
    <Card>
      <form onSubmit={submitHandle}>
        <h2>How would you rate with us?</h2>
        <ul className="rating">
          {Array.from({ length: 10 }, (_, index) => {
            return (
              <Ratings
                key={index}
                index={index}
                selected={+rating}
                handleChange={handleChangeRating}
              />
            );
          })}
        </ul>
        <div className="input-group">
          <input
            type="text"
            placeholder="Write a review..."
            value={text}
            onChange={handleChangeText}
          />
          <button
            type="submit"
            disabled={isDisabled}
            className="btn btn-primary"
          >
            Send
          </button>
        </div>
        <div className="message">{msg}</div>
      </form>
    </Card>
  );
};

export default FormElements;
