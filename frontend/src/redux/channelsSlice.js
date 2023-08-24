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
      state.currentChannel = action.payload;
    },
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        channelsAdapter.setAll(state, channels);
        state.currentChannel = currentChannelId;
        state.loading = false;
      })
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.rejected, (state) => {
        state.loading = false;
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
