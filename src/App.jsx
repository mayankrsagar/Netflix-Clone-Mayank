import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import {
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { auth } from './firebase';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      } else {
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className="app">
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
  );
};

export default App;
