import React from 'react';
import { ListGroup } from 'react-bootstrap';

const UserListWindow = ({ users, onSelectUser }) => {
  return (
    <div>
      <h3>Registered Users</h3>
      <ListGroup>
        {users.map((user) => (
          <ListGroup.Item key={user.wallet} onClick={() => onSelectUser(user)}>
            {user.nickname} ({user.wallet})
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default UserListWindow;
