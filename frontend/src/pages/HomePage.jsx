import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getModal from '../components/modals/index.js';
import {
  selectors as channelsSelectors,
  changeCurrentChannel,
  removeChannel,
  renameChannel,
  addChannel,
} from '../redux/channelsSlice.js';
import { addMessage } from '../redux/messagesSlice.js';

import fetchData from '../redux/fetchDataAsyncThunk.js';

import ChannelList from '../components/ChannelList.jsx';
import MessageList from '../components/MessageList.jsx';
import socket from '../hooks/socket.io.js';

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onHide={hideModal} />;
};

const Home = () => {
  const dispatch = useDispatch();
  const { username } = JSON.parse(localStorage.getItem('userId')) ?? '';
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
    dispatch(fetchData());
    socket.on('connect', () => console.log(socket.id));
    socket.on('newChannel', (channel) => dispatch(addChannel(channel)));
    socket.on('removeChannel', ({ id }) => dispatch(removeChannel(id)));
    socket.on('renameChannel', ({ id, name }) => dispatch(renameChannel({ id, changes: { name } })));
    socket.on('newMessage', (message) => dispatch(addMessage(message)));
  }, []);

  const changeChannel = (id) => dispatch(changeCurrentChannel(id));

  return (
    channels && (
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
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
        {renderModal({ modalInfo, hideModal })}
      </div>
    )
  );
};

export default Home;
