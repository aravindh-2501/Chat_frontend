import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Using aliases in imports
import Login from '@auth/Login';
import Chat from '@pages/chat/Chat';
import Register from '@auth/Register';
import { Toaster } from 'react-hot-toast';

const App = () => {
  


  return (
    <div>
      <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login/>}
          />
          <Route
            path="/register"
            element={<Register/>}/>
          <Route path="/chat" element={<Chat  />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
