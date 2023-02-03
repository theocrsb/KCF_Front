import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { instanceAxios } from '../axios/instance-axios';
import { ToastContext } from '../context/toast-context';
import { Karateka } from './Calendrier';

const AddKarateka = () => {
  // let emptyKarateka: Karateka = {
  //   id: '',
  //   nom: '',
  //   prenom: '',
  //   age: 0,
  //   sexe: '',
  //   ceinture: '',
  //   note: '',
  // };
  const [allKarateka, SetAllKarateka] = useState<Karateka[]>();
  const [oneKaratekaNom, SetOneKaratekaNom] = useState<string>('');
  const [oneKaratekaPrenom, SetOneKaratekaPrenom] = useState<string>('');
  const [oneKaratekaAge, SetOneKaratekaAge] = useState<number>(0);
  const [oneKaratekaSexe, SetOneKaratekaSexe] = useState<string>('');
  const [oneKaratekaCeinture, SetOneKaratekaCeinture] = useState<string>('');
  const [id, setId] = useState<string>('');
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

  // const nomUpdate = useRef<HTMLInputElement>(null);
  // const prenomUpdate = useRef<HTMLInputElement>(null);
  // const ageUpdate = useRef<HTMLInputElement>(null);
  // const sexeUpdate = useRef<HTMLSelectElement>(null);
  // const ceintureUpdate = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    //get les karateka
    instanceAxios
      .get<Karateka[]>(`/karatekas/`, {
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
    // console.log(e.currentTarget.value);
    e.preventDefault();

    if (window.confirm('Voulez vous vraiment supprimer ce karatéka ?')) {
      instanceAxios
        .delete(`/karatekas/${e.currentTarget.value}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
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

  /////////////////////////////////////////////// MODAL CREATE ///////////////////////////////////////////////

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const showModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  /////////////////////////////////////////////// MODAL UPDATE ///////////////////////////////////////////////

  const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const showModalUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value, 'showModalUpdate');
    setIsOpenUpdate(true);

    instanceAxios
      .get<Karateka>(`/karatekas/${e.currentTarget.value}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        // console.log('Get All karateka', response);
        console.log(response.data.nom, 'à louverture de la modale');
        // setId(e.currentTarget.value);
        SetOneKaratekaNom(response.data.nom);
        SetOneKaratekaPrenom(response.data.prenom);
        SetOneKaratekaAge(response.data.age);
        SetOneKaratekaSexe(response.data.sexe);
        SetOneKaratekaCeinture(response.data.ceinture);
        setId(response.data.id);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        // console.log('Get All Cours Error', error);
      });
  };

  const hideModalUpdate = () => {
    setIsOpenUpdate(false);
  };

  const handleUpdate = (e: React.MouseEvent<HTMLFormElement>) => {
    console.log(e.currentTarget.value);
    e.preventDefault();
    instanceAxios
      .patch(
        `/karatekas/${id}`,
        {
          nom: oneKaratekaNom,
          prenom: oneKaratekaPrenom,
          age: oneKaratekaAge,
          sexe: oneKaratekaSexe,
          ceinture: oneKaratekaCeinture,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      )
      .then((response) => {
        console.log('response', response);
        setCount(count + 1);
        onToastChange(true);
        messageToast(`Karatéka modifié`);
        colorToast('success');
        setIsOpenUpdate(false);
      })
      .catch((error) => {
        console.log('Error', error);
        onToastChange(true);
        messageToast(`Erreur lors de la création du karatéka`);
        colorToast('danger');
      });
  };

  // create
  const handleSumbit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    instanceAxios
      .post(
        `/karatekas/`,
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

  console.log(oneKaratekaNom, 'oneKaratekaNom valeur avant remplissage');
  return (
    <div style={{ minHeight: '100vh' }} className='list-group '>
      <ul className='list-group pt-3'>
        {allKarateka?.map((x, i) => (
          <li
            key={i}
            className='list-group-item'
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingLeft: '5%',
              width: '80%',
              marginLeft: '10%',
            }}
          >
            <div>
              {x.prenom} {x.nom} : {x.age} ans. Ceinture {x.ceinture}
            </div>
            <div>
              <button
                onClick={showModalUpdate}
                value={x.id}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
              >
                <EditOutlined />
              </button>
              <button
                onClick={handleDelete}
                value={x.id}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
              >
                <DeleteOutlined />
              </button>
            </div>
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
      {/* modale update */}
      {isLoading ? (
        <div>Chargement...</div>
      ) : (
        <Modal show={isOpenUpdate} onHide={hideModalUpdate}>
          <Modal.Header>
            <Modal.Title>Modification d'un karatéka</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form onSubmit={handleUpdate}>
                <div className='form-group'>
                  <label htmlFor='Nom'>Nom</label>
                  <input
                    type='text'
                    className='form-control'
                    id='Nom'
                    placeholder='Nom'
                    required
                    // ref={nomUpdate}
                    value={oneKaratekaNom}
                    onChange={(e) => SetOneKaratekaNom(e.target.value)}
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
                    // ref={prenomUpdate}
                    value={oneKaratekaPrenom}
                    onChange={(e) => SetOneKaratekaPrenom(e.target.value)}
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
                    // ref={ageUpdate}
                    value={oneKaratekaAge}
                    onChange={(e) => SetOneKaratekaAge(e.target.valueAsNumber)}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='Sexe'>Sexe</label>
                  <select
                    className='form-control'
                    id='Sexe'
                    required
                    // ref={sexeUpdate}
                    value={oneKaratekaSexe}
                    onChange={(e) => SetOneKaratekaSexe(e.target.value)}
                  >
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
                    // ref={ceintureUpdate}
                    value={oneKaratekaCeinture}
                    onChange={(e) => SetOneKaratekaCeinture(e.target.value)}
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

                <button className='btn btn-primary btnDirection mt-3'>
                  Valider
                </button>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={hideModalUpdate}
              className='btn btn-primary btnPerso'
            >
              Fermer
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default AddKarateka;
