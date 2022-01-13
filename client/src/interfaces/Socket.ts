import { Socket } from 'socket.io-client';

export interface ServerToClientEvents {
  setUsers: (a: any[]) => void;
}

export interface ClientToServerEvents {
  getUsers: () => void;
  setStatus: (status: string) => void;
}

export type ISocket = Socket<ServerToClientEvents, ClientToServerEvents>;
