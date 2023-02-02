import { DeleteOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { instanceAxios } from '../axios/instance-axios';
import { ToastContext } from '../context/toast-context';
import { Cours, Karateka } from './Calendrier';
const CoursSelect = () => {
  // Lien avec le toast context
  const { onToastChange } = useContext(ToastContext);
  const { messageToast } = useContext(ToastContext);
  const { colorToast } = useContext(ToastContext);
  //
  let coursId = useParams();
  //   console.log(coursId.id);
  const [oneCours, SetOneCours] = useState<Cours>();
  const [allKarateka, SetAllKarateka] = useState<Karateka[]>();
  const [checkCategories, setCheckCategories] = useState<string>('');
  const [count, setCount] = useState<number>(0);

  const karatekaId = allKarateka?.map((x) => x.id);
  console.log(karatekaId, 'id des karateka');
  // Requete pour afficher les cours select
  useEffect(() => {
    // get le cours par l'id
    instanceAxios
      .get<Cours>(`/cours/${coursId.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        // console.log('Get All Cours', response);
        SetOneCours(response.data);
      })
      .catch((error) => {
        // console.log('Get All Cours Error', error);
      });

    //get les karateka du user
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
  }, [coursId.id, count]);
  // Fin requete get
  //   console.log(oneCours);
  //   console.log('allKarateka', allKarateka);

  // Fonction
  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    setCheckCategories(e.currentTarget.value);
  }

  //   fonction submit inscritption cours
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('id du karateka select', checkCategories);

    //Requete ajout karateka a un cours
    instanceAxios
      .patch(
        `/cours/${coursId.id}/add`,
        {
          karateka: [{ id: checkCategories }],
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
        messageToast('Karatéka ajouté avec succès');
        colorToast('success');
        if (
          response.data ===
          'Ce karatéka est déjà inscrit dans le cours selectionné'
        ) {
          onToastChange(true);
          messageToast(
            'Ce karatéka est déjà inscrit dans le cours selectionné'
          );
          colorToast('success');
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  // Retrait d'une personne inscrite si ils nous appartient
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(e.currentTarget.value);

    instanceAxios
      .patch(
        `/cours/${coursId.id}/delete`,
        {
          karateka: [{ id: e.currentTarget.value }],
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
        messageToast('Karatéka retiré avec succès');
        colorToast('success');
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  console.log(oneCours, 'oneCours');
  console.log(allKarateka, 'mes karateka');
  return (
    <div style={{ minHeight: '100vh' }}>
      <div className='card text-center mt-3'>
        <div>
          <div
            className='card-header'
            style={{ fontWeight: 'bold', fontSize: '1.4rem' }}
          >
            Professeur : {oneCours?.sensei} | Type de cours : {oneCours?.type}
          </div>
          <div className='card-body'>
            {/* <h5 className='card-title'>Selection du karateka</h5> */}
            <p className='card-text'>Note : {oneCours?.note}</p>
            {/* Ajout des karateka */}
            <div
              className='card-body'
              style={{ backgroundColor: '#e2e2e2', borderRadius: '10px' }}
            >
              {/* si il y a un karateka sur le compte : */}
              {allKarateka && allKarateka.length > 0 ? (
                <>
                  <p className='card-text'>
                    Selectionner la personne à inscrire :
                  </p>
                  <div className='form-check mt-3'>
                    <form onSubmit={handleSubmit}>
                      {allKarateka?.map((x, i) => (
                        <div key={i + x.id}>
                          <label className='form-check-label' htmlFor={x.id}>
                            {x.prenom} {x.nom}
                            <input
                              name='RadioButton'
                              type='radio'
                              className='form-check-input'
                              id={x.id}
                              value={x.id}
                              onChange={handleCheck}
                            />
                          </label>
                        </div>
                      ))}

                      <button
                        className='btn btn-primary btnDirection mt-3'
                        // value={oneCours?.id}
                      >
                        Valider l'inscription
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div>
                  <p className='card-text'>
                    Vous n'avez aucune personne à ajouter au cours
                  </p>
                  <NavLink to='/profil/add/karateka' className='nav-link'>
                    <button className='btn btn-primary btnDirection mt-3'>
                      Ajouter un karateka à mon compte
                    </button>
                  </NavLink>
                </div>
              )}
              {/*  fin select */}

              <NavLink to='/calendrier' replace={true} className='nav-link'>
                <button
                  className='btn btn-primary btnPerso mt-3'
                  // value={oneCours?.id}
                >
                  Retour
                </button>
              </NavLink>
            </div>
            {/* fin form */}
          </div>
          <div
            className='card-footer'
            style={{
              fontSize: '0.9rem',
              fontWeight: 'bolder',
              color: 'black',
            }}
          >
            {oneCours && new Date(oneCours.heureDebut).getHours()}h
            {oneCours && new Date(oneCours.heureDebut).getMinutes()} /{' '}
            {oneCours && new Date(oneCours?.heureFin).getHours()}h
            {oneCours && new Date(oneCours?.heureFin).getMinutes()} le{' '}
            {oneCours && new Date(oneCours?.date).toLocaleDateString('fr')}
          </div>
        </div>
      </div>
      {/* personnes inscrites au cours */}
      <div
        className='card'
        style={{ width: '18rem', margin: '0 auto', marginTop: '10px' }}
      >
        <div className='card-header'>Liste inscrits : </div>
        <ul className='list-group list-group-flush'>
          {oneCours?.karateka.map((x, i) => (
            <li
              key={x.id}
              style={{ listStyleType: 'none' }}
              className='list-group-item'
            >
              {x.prenom} {x.nom}{' '}
              <button
                onClick={handleDelete}
                value={x.id}
                style={{ backgroundColor: 'transparent', border: 'none' }}
              >
                {karatekaId?.includes(x.id) ? (
                  <DeleteOutlined />
                ) : (
                  // <LockOutlined />
                  <div></div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* fin liste */}
      {/* <div className='pt-3 pb-5'>
        <h4 className='px-2'>Listes inscrits :</h4>
        <ul className='list-group list-group-flush'>
          {oneCours?.karateka.map((x, i) => (
            <li
              key={x.id}
              style={{ listStyleType: 'none' }}
              className='list-group-item'
            >
              {x.prenom} {x.nom}{' '}
              <button
                onClick={handleDelete}
                value={x.id}
                style={{ backgroundColor: 'transparent', border: 'none' }}
              >
                {karatekaId?.includes(x.id) ? (
                  <DeleteOutlined />
                ) : (
                  // <LockOutlined />
                  <div></div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default CoursSelect;
