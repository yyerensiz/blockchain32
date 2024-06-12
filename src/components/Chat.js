import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const Chat = ({ contract, account, selectedUser }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    loadChatHistory();
  }, [selectedUser]);

  const loadChatHistory = async () => {
    const history = await contract.methods.getChatHistory(account, selectedUser.wallet).call();
    setChatHistory(history);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    await contract.methods.sendMessage(selectedUser.wallet, message).send({ from: account });
    setMessage('');
    loadChatHistory();
  };

  return (
    <div>
      <h3>Chat with {selectedUser.nickname}</h3>
      <div style={{ border: '1px solid black', padding: '10px', height: '400px', overflowY: 'scroll' }}>
        {chatHistory.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender === account ? 'You' : selectedUser.nickname}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <Form onSubmit={handleSendMessage}>
        <Form.Group controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </div>
  );
};

export default Chat;
