import React, { useContext, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
      <div className='d-flex justify-content-center'>
        {/* <ul className='nav nav-tabs'> */}
        {/* 1 */}
        {/* <li className='nav-item'> */}
        <div className='card' style={{ width: '49%', margin: '5px' }}>
          <div className='card-body'>
            <h5 className='card-title text-center'>Karatéka</h5>
            <div className='d-flex justify-content-center'>
              <button
                onClick={() => handleClick('karateka')}
                className='btn btn-primary btn-sm btnDirection'
              >
                Afficher
              </button>
            </div>
          </div>
        </div>
        {/* </li> */}
        {/* 2 */}
        <div className='card' style={{ width: '49%', margin: '5px' }}>
          <div className='card-body'>
            <h5 className='card-title text-center'>Profil</h5>
            <div className='d-flex justify-content-center'>
              <button
                onClick={() => handleClick('default')}
                className='btn btn-primary btn-sm btnDirection'
              >
                Afficher
              </button>
            </div>
          </div>
        </div>
        {/* 3 */}
        <div className='card' style={{ width: '49%', margin: '5px' }}>
          <div className='card-body'>
            <h5 className='card-title text-center'>Cours</h5>
            <div className='d-flex justify-content-center'>
              <button
                onClick={() => handleClick('cours')}
                className='btn btn-primary btn-sm btnDirection'
              >
                Afficher
              </button>
            </div>
          </div>
        </div>
        {/* </ul> */}
        {/* Fin select */}
      </div>
      {/* --------------------------------Default-------------------------------- */}
      {displayContent === 'default' && (
        <div style={{ minHeight: '50vh' }}>
          <div className='d-flex flex-wrap justify-content-around m-3 border border-light rounded shadow-lg p-3 mb-5 bgCard mt-5'>
            <form className='text-center' onSubmit={handleSubmit}>
              <h3 className='p-3 font-weight-bold'>
                Modifier adresse email ou mot de passe
              </h3>
              <div className='form-group mb-3 mt-3'>
                <label htmlFor='exampleInputEmail1'>Adresse Email :</label>
                <input
                  type='email'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='votre.email@mail.fr'
                  ref={emailElement}
                />
              </div>
              {/* password */}
              <div className='form-group mb-3'>
                <label htmlFor='exampleInputPassword1'>Mot de passe :</label>
                <input
                  type='password'
                  className='form-control'
                  id='exampleInputPassword1'
                  placeholder='Votre mot de passe'
                  ref={passwordElement}
                />
              </div>
              {/* confirmpassword */}
              <div className='form-group mb-3'>
                <label htmlFor='exampleInputPassword1'>Confirmation :</label>
                <input
                  type='password'
                  className='form-control'
                  id='exampleInputPassword1'
                  placeholder='Votre mot de passe'
                  ref={passwordElement}
                />
              </div>

              <button type='submit' className='btn btn-primary btnPerso mt-3'>
                Mettre à jour
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --------------------------------Karateka-------------------------------- */}
      {displayContent === 'karateka' && <div>Karateka</div>}

      {/* --------------------------------Cours-------------------------------- */}
      {displayContent === 'cours' && <div>Cours</div>}
    </div>
  );
};

export default Profil;
