import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchDataAsyncThunk.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    removeMessage: (state, { payload }) => messagesAdapter.removeOne(state, payload.id),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { messages } = action.payload;
      messagesAdapter.setAll(state, messages);
    });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { actions } = messagesSlice;

export default messagesSlice.reducer;
