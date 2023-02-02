import React, { useContext, useRef, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ToastContext } from '../context/toast-context';

const Profil = () => {
  // Lien avec le toast context
  const { onToastChange } = useContext(ToastContext);
  const { messageToast } = useContext(ToastContext);
  const { colorToast } = useContext(ToastContext);
  //

  return (
    <div style={{ minHeight: '100vh' }}>
      <ul className='nav nav-pills nav-fill border-bottom border-secondary p-2'>
        <li className='nav-item'>
          <NavLink to='update' className='nav-link' aria-disabled='true'>
            Mettre à jour mon profil
          </NavLink>
        </li>

        <li className='nav-item'>
          <NavLink to='add/karateka' className='nav-link' aria-current='page'>
            Gestion karatéka
          </NavLink>
        </li>

        <li className='nav-item'>
          <NavLink to='all/karateka' className='nav-link' aria-current='page'>
            Gestion cours
          </NavLink>
        </li>
      </ul>
      <div className='d-flex justify-content-center'></div>
      {/* OUTLET PERMET D'AFFICHER SELON L'URL */}
      <Outlet />
    </div>
  );
};

export default Profil;
