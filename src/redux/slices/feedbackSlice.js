import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  feedbackItems: [],
  reviews: 0,
  average: 0,
  editId: null,
  isLoading: false,
  errMsg: '',
};

export const fetchFeedback = createAsyncThunk(
  'feedback/fetchFeedback',
  async (data, thunkAPI) => {
    try {
      const res = await fetch('/feedbackAPI');
      const data = await res.json();

      return data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteFeedback = createAsyncThunk(
  'feedback/deleteFeedback',
  async (id, thunkAPI) => {
    try {
      await fetch(`/feedbackAPI/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addFeedback = createAsyncThunk(
  'feedback/addFeedBack',
  async (data, thunkAPI) => {
    try {
      const res = await fetch('/feedbackAPI', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const newData = await res.json();

      return newData;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editFeedback = createAsyncThunk(
  'feedback/editFeedback',
  async ({ id, newFB }, thunkAPI) => {
    try {
      const res = await fetch(`feedbackAPI/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(newFB),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    calcReviewsAverage: (state) => {
      let average = 0;
      state.reviews = state.feedbackItems.length;
      average = state.feedbackItems.reduce((total, curr) => {
        return total + curr.rating;
      }, 0);

      average = (average / state.reviews).toFixed(1);
      state.average =
        average.split('.')[1] === '0' ? average.split('.')[0] : average;
    },
    changeEditId: (state, action) => {
      state.editId = action.payload;
    },
    edit: (state, action) => {
      state.feedbackItems = state.feedbackItems.map((item) => {
        if (item.id === action.payload.id) return action.payload;
        else return item;
      });
      state.editId = null;
    },
  },

  extraReducers: (builder) => {
    /* fetch */
    builder.addCase(fetchFeedback.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFeedback.fulfilled, (state, action) => {
      state.isLoading = false;
      state.feedbackItems = action.payload;
    });
    builder.addCase(fetchFeedback.rejected, (state, action) => {
      state.isLoading = false;
      state.errMsg = action.payload;
    });
    /* add */
    builder.addCase(addFeedback.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addFeedback.fulfilled, (state, action) => {
      state.isLoading = false;
      state.feedbackItems = [action.payload, ...state.feedbackItems];
    });
    builder.addCase(addFeedback.rejected, (state, action) => {
      state.isLoading = false;
      state.errMsg = action.payload;
    });
    /* edit */
    builder.addCase(editFeedback.fulfilled, (state, action) => {
      state.feedbackItems = state.feedbackItems.map((item) => {
        if (item.id === action.payload.id) return action.payload;
        else return item;
      });
    });
    builder.addCase(editFeedback.rejected, (state, action) => {
      state.errMsg = action.payload;
    });
  },
});

export const {
  remove,
  add,
  calcReviewsAverage,
  changeEditId,
  edit,
} = feedbackSlice.actions;
export default feedbackSlice.reducer;
