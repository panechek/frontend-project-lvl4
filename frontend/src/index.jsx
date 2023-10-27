import ReactDOM from 'react-dom/client';
import io from 'socket.io-client';

import init from './init.jsx';

const socket = io();

const root = ReactDOM.createRoot(document.getElementById('chat'));
const runApp = async () => {
  root.render(await init(socket));
};

runApp();
