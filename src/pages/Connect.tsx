import React, { FormEvent, useContext, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContext } from '../context/toast-context';

const Connect = () => {
  // Lien avec le toast context
  const { onToastChange } = useContext(ToastContext);
  const { messageToast } = useContext(ToastContext);
  const { colorToast } = useContext(ToastContext);
  //
  const emailElement = useRef<HTMLInputElement>(null);
  const passwordElement = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>();
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(emailElement.current?.value);
    console.log(passwordElement.current?.value);

    // Requete pour se connecter
    axios
      .post('http://localhost:8080/api/auth/login', {
        email: emailElement.current?.value,
        password: passwordElement.current?.value,
      })
      .then((response) => {
        console.log(response);
        const token = response.data.accessToken;
        // console.log('token lors de la connexion', token);
        //Mettre le token dans le local storage
        localStorage.setItem('accessToken', token);
        //Futur mettre token dans context + TOAST
        onToastChange(true);
        messageToast('Connexion réussie !');
        colorToast('success');
        // Redirection vers Calendrier
        // setTimeout(() => {
        navigate('/calendrier');
        // }, 0);
        setMessage('Connexion réussie !');
      })
      .catch((error) => {
        onToastChange(true);
        messageToast(error.response.data.message);
        console.log('connexion impossible', error.response.data.message);
      });

    console.log(message);
  };
  return (
    <div style={{ minHeight: '100vh' }}>
      <div className='d-flex text-center justify-content-center'>
        <div>
          <button type='submit' className='btn btn-primary btnPerso mt-3'>
            <NavLink to='' className='nav-link'>
              Page de connexion
            </NavLink>
          </button>
        </div>

        <div>
          <button type='submit' className='btn btn-primary btnPerso mt-3'>
            <NavLink to='/subscribe' className='nav-link'>
              Page d'inscription
            </NavLink>
          </button>
        </div>
      </div>
      <div className='d-flex flex-wrap justify-content-around m-3 border border-light rounded shadow-lg p-3 mb-5 bgCard'>
        <form className='text-center'>
          <h3 className='p-3 font-weight-bold'>Page de connexion</h3>
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

          <button
            type='submit'
            className='btn btn-primary btnDirection mt-3'
            onClick={handleSubmit}
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Connect;
