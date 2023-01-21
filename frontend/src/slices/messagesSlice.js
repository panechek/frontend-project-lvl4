import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions, fetchChannels } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
    removeMessage: (state, { payload }) => messagesAdapter.removeOne(state, payload.id),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, action) => {
      const { messages } = action.payload;
      messagesAdapter.addMany(state, messages);
    });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { actions } = messagesSlice;

export default messagesSlice.reducer;
