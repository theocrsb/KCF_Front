import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
// import 'bootstrap/dist/css/bootstrap.css';
import Calendrier from './pages/Calendrier';
import Connect from './pages/Connect';
import Subscribe from './pages/Subscribe';
import Admin from './pages/Admin';

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* On utilise notre composant dans notre JSX */}
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/calendrier' element={<Calendrier />} />
          <Route path='/connect' element={<Connect />} />
          <Route path='/subscribe' element={<Subscribe />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
