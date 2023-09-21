import { FeedbackList, FormElements, FeedbackStats } from '../components';

const Home = () => {
  ////////////////////////////////////////////////
  return (
    <div className="container">
      <FormElements />
      <FeedbackStats />
      <FeedbackList />
    </div>
  );
};

export default Home;
