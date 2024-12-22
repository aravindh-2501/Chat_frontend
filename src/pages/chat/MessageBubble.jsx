import React, { useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import "./MessageBubble.css";
import { baseUrl } from '../../api';

const MessageBubble = ({ selectedUser, setMessages, messages }) => {
  const user = useMemo(() => JSON.parse(localStorage.getItem("user-chat")), []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/getConvo/${user._id}`, {
          params: { receiver: selectedUser._id }
        });
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser, user._id, setMessages]);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Trigger scroll when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  console.log("messagesacwq3ws",messages)

  return (
    <div className="message-list">
      {messages.map((msg) => (
        <div 
          key={msg._id} 
          className={`message-bubble ${msg.sender === user._id ? 'user' : 'other'}`}
        >
          <p>{msg.text}</p>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
  
};

export default MessageBubble;
