import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer from './slices/feedbackSlice';

const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
  },
});

export default store;
