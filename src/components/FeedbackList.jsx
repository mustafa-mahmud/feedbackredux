import { useSelector } from 'react-redux';
import FeedbackItem from './FeedbackItem';

const FeedbackList = () => {
  const { feedbackItems } = useSelector((store) => store.feedback);
  /////////////////////////////////////////////////////////////////////
  return (
    <div className="feedback-list">
      <div style={{ opacity: 1 }}>
        {feedbackItems.map((item) => {
          return <FeedbackItem key={item.id} {...item} />;
        })}
      </div>
    </div>
  );
};

export default FeedbackList;
