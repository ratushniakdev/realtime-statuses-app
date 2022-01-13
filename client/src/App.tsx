import React, { useEffect, useState } from 'react';
import { Col, Row, Spin } from 'antd';
import './App.css';
import { useSocketContext } from './components/SocketProvider/context';
import UserCardList from './components/UserCardList';
import { UserList } from './interfaces/User';

function App() {
  const socket = useSocketContext();

  const [users, setUsers] = useState<UserList>([]);

  useEffect(() => {
    if (socket) {
      socket.emit('getUsers');
      socket.on('setUsers', setUsers);
    }
    return () => {
      socket?.removeListener('setUsers');
    };
  }, [socket]);

  return (
    <Row style={{ height: '100vh' }}>
      <Col span={24}>{socket ? <UserCardList users={users} /> : <Spin />}</Col>
    </Row>
  );
}

export default App;
