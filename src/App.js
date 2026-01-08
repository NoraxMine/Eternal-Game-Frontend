import './App.css';
import "./css/Header.css";
import "./css/Main.css";
import "./css/Footer.css";
import "./css/Login.css";
import "./css/Registr.css";
import "./css/Profile.css";
import "./css/Download.css";
import "./css/Find_User.css";
import "./css/Chat.css";
import "./css/Chat2.css";

import Login from './components/All_Users/Login';
import Chat from './components/All_Users/Chat';
import Registr from "./components/All_Users/Registr";
import Download from './components/All_Users/Download';
import Find_User from './components/All_Users/Find_User';
import Main from './components/All_Users/Main';
import Layout from './components/Layout';
import Guests from './components/Guests/Guests';
import Chat2 from './components/All_Users/Chat2';
import Profile from './components/Profile';

import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';


const APP_VERSION = "1.2.0";

function App() {
  const [user, setUser] = useState(null);


  function fLogin(userData) {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  }

  function fLogout() {
    setUser(null);
    localStorage.removeItem('currentUser');
  }

  useEffect(() => {
    const savedVersion = localStorage.getItem('app_version');

    if (savedVersion !== APP_VERSION) {
      localStorage.clear();

      localStorage.setItem('app_version', APP_VERSION);

      console.log(`Приложение обновлено до версии ${APP_VERSION}. localStorage очищен.`);
      
    }

    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={user ? <Navigate to="/home" replace /> : <Guests />} />
          <Route path='login' element={user ? <Navigate to="/home" replace /> : <Login openMain={fLogin} />} />
          <Route path="/registr" element={user ? <Navigate to="/home" replace /> : <Registr />} />

          <Route path='/home' element={user ? <Layout user={user} onLogout={fLogout} /> : <Navigate to="/" replace />}>
            <Route index element={<Main user={user} />} />
            <Route path="download" element={<Download currentUser={user}/>} />
            <Route path="profile/:userId" element={<Profile currentUser={user} />} />
            <Route path="user" element={user?.role === "user" ? <Navigate to={`/home/profile/${user.id}`} replace/> : <Navigate to="/home" replace/>}/>
            <Route path="admin" element={user?.role === "admin" ? <Navigate to={`/home/profile/${user.id}`} replace/> : <Navigate to="/home" replace/>}/>
            <Route path="finduser" element={<Find_User />} />
            <Route path="chat" element={<Chat2 currentUser={user} />} />
          </Route>

          <Route path='*' element={user ? <Navigate to="/home" replace /> : <Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;