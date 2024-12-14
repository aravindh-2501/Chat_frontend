import React, { useEffect, useState, useCallback } from 'react';
import './Sidebar.css';
import axios from 'axios';
import Select from 'react-select';

const Sidebar = ({setSelectedUser,selectedUser}) => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const user  = JSON.parse(localStorage.getItem('user-chat'))
  console.log("localStorage",user)
  useEffect(() => {
    const fetchUsers = async () => {
        if (!user?._id) {
            console.log('No logged-in user, aborting user fetch.');
            return;
        }

        try {
            const res = await axios.get(`https://chat-backend-1-9z10.onrender.com/api/users?userId=${user._id}`);
            setUsers(res?.data?.data || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    fetchUsers();
}, [user?._id]);


  useEffect(() => {
    const fetchUsersChat = async () => {
        if (!user?._id) {
            console.log('No logged-in user, aborting user fetch.');
            return;
        }

        try {
            const res = await axios.get(`https://chat-backend-1-9z10.onrender.com/api/getConvoUser?userId=${user._id}`);
            setChats(res?.data?.data || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    fetchUsersChat();
}, [user?._id]);



  useEffect(() => {
    console.log('Selected User:', selectedUser);
  }, [selectedUser]);

  const handleChange = (value) => {
    setSelectedUser(value?.user); 
};

console.log("chatshctasgsdchads",chats)

  const handleInputChange = useCallback((val) => {
    setSearch(val);
  }, []);

  const formatOptions = users.map((u) => ({
    label: u.username,
    value: u.username,
    user:u
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: '#ccc',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 999,
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? '#007bff' : 'white',
      ':hover': {
        backgroundColor: '#f0f0f0',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
    }),
  };

  return (
    <div className="sidebar">
      <Select
        options={formatOptions}
        placeholder="Search a user"
        onChange={handleChange}
        onInputChange={handleInputChange}
        inputValue={search}
        value={selectedUser}
        styles={customStyles}
      />

      {chats.map((c)=>(
        <>
        <p style={{padding:"1rem",background:"#212121",borderRadius:"10px",marginTop:"10px"}} onClick={()=>{setSelectedUser(c)}}>{c?.username}</p>
        </>
      ))}
    </div>
  );
};

export default Sidebar;
