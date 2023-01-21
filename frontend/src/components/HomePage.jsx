import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchChannels,
  selectors as channelsSelectors,
  changeCurrentChannel,
} from '../slices/channelsSlice.js';

import ChannelList from './ChannelList.jsx';
import MessageList from './MessageList.jsx';

const Home = () => {
  const dispatch = useDispatch();
  const username = JSON.parse(localStorage.getItem('userId')).username;

  const currentChannel = useSelector((state) => state.channels.currentChannel);

  const channels = useSelector(channelsSelectors.selectAll);

  const messages = useSelector((state) => {
    if (!state.messages) {
      return [];
    }
    const allMessages = Object.values(state.messages.entities);
    const result = allMessages.filter((item) => item.channelId === currentChannel);
    return result;
  });

  useEffect(() => {
    dispatch(fetchChannels());
  }, []);

  const changeChannel = (id) => dispatch(changeCurrentChannel(id));

  return channels && (
    <div className='container h-100 my-4 overflow-hidden rounded shadow'>
      <div className='row h-100 bg-white flex-md-row'>
        <ChannelList
          currentChannel={currentChannel}
          changeChannel={changeChannel}
          channels={channels}
        />
        <MessageList
          currentChannel={currentChannel}
          username={username}
          messages={messages}
        />
      </div>
    </div>
  );
};

export default Home;
