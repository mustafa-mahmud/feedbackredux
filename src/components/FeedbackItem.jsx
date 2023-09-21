import { FaTimes, FaEdit } from 'react-icons/fa';
import Card from './shared/Card';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteFeedback,
  changeEditId,
  fetchFeedback,
} from '../redux/slices/feedbackSlice.js';

const FeedbackItem = ({ id, text, rating }) => {
  const dispatch = useDispatch();
  ////////////////////////////////////////////////////////////
  return (
    <Card>
      <div className="num-display">{rating}</div>
      <button
        type="button"
        className="close"
        onClick={() => {
          dispatch(deleteFeedback(id));
          dispatch(fetchFeedback());
        }}
      >
        <FaTimes />
      </button>
      <button
        type="button"
        className="edit"
        onClick={() => dispatch(changeEditId(id))}
      >
        <FaEdit />
      </button>
      <div className="text-display">{text}</div>
    </Card>
  );
};

export default FeedbackItem;
