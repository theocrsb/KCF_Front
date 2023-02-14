import React, { FormEvent, useContext, useRef } from 'react';
import { instanceAxios } from '../axios/instance-axios';
import { ToastContext } from '../context/toast-context';

const Reset = () => {
  // Lien avec le toast context
  const { onToastChange, messageToast, colorToast } = useContext(ToastContext);
  //
  const emailElement = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(emailElement.current?.value);

    // Requete pour se connecter
    instanceAxios
      .post('users/reset/password', {
        email: emailElement.current?.value,
      })
      .then((response) => {
        console.log(response);
        onToastChange(true);
        messageToast('Email envoyé ! Veuillez verifier votre boite mail.');
        colorToast('success');
      })
      .catch((error) => {
        onToastChange(true);
        messageToast(`Erreur lors de l'envoie d'email`);
        colorToast('danger');
      });
  };
  return (
    <div style={{ minHeight: '100vh' }}>
      {' '}
      <div
        className='d-flex flex-wrap justify-content-around m-3 border rounded shadow-lg p-3 mb-5 bgCard pt-5 mt-5'
        style={{ backgroundColor: '#585B5E40', minHeight: '50vh' }}
      >
        <form className='text-center' onSubmit={handleSubmit}>
          <h3 className='p-3 font-weight-bold'>Page de reinitialisation</h3>
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

          <button
            type='submit'
            className='btn btn-primary btnDirection mt-5'
            // onClick={handleSubmit}
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reset;
