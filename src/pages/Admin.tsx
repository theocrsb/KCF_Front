import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Admin = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <ul className='nav nav-pills nav-fill border-bottom border-secondary p-2'>
        <li className='nav-item'>
          <NavLink to='cours' className='nav-link' aria-disabled='true'>
            Gestion cours
          </NavLink>
        </li>

        <li className='nav-item'>
          <NavLink to='karatekas' className='nav-link' aria-current='page'>
            Commentaire karatékas
          </NavLink>
        </li>
      </ul>
      <div className='d-flex justify-content-center'></div>
      {/* OUTLET PERMET D'AFFICHER SELON L'URL */}
      <Outlet />
    </div>
  );
};

export default Admin;
