import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
// import socket from '../hooks/socket.io.js';
import { selectors, actions as messagesActions } from '../redux/messagesSlice.js';
import Messages from './Messages.jsx';

const MessageList = ({
  currentChannel,
  username,
  messages,
  channelName,
}) => {
  const dispatch = useDispatch();
  const [messageValue, setMessageValue] = React.useState('');
  const inputMessageRef = React.useRef();

  React.useEffect(() => {
    inputMessageRef.current.focus();
    // socket.on('newMessage', (message) => dispatch(messagesActions.addMessage(message)));
  }, []);

  const addNewMessage = (e) => {
    e.preventDefault();
    if (messageValue !== '') {
      const newMessage = {
        username,
        value: messageValue,
        channelId: currentChannel,
      };
      // socket.emit('newMessage', newMessage, (response) => {
      //   if (response.status === 'ok') {
      //     setMessageValue('');
      //   } else {
      //     setTimeout(addNewMessage(e), 5000);
      //   }
      // });
    }
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">{currentChannel && <b># {channelName.name}</b>}</p>
          <span className="text-muted">{messages.length} сообщений</span>
        </div>
        <div id="messadge-box" className="chat-messages overflow-auto px-5">
          {messages.length !== 0 && <Messages messages={messages} />}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form className="py-1 border rounded-2" noValidate onSubmit={addNewMessage}>
            <Form.Group className="input-group has-validation">
              <Form.Control
                className="border-0 p-0 ps-2"
                name="body"
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
                value={messageValue}
                onChange={(e) => setMessageValue(e.target.value)}
                ref={inputMessageRef}
              />
              <button
                type="submit"
                disabled={messageValue === ''}
                className="btn-group-vertical btn border-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                  ></path>
                </svg>
                <span className="visually-hidden">Отправить</span>
              </button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default MessageList;
