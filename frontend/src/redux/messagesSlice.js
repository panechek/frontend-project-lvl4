import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchDataAsyncThunk.js';
import { removeChannel } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        const { messages } = action.payload;
        messagesAdapter.setAll(state, messages);
      })
      .addCase(removeChannel, (state, action) => {
        const channelId = action.payload;
        const restEntities = Object.values(state.entities).filter((e) => e.channelId !== channelId);
        messagesAdapter.setAll(state, restEntities);
      });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
