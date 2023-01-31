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
import Profil from './pages/Profil';
import Update from './pages/Update';
import AddKarateka from './pages/AddKarateka';
import AllKarateka from './pages/AllKarateka';
import RequireAuth from './components/RequireAuth';

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
    // btnPerso = bleu : navigation
    // btnDirection = noir : validation
    <div>
      <BrowserRouter>
        {/* On utilise notre composant dans notre JSX */}
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/connect' element={<Connect />} />
          <Route path='/subscribe' element={<Subscribe />} />

          {/* protected route User */}
          <Route
            element={<RequireAuth roles={['user', 'admin', 'superadmin']} />}
          >
            <Route path='/calendrier' element={<Calendrier />} />
            <Route path='/calendrier/:id' element={<CoursSelect />} />
            {/* Routes du profil */}
            <Route path='/profil/' element={<Profil />}>
              {/* sous routes */}
              <Route path='update' element={<Update />} />
              <Route path='add/karateka' element={<AddKarateka />} />
              <Route path='all/karateka' element={<AllKarateka />} />
              {/* fin sous routes */}
            </Route>
          </Route>
          {/* fin protected route User */}

          {/* protected route Admin */}
          <Route element={<RequireAuth roles={['admin', 'superadmin']} />}>
            <Route path='/admin' element={<Admin />} />
          </Route>
          {/* fin protected route Admin */}

          {/* protected route super Admin */}
          <Route element={<RequireAuth roles={['superadmin']} />}>
            <Route path='/superadmin' element={<SuperAdmin />} />
          </Route>
          {/* fin protected route super Admin */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
