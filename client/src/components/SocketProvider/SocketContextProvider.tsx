import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { ISocket } from '../../interfaces/Socket';
import { SocketContext } from './context';

export const SocketContextProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<ISocket | null>(null);

  useEffect(() => {
    const s = io('http://localhost:3000', { transports: ['websocket'] });
    s.on('connect', () => {
      s.emit('addUser', { id: s.id, status: '', lastUpdate: '' });
      setSocket(s);
    });

    return () => {
      s.removeAllListeners();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
