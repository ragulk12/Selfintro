import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import ProfileList from './components/ProfileList';
import ProfileView from './components/ProfileView';
import ProfileForm from './components/ProfileForm';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profiles" element={<ProfileList />} />
        <Route path="/profiles/add" element={<ProfileForm />} />
        <Route path="/profiles/edit/:id" element={<ProfileForm />} />
        <Route path="/profiles/:id" element={<ProfileView />} />
      </Routes>
    </Router>
  );
};

export default App;
