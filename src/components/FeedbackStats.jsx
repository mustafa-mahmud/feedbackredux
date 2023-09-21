import { useEffect } from 'react';
import { calcReviewsAverage } from '../redux/slices/feedbackSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const FeedbackStats = () => {
  const dispatch = useDispatch();
  const { feedbackItems, reviews, average } = useSelector(
    (store) => store.feedback
  );

  useEffect(() => {
    dispatch(calcReviewsAverage());
  }, [feedbackItems]);

  //////////////////////////////////////////////
  return (
    <div className="feedback-stats">
      <h4>{reviews} reviews</h4>
      <h4>Average Rating: {average}</h4>
    </div>
  );
};

export default FeedbackStats;
