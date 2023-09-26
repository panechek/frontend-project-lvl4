import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchDataAsyncThunk.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { messages } = action.payload;
      messagesAdapter.setAll(state, messages);
    });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
