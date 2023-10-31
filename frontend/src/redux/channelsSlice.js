import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import fetchData from './fetchDataAsyncThunk.js';

const channelsAdapter = createEntityAdapter({
  selectId: (channel) => channel.id,
});
const initialState = channelsAdapter.getInitialState({
  currentChannel: null,
  loading: false,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    changeCurrentChannel: (state, action) => {
      const storage = state;
      storage.currentChannel = action.payload;
    },
    addChannel: (state, action) => {
      channelsAdapter.addOne(state, action);
      const storage = state;
      storage.currentChannel = action.payload.id;
    },
    renameChannel: channelsAdapter.updateOne,
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);
      const storage = state;
      storage.currentChannel = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        channelsAdapter.setAll(state, channels);
        const storage = state;
        storage.currentChannel = currentChannelId;
        storage.loading = false;
      })
      .addCase(fetchData.pending, (state) => {
        const storage = state;
        storage.loading = true;
      })
      .addCase(fetchData.rejected, (state) => {
        const storage = state;
        storage.loading = false;
      });
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export const {
  changeCurrentChannel,
  addChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
