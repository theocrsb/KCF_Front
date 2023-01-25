import { DeleteOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Cours, Karateka } from './Calendrier';
const CoursSelect = () => {
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
    axios
      .get(`http://localhost:8080/api/cours/${coursId.id}`, {
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
    axios
      .patch(
        `http://localhost:8080/api/cours/${coursId.id}/add`,
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
        // console.log('response', response);
        setCount(count + 1);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  // Retrait d'une personne inscrite si ils nous appartient
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(e.currentTarget.value);

    axios
      .patch(
        `http://localhost:8080/api/cours/${coursId.id}/delete`,
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
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  console.log(oneCours, 'oneCours');
  console.log(allKarateka, 'mes karateka');
  return (
    <div style={{ minHeight: '700px' }}>
      <div className='card text-center mt-3'>
        <div
          className='card-header'
          style={{ fontWeight: 'bold', fontSize: '1.4rem' }}
        >
          {oneCours?.sensei} : {oneCours?.type}
        </div>
        <div className='card-body'>
          {/* <h5 className='card-title'>Selection du karateka</h5> */}
          <p className='card-text'>{oneCours?.note}</p>
          {/* Ajout des karateka */}
          <div
            className='card-body'
            style={{ backgroundColor: '#e2e2e2', borderRadius: '10px' }}
          >
            <p className='card-text'>
              Selectionne chaque personnes que tu souhaites ajouter au cours :
            </p>
          </div>
          {/* debut form */}
          <div className='form-check mt-3'>
            <form onSubmit={handleSubmit}>
              {allKarateka?.map((x, i) => (
                <div key={i}>
                  <label className='form-check-label' htmlFor={x.id}>
                    {x.prenom} {x.nom} {x.id}
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

              {/* fin des karatekas */}
              <button
                className='btn btn-primary btnDirection mt-3'
                // value={oneCours?.id}
              >
                Valider les karatekas pour ce cours
              </button>
            </form>
          </div>
          {/* fin form */}
        </div>
        <div className='card-footer text-muted'>
          {oneCours && new Date(oneCours.heureDebut).getHours()}H
          {oneCours && new Date(oneCours.heureDebut).getMinutes()} /{' '}
          {oneCours && new Date(oneCours?.heureFin).getHours()}H
          {oneCours && new Date(oneCours?.heureFin).getMinutes()}
        </div>
      </div>
      {/* personnes inscrites au cours */}
      <div>
        <h4>Listes des personnes inscrites au cours :</h4>
        <ul>
          {oneCours?.karateka.map((x, i) => (
            <li key={i} style={{ listStyleType: 'none' }}>
              {x.prenom} {x.nom}{' '}
              <button
                onClick={handleDelete}
                value={x.id}
                style={{ backgroundColor: 'transparent', border: 'none' }}
              >
                {karatekaId?.includes(x.id) ? (
                  <DeleteOutlined />
                ) : (
                  <LockOutlined />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoursSelect;
