import React, { useContext, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ToastContext } from '../context/toast-context';

const CourAdmin = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // Lien avec le toast context
  const { onToastChange, messageToast, colorToast } = useContext(ToastContext);
  //
  const [count, setCount] = useState<number>(0);
  const sensei = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);
  const type = useRef<HTMLInputElement>(null);
  const note = useRef<HTMLInputElement>(null);

  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const showModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  // fonction création
  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(sensei.current?.value);
    console.log(date.current?.value);
  };
  return (
    <div>
      <div className='d-flex justify-content-center border-bottom'>
        <button
          className='btn btn-primary btnDirection m-3'
          onClick={showModal}
        >
          Ajouter un cours
        </button>
      </div>
      <div></div>
      {/* info */}
      {/* {isLoading ? (
        <div>Chargement...</div>
      ) : ( */}
      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Création d'un cours</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={handleSumbit}>
              <div className='form-group'>
                <label htmlFor='sensei'>Sensei</label>
                <input
                  type='text'
                  className='form-control'
                  id='sensei'
                  placeholder='sensei'
                  required
                  ref={sensei}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='date'>Date / Heure</label>
                <input
                  type='datetime-local'
                  className='form-control'
                  id='date'
                  placeholder='date'
                  required
                  ref={date}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='type'>Type de cours</label>
                <input
                  type='text'
                  className='form-control'
                  id='type'
                  placeholder='type'
                  required
                  ref={type}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='note'>Commentaire</label>
                <input
                  type='text'
                  className='form-control'
                  id='note'
                  placeholder='note'
                  required
                  ref={note}
                />
              </div>

              <button className='btn btn-primary btnDirection mt-3'>
                Valider
              </button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={hideModal} className='btn btn-primary btnPerso'>
            Fermer
          </button>
        </Modal.Footer>
      </Modal>
      {/* )} */}
    </div>
  );
};

export default CourAdmin;
