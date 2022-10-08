import axios from 'axios';

import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

export const fetchChats = createAsyncThunk(
  'chats/fetchChats',
  async () => {
    const response = await axios.get(routes.userPath(), { headers: getAuthHeader() });
    return response.data.channels;
  },
);

// export const addChat = createAsyncThunk(
//   'chats/addChat',
//   async (chat) => {
//     const { data } = await axios.post(routes.userPath(), chat);
//     return data;
//   },
// );

const chatsAdapter = createEntityAdapter();
const initialState = chatsAdapter.getInitialState();

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.fulfilled, chatsAdapter.addMany);
    //   .addCase(addChat.fulfilled, chatsAdapter.addOne);
  },
});

export const selectors = chatsAdapter.getSelectors((state) => state.chats);

export default chatsSlice.reducer;
