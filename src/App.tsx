import React, { useContext } from 'react';
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
import CoursSelect from './pages/CoursSelect';
import Footer from './components/footer';
import SuperAdmin from './pages/SuperAdmin';

export interface PayloadToken {
  exp: number;
  iat: number;
  id: string;
  role: Role;
  email: string;
}

export interface Role {
  id: string;
  label: string;
}

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
          <Route path='/superadmin' element={<SuperAdmin />} />
          <Route path='/calendrier/:id' element={<CoursSelect />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
