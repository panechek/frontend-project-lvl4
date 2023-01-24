import axios from 'axios';

import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  current,
} from '@reduxjs/toolkit';
import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const response = await axios.get(routes.userPath(), { headers: getAuthHeader() });
    return response.data;
  },
);

export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async (channel) => {
    const { data } = await axios.post(routes.userPath(), channel);
    return data;
  },
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async (id) => {
    await axios.delete(routes.userPath(id));
    return id;
  },
);

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannel: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    changeCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        channelsAdapter.addMany(state, channels);
        state.currentChannel = currentChannelId;
      })
      .addCase(addChannel.fulfilled, channelsAdapter.addOne)
      .addCase(removeChannel.fulfilled, channelsAdapter.removeOne);
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const { changeCurrentChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
