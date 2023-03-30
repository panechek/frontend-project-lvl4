import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useImmer } from 'use-immer';
import getModal from './modals/index.js';
import {
  fetchChannels,
  selectors as channelsSelectors,
  changeCurrentChannel,
} from '../slices/channelsSlice.js';

import ChannelList from './ChannelList.jsx';
import MessageList from './MessageList.jsx';

const renderModal = ({ modalInfo, hideModal, setItems }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} setItems={setItems} onHide={hideModal} />;
};

const Home = () => {
  const dispatch = useDispatch();
  console.log(JSON.parse(localStorage.getItem('userId')));
  const { username } = JSON.parse(localStorage.getItem('userId')) ?? '';
  const [items, setItems] = useImmer([]);
  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  const currentChannel = useSelector((state) => state.channels.currentChannel);

  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelName = channels.find((channel) => channel.id === currentChannel);
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
          showModal={showModal}
        />
        <MessageList
          currentChannel={currentChannel}
          channelName={currentChannelName}
          username={username}
          messages={messages}
        />
      </div>
      {renderModal({ modalInfo, hideModal, setItems })}
    </div>
  );
};

export default Home;
