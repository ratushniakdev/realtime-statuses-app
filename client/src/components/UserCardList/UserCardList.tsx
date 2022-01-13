import { Card, Col, Row } from 'antd';
import React from 'react';
import { UserList } from '../../interfaces/User';
import UserCard from '../UserCard';

interface Props {
  users: UserList;
}

export const UserCardList: React.FC<Props> = ({ users }) => {
  return (
    <Card style={{ height: '80%', width: '80%' }} bordered={false}>
      <Row align="middle" justify="start" gutter={[40, 0]}>
        {users.map((u, i) => (
          <Col key={u.id}>
            <UserCard {...u} ind={i} />
          </Col>
        ))}
      </Row>
    </Card>
  );
};
