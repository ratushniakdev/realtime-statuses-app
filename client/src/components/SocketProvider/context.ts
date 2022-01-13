import { useContext, createContext } from 'react';
import { ISocket } from '../../interfaces/Socket';

export type ISocketContext = ISocket | null;

export const SocketContext = createContext<ISocketContext>(null);

export const useSocketContext = () => useContext(SocketContext);
