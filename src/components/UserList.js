import React from 'react';
import { ListGroup } from 'react-bootstrap';

const UserList = ({ users, onSelectUser }) => {
  return (
    <ListGroup>
      {users.map((user, index) => (
        <ListGroup.Item key={index} onClick={() => onSelectUser(user)}>
          {user.nickname}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default UserList;
