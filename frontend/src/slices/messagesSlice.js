import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchChats } from './chatsSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  // extraReducers: (builder) => {
  //     builder.addCase(chatsActions.)
  // }
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlice.reducer;
