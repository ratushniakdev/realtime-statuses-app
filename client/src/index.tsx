import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SocketContextProvider from './components/SocketProvider';
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
