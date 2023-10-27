import {
  createContext,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import { addChannel, removeChannel, renameChannel } from '../redux/channelsSlice';
import { addMessage } from '../redux/messagesSlice';

const SocketContext = createContext({});
export const useSocket = () => useContext(SocketContext);
const SocketProvider = ({ children, socket }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on('connect', () => console.log(socket.id));
    socket.on('newChannel', (channel) => dispatch(addChannel(channel)));
    socket.on('removeChannel', ({ id }) => dispatch(removeChannel(id)));
    socket.on('renameChannel', ({ id, name }) => dispatch(renameChannel({ id, changes: { name } })));
    socket.on('newMessage', (message) => dispatch(addMessage(message)));
  }, []);
  const socketOn = useMemo(() => ({
    newChannel: (values) => socket.volatile.emit('newChannel', values),
    removeChannel: (value) => socket.volatile.emit('removeChannel', value),
    renameChannel: ({ id, name }) => socket.volatile.emit('renameChannel', { id, name }),
    newMessage: (value) => socket.volatile.emit('newMessage', value),
  }), [socket]);
  return (
    <SocketContext.Provider
      value={{
        socketOn,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
