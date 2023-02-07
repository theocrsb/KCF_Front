import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instanceAxios } from '../axios/instance-axios';
import { ToastContext } from '../context/toast-context';

const Contact = () => {
  const { onToastChange, messageToast, colorToast } = useContext(ToastContext);

  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  let contenuMessage = {
    nom: nom,
    email: email,
    message: message,
  };
  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(contenuMessage, 'contenu du message');
    instanceAxios
      .post(`/messages`, 
        contenuMessage,
      )
      .then((response) => {
        // console.log('response', response);
        onToastChange(true);
        messageToast(`Message envoyé`);
        colorToast('success');
        navigate('/');
      })
      .catch((error) => {
        console.log('Error', error);
        onToastChange(true);
        messageToast(`Erreur lors de l'envoie du message`);
        colorToast('danger');
      });
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <div>
        <h3 className='text-center p-3 pt-4'>
          Message à l'équipe du karaté club de Fosses
        </h3>
      </div>
      <div className='d-flex flex-wrap justify-content-around m-3 mx-auto border rounded shadow-lg p-3 mb-5 bgCard'>
        <form onSubmit={handleSubmit}>
          <div className='form-group pt-3 input-group-lg'>
            <label htmlFor='name'>Nom prénom</label>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
          <div className='form-group '>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='message'>Message</label>
            <textarea
              className='form-control'
              id='message'
              name='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              style={{ resize: 'none' }}
            />
          </div>
          <div className='form-group d-flex justify-content-center'>
            <button
              type='submit'
              className='btn btn-primary btnDirection mb-3 mt-4'
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
