import axios from 'axios';
import React, { FormEvent, useContext, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { instanceAxios } from '../axios/instance-axios';
import { ToastContext } from '../context/toast-context';

const Subscribe = () => {
  const emailElement = useRef<HTMLInputElement>(null);
  const passwordElement = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  // Lien avec le toast context
  const { onToastChange, messageToast, colorToast } = useContext(ToastContext);
  //
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(emailElement.current?.value);
    console.log(passwordElement.current?.value);

    // Requete Sub
    instanceAxios
      .post('auth/register/', {
        email: emailElement.current?.value,
        password: passwordElement.current?.value,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 400) {
          onToastChange(true);
          messageToast(
            `Erreur lors de l'inscription. Le mot de passe de contenir 6 caractère.`
          );
          colorToast('danger');
        }

        if (response.data.statusCode === 400) {
          onToastChange(true);
          messageToast(
            `Erreur lors de l'inscription. Le mot de passe de contenir 6 caractère.`
          );
          colorToast('danger');
        }
        if (response.status === 409) {
          onToastChange(true);
          messageToast(`Cet email existe déjà dans notre base de donnée.`);
          colorToast('danger');
        }

        if (response.data.statusCode === 409) {
          onToastChange(true);
          messageToast(`Cet email existe déjà dans notre base de donnée.`);
          colorToast('danger');
        }
        onToastChange(true);
        messageToast('Inscription réussie ! Veuillez vous connecter.');
        colorToast('success');
        navigate('/connect');
      })
      .catch((error) => {
        console.log('Inscription impossible', error);
        if (error.response.data.statusCode === 409) {
          onToastChange(true);
          messageToast(`Cet email existe déjà dans notre base de donnée.`);
          colorToast('danger');
        }

        if (error.response.data.statusCode === 400) {
          onToastChange(true);
          messageToast(
            `Votre mot de passe doit contenir au moins 6 caractères.`
          );
          colorToast('danger');
        }
        onToastChange(true);
        messageToast(
          `Erreur lors de l'inscription. Le mot de passe de contenir 6 caractère et l'adresse email doit être unique.`
        );
        // messageToast(error.response.data.message[0]);
        colorToast('danger');
      });
  };
  return (
    <div style={{ minHeight: '100vh' }}>
      <div className='d-flex text-center justify-content-center'>
        <div>
          <NavLink to='/connect' className='nav-link'>
            <button
              type='submit'
              className='btn btn-primary btnPerso mt-5 mb-4'
            >
              Page de connexion
            </button>
          </NavLink>
        </div>

        <div>
          <button type='submit' className='btn btn-primary btnPerso mt-5 mb-4'>
            <NavLink to='/' className='nav-link'>
              Page d'inscription
            </NavLink>
          </button>
        </div>
      </div>
      <div
        className='d-flex flex-wrap justify-content-around m-3 border rounded shadow-lg p-3 mb-5 bgCard'
        style={{ backgroundColor: '#585B5E40', minHeight: '50vh' }}
      >
        <form className='text-center'>
          <h3 className='p-3 font-weight-bold'> Page d'inscription</h3>
          <div className='form-group mb-3 mt-3'>
            <label htmlFor='exampleInputEmail1'>Adresse Email :</label>
            <input
              type='email'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='votre.email@mail.fr'
              ref={emailElement}
              required
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
              required
            />
          </div>

          <button
            type='submit'
            className='btn btn-primary btnDirection mt-5'
            onClick={handleSubmit}
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
