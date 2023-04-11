import React, { useContext, useState } from 'react';
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
import RequireAuth from './components/RequireAuth';
import Interceptor from './axios/Interceptor';
import NotFound from './pages/NotFound';
import MemberAuth from './components/RequireMember';
import KaratekaAdmin from './pages/KaratekaAdmin';
import CourAdmin from './pages/CourAdmin';
import Contact from './pages/Contact';
import Messages from './pages/Messages';
import Reset from './pages/Reset';
import FormReset from './pages/FormReset';

function App() {
  return (
    // btnPerso = bleu : navigation
    // btnDirection = noir : validation
    // <div style={{ fontFamily: 'Nunito' }}>
    <div>
      <BrowserRouter>
        <Interceptor>
          <>
            <NavBar />
            <Routes>
              <Route path='*' element={<NotFound />} />
              <Route path='/' element={<Home />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/connect' element={<Connect />} />
              <Route path='/subscribe' element={<Subscribe />} />
              <Route path='/reset' element={<Reset />} />
              <Route path='/formreset' element={<FormReset />} />

              {/* -protected route User */}
              <Route
                element={
                  <RequireAuth roles={['user', 'admin', 'superadmin']} />
                }
              >
                <Route path='/calendrier' element={<Calendrier />} />
                <Route path='/calendrier/:id' element={<CoursSelect />} />
                {/* --Routes du profil */}
                <Route path='/profil/' element={<Profil />}>
                  {/* ---sous routes */}
                  <Route path='update' element={<Update />} />
                  {/* ----protected route member */}
                  <Route element={<MemberAuth member={['member']} />}>
                    <Route path='add/karateka' element={<AddKarateka />} />
                    {/* <Route path='all/karateka' element={<AllKarateka />} />
                    <Route
                      path='all/karateka/:id'
                      element={<CoursByKarateka />}
                    /> */}
                  </Route>
                  {/* ---- */}
                  {/* ---fin sous routes */}
                </Route>
              </Route>
              {/* -fin protected route User */}

              {/* -protected route Admin */}
              <Route element={<RequireAuth roles={['admin', 'superadmin']} />}>
                <Route path='/admin/' element={<Admin />}>
                  <Route path='cours' element={<CourAdmin />} />
                  <Route path='karatekas' element={<KaratekaAdmin />} />
                  <Route path='messages' element={<Messages />} />
                </Route>
              </Route>
              {/* -fin protected route Admin */}

              {/* -protected route super Admin */}
              <Route element={<RequireAuth roles={['superadmin']} />}>
                <Route path='/superadmin' element={<SuperAdmin />} />
              </Route>
              {/* -fin protected route super Admin */}
            </Routes>
            <Footer />
          </>
        </Interceptor>
      </BrowserRouter>
    </div>
  );
}

export default App;
