import { DeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ToastContext } from '../context/toast-context';
import { Karateka } from './Calendrier';

const AddKarateka = () => {
  const [allKarateka, SetAllKarateka] = useState<Karateka[]>();
  // Lien avec le toast context
  const { onToastChange } = useContext(ToastContext);
  const { messageToast } = useContext(ToastContext);
  const { colorToast } = useContext(ToastContext);
  //
  const [count, setCount] = useState<number>(0);
  const nom = useRef<HTMLInputElement>(null);
  const prenom = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const sexe = useRef<HTMLSelectElement>(null);
  const ceinture = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    //get les karateka du user
    axios
      .get(`http://localhost:8080/api/karatekas/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        // console.log('Get All karateka', response);
        SetAllKarateka(response.data);
      })
      .catch((error) => {
        // console.log('Get All Cours Error', error);
      });
  }, [count]);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    e.preventDefault();

    if (window.confirm('Voulez vous vraiment supprimer ce karatéka ?')) {
      axios
        .delete(
          `http://localhost:8080/api/karatekas/${e.currentTarget.value}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        )
        .then((response) => {
          // console.log('response', response);
          setCount(count + 1);
          onToastChange(true);
          messageToast(`Karatéka supprimé`);
          colorToast('success');
        })
        .catch((error) => {
          console.log('Error', error);
        });
    }
  };

  /////////////////////////////////////////////// MODAL ///////////////////////////////////////////////

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const showModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  // suppression karatéka

  const handleSumbit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8080/api/karatekas/`,
        {
          nom: nom.current?.value,
          prenom: prenom.current?.value,
          age: age.current?.value,
          sexe: sexe.current?.value,
          ceinture: ceinture.current?.value,
          membre: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      )
      .then((response) => {
        // console.log('response', response);
        setCount(count + 1);
        onToastChange(true);
        messageToast(`Karatéka Créer`);
        colorToast('success');
        setIsOpen(false);
      })
      .catch((error) => {
        console.log('Error', error);
        onToastChange(true);
        messageToast(`Erreur lors de la création du karatéka`);
        colorToast('danger');
      });
  };
  return (
    <div style={{ minHeight: '100vh' }} className='list-group '>
      <ul className='list-group pt-3'>
        {allKarateka?.map((x, i) => (
          <li
            key={i}
            className='list-group-item'
            style={{ paddingLeft: '5%', width: '80%', marginLeft: '10%' }}
          >
            {x.prenom} {x.nom}{' '}
            <button
              onClick={handleDelete}
              value={x.id}
              style={{ backgroundColor: 'transparent', border: 'none' }}
            >
              <DeleteOutlined />
            </button>
          </li>
        ))}
        <li className='list-group-item text-center'>
          <button className='btn btn-primary btnDirection' onClick={showModal}>
            Ajouter un karatéka <UserAddOutlined />
          </button>
        </li>
      </ul>

      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Création d'un karatéka</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={handleSumbit}>
              <div className='form-group'>
                <label htmlFor='Nom'>Nom</label>
                <input
                  type='text'
                  className='form-control'
                  id='Nom'
                  placeholder='Nom'
                  required
                  ref={nom}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='Prénom'>Prénom</label>
                <input
                  type='text'
                  className='form-control'
                  id='Prénom'
                  placeholder='Prénom'
                  required
                  ref={prenom}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='Age'>Age</label>
                <input
                  type='number'
                  className='form-control'
                  id='Age'
                  placeholder='Age'
                  required
                  ref={age}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='Sexe'>Sexe</label>
                <select className='form-control' id='Sexe' required ref={sexe}>
                  <option>homme</option>
                  <option>femme</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='Ceinture'>Ceinture</label>
                <select
                  className='form-control'
                  id='Ceinture'
                  required
                  ref={ceinture}
                >
                  <option>blanche</option>
                  <option>blanche/jaune</option>
                  <option>jaune</option>
                  <option>jaune/orange</option>
                  <option>orange</option>
                  <option>orange/verte</option>
                  <option>verte</option>
                  <option>verte/bleu</option>
                  <option>bleue</option>
                  <option>bleue/marron</option>
                  <option>marron</option>
                  <option>noire</option>
                </select>
              </div>
              Valider
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
      {/* fin modal ajout karateka */}
    </div>
  );
};

export default AddKarateka;
