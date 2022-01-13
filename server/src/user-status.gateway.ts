import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { UserList } from './interfaces/User';

class NewUserDto {
  id: string;
  status: string = '';
  lastUpdate: Date | string = '';
  constructor(id) {
    this.id = id;
  }
}

class SetUserStatusDto {
  id: string;
  status: string;
  constructor(data) {
    this.id = data.id;
    this.status = data.status;
  }
}

let users: UserList = [];

@WebSocketGateway()
export class UserStatusGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('setStatus')
  handleSetStatus(@MessageBody() data: string) {
    const dto: SetUserStatusDto = JSON.parse(data);
    const user = users.find((u) => u.id === dto.id);
    const userInd = users.findIndex((u) => u.id === dto.id);
    user.status = dto.status;
    user.lastUpdate = new Date();

    this.server.emit('setUsers', [
      ...users.slice(0, userInd),
      user,
      ...users.slice(userInd + 1),
    ]);
  }

  handleConnection(client: Socket) {
    users.push(new NewUserDto(client.id));
    this.server.emit('setUsers', users);
  }

  handleDisconnect(client: Socket) {
    users = users.filter((user) => user.id !== client.id);
    this.server.emit('setUsers', users);
  }

  @SubscribeMessage('getUsers')
  handleGetUsers(client: Socket) {
    this.server.emit('setUsers', users);
  }
}
