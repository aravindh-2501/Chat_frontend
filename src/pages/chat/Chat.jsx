import React, { useState } from 'react';
import './Chat.css';
import Sidebar from './Sidebar';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="chat-container">
      <Sidebar setSelectedUser={setSelectedUser} selectedUser={selectedUser}/>
      <div className="chat-content">
        <div className="chat-header">
          <h2>{selectedUser?.username}</h2>
        </div>
        <div className="message-container">
          <MessageBubble selectedUser={selectedUser} setMessages={setMessages} messages={messages}/>
        </div>
        <ChatInput setMessages={setMessages} selectedUser={selectedUser}/>
      </div>
    </div>
  );
};

export default Chat;
