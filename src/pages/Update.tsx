import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instanceAxios } from '../axios/instance-axios';
import { LoadingContext } from '../context/loading-spinner';
import { ToastContext } from '../context/toast-context';
import { User } from './Calendrier';

const Update = () => {
  // Lien avec le toast context
  const { onToastChange } = useContext(ToastContext);
  const { messageToast } = useContext(ToastContext);
  const { colorToast } = useContext(ToastContext);
  //
  const emailElement = useRef<HTMLInputElement>(null);
  const passwordElement = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>();
  const navigate = useNavigate();
  const { onLoadingChange } = useContext(LoadingContext);
  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    console.log(e);
  };

  useEffect(() => {
    // get avec axios standard
    // axios
    //   .get('http://localhost:8080/api/users/id/perso', {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log('Recuperation user impossible', error);
    //   });
    // get avec instance axios pour le spinner
    instanceAxios
      .get<User>('/users/id/perso', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
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

          <button type='submit' className='btn btn-primary btnDirection mt-3'>
            Mettre à jour
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
