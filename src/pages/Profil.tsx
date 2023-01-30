import React, { useContext, useRef, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ToastContext } from '../context/toast-context';

const Profil = () => {
  // Lien avec le toast context
  const { onToastChange } = useContext(ToastContext);
  const { messageToast } = useContext(ToastContext);
  const { colorToast } = useContext(ToastContext);
  //
  const emailElement = useRef<HTMLInputElement>(null);
  const passwordElement = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>();
  const navigate = useNavigate();

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    console.log(e);
  };

  // affichage condiotionnel
  const [displayContent, setDisplayContent] = useState<string>('default');

  const handleClick = (contentType: string) => {
    setDisplayContent(contentType);
  };
  //

  return (
    <div style={{ minHeight: '100vh' }}>
      <ul className='nav'>
        <li className='nav-item'>
          <NavLink
            to='all/karateka'
            className='nav-link active'
            aria-current='page'
          >
            Gestion cours/karatéka
          </NavLink>
        </li>

        <li className='nav-item'>
          <NavLink
            to='add/karateka'
            className='nav-link active'
            aria-current='page'
          >
            Ajouter un Karatéka
          </NavLink>
        </li>

        <li className='nav-item'>
          <NavLink to='update' className='nav-link' aria-disabled='true'>
            Mettre à jour mon profil
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
