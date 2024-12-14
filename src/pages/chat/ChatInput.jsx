import React, { useEffect, useState } from 'react';
import './ChatInput.css';
import { io } from 'socket.io-client';
import axios from 'axios';

const SOCKET_URL = 'https://chat-backend-1-9z10.onrender.com';

const ChatInput = ({ setMessages, selectedUser }) => {
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);
  const user = JSON.parse(localStorage.getItem("user-chat"));

  useEffect(() => {
    const socketInstance = io(SOCKET_URL);
    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log("Connected with socket ID:", socketInstance.id);
      // Register user on the server
      socketInstance.emit('register_user', user._id);
    });

    socketInstance.on('receive_msg', (msg) => {
      console.log("Received message:", msg);
      setMessages((prevMessages) => [
        ...prevMessages,
        msg, 
      ]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [user._id, setMessages]);

  const handleSend = () => {
    if (input.trim() && socket) {
      const message = {
        sender: user._id, 
        receiver: selectedUser._id, 
        text: input,
      };

      // Emit the message to the server
      socket.emit('send_message', message);

      // Save the message to the database via API
      axios.post("https://chat-backend-1-9z10.onrender.com/api/sendMsg", message)
        .then(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: user._id, text: input },
          ]);          
        })
        .catch((error) => console.error("Error saving message:", error));

      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        className="chat-input"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown} 
      />
      <button className="send-btn" onClick={handleSend}>
        Send
      </button>
    </div>
  );
};

export default ChatInput;
