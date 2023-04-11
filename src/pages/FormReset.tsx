import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { instanceAxios } from '../axios/instance-axios';
import { ToastContext } from '../context/toast-context';
import { PayloadToken } from '../interface/payloadToken.interface';

const FormReset = () => {
  const { onToastChange, messageToast, colorToast } = useContext(ToastContext);
  const [passwordState, setPasswordState] = useState<string>();
  const [passwordState2, setPasswordState2] = useState<string>();
  const [showState, setShowState] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  // utilisation des query params pour recuperer le token dans l'url
  let queryParam = new URLSearchParams(location.search);
  let recupToken = queryParam.get('token');
  //console.log("token récuperé dans l'url via les query params", recupToken);
  const tokenExpiration = (token: string | null) => {
    if (recupToken) {
      const decoded: PayloadToken = jwt_decode(recupToken);
      if (Date.now() <= decoded.exp * 1000) {
        return true;
      } else {
        return false;
      }
    }
  };

  let tokenValidator: boolean | undefined = tokenExpiration(recupToken);
  //   //console.log('le token est il encore valide:', tokenValidator);

  // Mise à jour des infos de l'utilisateur
  const passwordFunction1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordState(e.currentTarget.value);
  };
  const passwordFunction2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordState2(e.currentTarget.value);
  };
  const submitFunction = (e: React.FormEvent) => {
    e.preventDefault();
    //console.log('cliké');
    //console.log('password dans le state 1', passwordState);
    //console.log('password dans le state 2', passwordState2);
    // fonction de verification du mot de passe
    if (passwordState !== passwordState2) {
      onToastChange(true);
      messageToast('Les mots de passe ne correspondent pas.');
      colorToast('danger');
      //   setMessage('Les mots de passe ne correspondent pas.');
    } else if (tokenValidator !== true) {
      onToastChange(true);
      messageToast('Votre demande à expiré');
      colorToast('danger');
      //   setMessage('Votre demande à expiré');
    } else {
      instanceAxios
        .patch(`users/reset/password`, {
          password: passwordState,
          token: recupToken,
        })
        .then((response) => {
          //console.log(response);
          onToastChange(true);
          messageToast(`Mot de passe modifié avec succès`);
          colorToast('success');
          navigate('/connect');
        })
        .catch((error) => {
          //console.log(error);
          onToastChange(true);
          messageToast(`Erreur lors de la modification du mot de passe`);
          colorToast('danger');
        });
    }
  };
  return (
    <div style={{ minHeight: '100vh' }}>
      <div
        className='d-flex flex-wrap justify-content-around m-3 border rounded shadow-lg p-3 mb-5 bgCard pt-5 mt-5'
        style={{ backgroundColor: '#585B5E40', minHeight: '50vh' }}
      >
        <form className='text-center' onSubmit={submitFunction}>
          <h3 className='p-3 font-weight-bold'>Modification du mot de passe</h3>
          <div className='form-group mb-3 mt-3'>
            <label htmlFor='inputPassword' className='htmlForm-label' />
            <input
              type={showState ? 'text' : 'password'}
              className='form-control'
              id='inputPassword'
              placeholder='Nouveau mot de passe'
              onChange={passwordFunction1}
            />
          </div>

          <div id='mb-3' className='mb-3'>
            <label htmlFor='inputPassword' className='htmlForm-label' />
            <input
              type={showState ? 'text' : 'password'}
              className='form-control'
              id='inputPassword'
              placeholder='Comfirmez mot de passe'
              onChange={passwordFunction2}
            />
          </div>
          <div className='container-check-reset'>
            <input
              className='form-check-input'
              type='checkbox'
              id='mdp-afficher'
              name='drone'
              onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                setShowState(e.currentTarget.checked);
                //   //console.log('valeur de la checkbox', e.currentTarget.checked);
              }}
              // defaultChecked={user.role.label === "user" ? true : false}
            />
            <label className='label-reset' htmlFor='mdp-afficher'>
              Afficher le mot de passe
            </label>
          </div>

          {/* <p className='message'>{message}</p> */}
          <div className='button'>
            <button className='btn btn-primary btnDirection mt-5'>
              modifier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormReset;
