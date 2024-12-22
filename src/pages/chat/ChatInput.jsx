import React, { useEffect, useState } from 'react';
import './ChatInput.css';
import { io } from 'socket.io-client';
import axios from 'axios';
import { baseUrl } from '../../api';
import EmojiPicker from 'emoji-picker-react';
import { Emoji } from 'emoji-picker-react';

const SOCKET_URL = baseUrl;

const ChatInput = ({ setMessages, selectedUser }) => {
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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
      setMessages((prevMessages) => [...prevMessages, msg]);
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
      axios.post(`${baseUrl}/api/sendMsg`, message)
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

  const handleEmojiClick = (emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
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
      <div className="lass okkk">
        

      </div>
      <div className="emoji-container" style={{ position: 'relative' }}>
        <button
          className="emoji-toggle-btn"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
        >
          <Emoji unified="1f60a" size={25} />
        </button>
        {showEmojiPicker && (
          <div className="emoji-picker" style={{ position: 'absolute', bottom: '3rem', right: '0rem' }}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
      <button className="send-btn" onClick={handleSend}>
        Send
      </button>
    </div>
  );
};

export default ChatInput;
