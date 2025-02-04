import React,{ useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/home.jsx';
import AddBirthday from './pages/addBirthday/addBirthday.jsx';
import CelebrityInfo from './pages/CelebritysBirthday/CelebritysBirthday.jsx';
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addBirthday" element={<AddBirthday />} />
      <Route path="/CelebritysBirthday" element={<CelebrityInfo />} />
    </Routes>
  );
}
export default App
