import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Register = ({ registerUser }) => {
  const [nickname, setNickname] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(nickname);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formNickname">
        <Form.Label>Nickname</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
};

export default Register;
