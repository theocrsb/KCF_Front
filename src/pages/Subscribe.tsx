import axios from 'axios';
import React, { FormEvent, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Subscribe = () => {
  const emailElement = useRef<HTMLInputElement>(null);
  const passwordElement = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(emailElement.current?.value);
    console.log(passwordElement.current?.value);

    // Requete Sub
    axios
      .post('http://localhost:8080/api/auth/register/', {
        email: emailElement.current?.value,
        password: passwordElement.current?.value,
      })
      .then((response) => {
        console.log(response);
        // Futur TOAST
        navigate('/connect');
        setMessage('Inscription réussie !');
      })
      .catch((error) => {
        console.log('Inscription impossible', error);
      });
  };
  return (
    <div style={{ minHeight: '100vh' }}>
      <div className='d-flex text-center justify-content-center'>
        <div>
          <NavLink to='/connect' className='nav-link'>
            <button type='submit' className='btn btn-primary btnDirection mt-3'>
              Page de connexion
            </button>
          </NavLink>
        </div>

        <div>
          <button type='submit' className='btn btn-primary btnDirection mt-3'>
            <NavLink to='/' className='nav-link'>
              Page d'inscription
            </NavLink>
          </button>
        </div>
      </div>
      <div className='d-flex flex-wrap justify-content-around m-3 border border-light rounded shadow-lg p-3 mb-5 bgCard'>
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
            className='btn btn-primary btnPerso mt-3'
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
