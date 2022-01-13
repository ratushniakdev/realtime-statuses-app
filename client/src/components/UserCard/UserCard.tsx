import React, { useState } from 'react';
import { Card, Col, Input, Row, Typography } from 'antd';
import { useSocketContext } from '../SocketProvider/context';
import moment from 'moment';

interface Props {
  id: string;
  ind: number;
  status: string;
  lastUpdate: Date | string;
}

export const UserCard: React.FC<Props> = ({ id, lastUpdate, ind, status }) => {
  const socket = useSocketContext();

  const [value, setValue] = useState('');

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setValue(text);
    socket?.emit('setStatus', JSON.stringify({ status: text, id: socket.id }));
  };

  const amIUser = socket!.id === id;

  return (
    <Card
      style={{
        height: '300px',
        width: '300px',
        borderRadius: '100%',
        backgroundColor: amIUser ? '#14C939' : '#444444',
      }}
    >
      <Row align="middle" justify="center">
        <Col style={{ textAlign: 'center' }}>
          <Typography.Title
            style={{ textAlign: 'center', color: '#fff', fontSize: '28px' }}
          >
            {amIUser ? 'You' : `Client ${ind + 1}`}
          </Typography.Title>
          <Col
            style={{ marginTop: '38px', width: '200px', textAlign: 'center' }}
          >
            {amIUser ? (
              <Input.TextArea
                onChange={onInputChange}
                value={value}
                style={{ height: '80px', width: '100%', resize: 'none' }}
                placeholder="Type your status..."
              />
            ) : (
              <Typography.Text style={{ color: '#fff', fontSize: '16px' }}>
                {status}
              </Typography.Text>
            )}
          </Col>
          {!amIUser && (
            <Typography.Text
              style={{ color: '#fff', fontSize: '16px', textAlign: 'center' }}
            >
              {lastUpdate && moment(lastUpdate).calendar()}
            </Typography.Text>
          )}
        </Col>
      </Row>
    </Card>
  );
};
