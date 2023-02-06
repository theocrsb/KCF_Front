import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const { name, email, message } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Envoyer l'email ici (nous verrons comment dans la prochaine étape)
    console.log(formData);
  };
  return (
    <div style={{ minHeight: '100vh' }}>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Nom</label>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='message'>Message</label>
          <input
            type='text'
            className='form-control'
            id='message'
            name='message'
            value={message}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default Contact;
