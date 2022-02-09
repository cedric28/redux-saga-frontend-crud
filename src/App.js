import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Users from './pages/Users';
import Profile from './pages/Profile';
import Form from './pages/Form';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route element={<Home/>} path="/" index/>
          <Route element={<Users/>} path="/users" />
          <Route element={<Profile/>} path="/profile/:user_id" />
          <Route element={<Form/>} path="/user/:id" />
        </Routes>
      </div>
    </Router>
  
  );
}

export default App;