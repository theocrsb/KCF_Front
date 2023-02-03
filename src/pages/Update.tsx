import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instanceAxios } from '../axios/instance-axios';
import { LoadingContext } from '../context/loading-spinner';
import { ToastContext } from '../context/toast-context';
import { User } from './Calendrier';

const Update = () => {
  // Lien avec le toast context
  const { onToastChange, messageToast, colorToast } = useContext(ToastContext);
  //
  const [userEmail, setUserEmail] = useState<string>('');
  const passwordElement = useRef<HTMLInputElement>(null);
  const passwordElementConfirm = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      passwordElement?.current?.value !== passwordElementConfirm?.current?.value
    ) {
      onToastChange(true);
      messageToast('Le mot de passe et la confirmation ne correspondent pas');
      colorToast('danger');
      return;
    }

    // confition si MDP est remplis :

    let patchData: { email: string; password?: string } = {
      email: userEmail,
    };

    if (
      passwordElement?.current?.value !== '' &&
      passwordElement?.current?.value !== null &&
      passwordElement?.current?.value !== undefined
    ) {
      patchData.password = passwordElement?.current?.value;
    }

    instanceAxios
      .patch(`/users/id/perso`, patchData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        console.log(response);
        onToastChange(true);
        messageToast('Vos informations ont bien été mises à jour !');
        colorToast('success');
        navigate('/calendrier');
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.statusCode === 400) {
          onToastChange(true);
          messageToast(error.response.data.message[0]);
          colorToast('danger');
        }
      });
  };

  useEffect(() => {
    instanceAxios
      .get<User>('/users/id/perso', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUserEmail(response.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(userEmail, 'user dans update');
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
              // ref={emailElement}
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
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
              ref={passwordElementConfirm}
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
