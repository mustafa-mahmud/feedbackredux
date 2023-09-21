import { FeedbackList, FormElements, FeedbackStats } from '../components';
import { useSelector } from 'react-redux';

const Home = () => {
  const { errMsg } = useSelector((store) => store.feedback);

  ////////////////////////////////////////////////
  if (errMsg) {
    return <h1>{errMsg}</h1>;
  }

  return (
    <div className="container">
      <FormElements />
      <FeedbackStats />
      <FeedbackList />
    </div>
  );
};

export default Home;
