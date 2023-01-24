import React, { useEffect, useState } from 'react';
import 'react-day-picker/dist/style.css';
import { addDays, format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import './calendrier.css';
import fr from 'date-fns/locale/fr';
import axios from 'axios';
import { paste } from '@testing-library/user-event/dist/paste';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import LogoMicka from '../images/logoMickRetouch.png';

export interface Cours {
  id: string;
  sensei: string;
  date: string;
  heureDebut: string;
  heureFin: string;
  type: string;
  note: string;
  karateka: Karateka[];
}

export interface Karateka {
  id: string;
  nom: string;
  prenom: string;
  age: number;
  sexe: string;
  ceinture: string;
  membre: boolean;
}

const Calendrier = () => {
  const today = new Date();

  const isBigScreen = useMediaQuery({ query: '(min-width: 700px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 700px)' });
  // const navigate = useNavigate();
  // const todayJour = today.getDay();
  // const todayMois = today.getMonth();
  // const todayAnnee = today.getFullYear();

  const [allCours, SetAllCours] = useState<Cours[]>();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(today);
  // console.log('allCours', allCours);
  const [coursAffiche, setCoursAffiche] = useState<Cours[] | undefined>([]);

  // Ajouter un tableau des cours en fonction du jours select
  useEffect(() => {
    if (allCours) {
      let eventsArray = [];
      for (let pas = 0; pas < allCours.length; pas++) {
        let dateCoursFormater = new Date(allCours[pas].date).toLocaleDateString(
          'fr'
        );
        if (dateCoursFormater === selectedDay?.toLocaleDateString('fr')) {
          eventsArray.push(allCours[pas]);
        }
      }
      if (eventsArray.length > 0) {
        setCoursAffiche(eventsArray);
      } else {
        setCoursAffiche([]);
      }
    }
  }, [selectedDay, allCours]);

  // Requete pour afficher les cours select
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/cours/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        // console.log('Get All Cours', response);
        SetAllCours(response.data);
      })
      .catch((error) => {
        // console.log('Get All Cours Error', error);
      });
  }, [selectedDay]);
  // Fin requete get

  const footer = selectedDay ? (
    <p>Vous avez choisi le {selectedDay.toLocaleDateString('fr')}.</p>
  ) : (
    <p>Veuillez choisir un jour.</p>
  );

  console.log('coursAffiche', coursAffiche);
  return (
    <div style={{ minHeight: '700px' }}>
      {isBigScreen && (
        <div className='d-flex justify-content-around p-3 flex-wrap mt-5 mb-0'>
          {/* Affichage Calendrier */}

          <div className='align-self-start mt-5'>
            <DayPicker
              //configuration du calendrier en Francais
              locale={fr}
              mode='single'
              required
              selected={selectedDay}
              onSelect={setSelectedDay}
              footer={footer}
            />
          </div>

          {/* Affichage cours ordi */}

          <div style={{ height: '400px' }} className='overflow-auto mt-5'>
            {coursAffiche !== undefined && coursAffiche.length > 0 ? (
              coursAffiche?.map((x, i) => (
                <div key={i} className='card text-center mb-3'>
                  <div className='card-header' style={{ width: '300px' }}>
                    {x.type} : {x.sensei}
                  </div>
                  <div className='card-body'>
                    <p className='card-text'>{x.note}</p>
                    <NavLink to={x.id}>
                      <button
                        className='btn btn-primary btnDirection'
                        value={x.id}
                      >
                        S'inscrire au cours
                      </button>
                    </NavLink>
                    {/* modal */}
                    {/* <div>
                      <div className='modal' tabIndex={-1} role='dialog'>
                        <div className='modal-dialog' role='document'>
                          <div className='modal-content'>
                            <div className='modal-header'>
                              <h5 className='modal-title'>Modal title</h5>
                              <button
                                type='button'
                                className='close'
                                data-dismiss='modal'
                                aria-label='Close'
                              >
                                <span aria-hidden='true'>&times;</span>
                              </button>
                            </div>
                            <div className='modal-body'>
                              <p>Modal body text goes here.</p>
                            </div>
                            <div className='modal-footer'>
                              <button
                                type='button'
                                className='btn btn-secondary'
                                data-dismiss='modal'
                              >
                                Close
                              </button>
                              <button type='button' className='btn btn-primary'>
                                Save changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    {/* fin modal */}
                  </div>
                  <div className='card-footer text-muted'>
                    {new Date(x.heureDebut).getHours()}H
                    {new Date(x.heureDebut).getMinutes()} /{' '}
                    {new Date(x.heureFin).getHours()}H
                    {new Date(x.heureFin).getMinutes()}
                  </div>
                </div>
              ))
            ) : (
              // Si pas de cours a afficher :
              <div
                className='card text-center'
                style={{ width: '300px', marginTop: '10%' }}
              >
                <div className='card-header'></div>
                <div className='card-body'>
                  <p
                    style={{
                      backgroundColor: 'rgba(226, 226, 226, 0.75)',
                      width: '150px',
                      marginLeft: '50%',
                      transform: 'translate(-50%,50%)',
                      marginBottom: '20px',
                      textAlign: 'center',
                      borderRadius: '10px',
                      border: '2px solid black',
                    }}
                    className='card-title'
                  >
                    Aucun cours !{' '}
                  </p>
                  <img src={LogoMicka} alt='karateka dessiné' width='80px' />
                  <p className='card-text'>
                    pour le : {selectedDay?.toLocaleDateString('fr')}
                  </p>
                </div>
                <div className='card-footer text-muted'></div>
              </div>
            )}
          </div>
        </div>
      )}
      {isTabletOrMobile && (
        <div className='d-flex justify-content-around p-3 flex-wrap'>
          {/* Affichage Calendrier */}

          <div className='align-self-start mt-5'>
            <DayPicker
              //configuration du calendrier en Francais
              locale={fr}
              mode='single'
              required
              selected={selectedDay}
              onSelect={setSelectedDay}
              footer={footer}
            />
          </div>

          {/* Affichage cours ordi */}

          <div style={{ height: '400px' }} className='overflow-auto mt-5 mb-4'>
            {coursAffiche !== undefined && coursAffiche.length > 0 ? (
              coursAffiche?.map((x, i) => (
                <div key={i} className='card text-center mb-3'>
                  <div className='card-header' style={{ width: '300px' }}>
                    {x.type} : {x.sensei}
                  </div>
                  <div className='card-body'>
                    <p className='card-text'>{x.note}</p>
                    <NavLink to={x.id}>
                      <button
                        className='btn btn-primary btnDirection'
                        value={x.id}
                      >
                        S'inscrire au cours
                      </button>
                    </NavLink>
                  </div>
                  <div className='card-footer text-muted'>
                    {new Date(x.heureDebut).getHours()}H
                    {new Date(x.heureDebut).getMinutes()} /{' '}
                    {new Date(x.heureFin).getHours()}H
                    {new Date(x.heureFin).getMinutes()}
                  </div>
                </div>
              ))
            ) : (
              // Si pas de cours a afficher :
              <div
                className='card text-center'
                style={{ width: '300px', marginTop: '10%' }}
              >
                <div className='card-header'></div>
                <div className='card-body'>
                  <p
                    style={{
                      backgroundColor: 'rgba(226, 226, 226, 0.75)',
                      width: '150px',
                      marginLeft: '50%',
                      transform: 'translate(-50%,50%)',
                      marginBottom: '20px',
                      textAlign: 'center',
                      borderRadius: '10px',
                      border: '2px solid black',
                    }}
                    className='card-title'
                  >
                    Aucun cours !{' '}
                  </p>
                  <img src={LogoMicka} alt='karateka dessiné' width='80px' />
                  <p className='card-text'>
                    pour le : {selectedDay?.toLocaleDateString('fr')}
                  </p>
                </div>
                <div className='card-footer text-muted'></div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* modal */}
    </div>
  );
};

export default Calendrier;

// Sans la selection multiple

// const [selectedDay, setSelectedDay] = useState(today);
// console.log(format(selectedDay, 'yyyy-MM-dd'));
// const footer = selectedDay ? (
//   <p>Vous avez choisi le {format(selectedDay, 'dd/MM/yyyy')}.</p>
// ) : (
//   <p>Veuillez choisir un jour.</p>
// );
// return (
//   <div className='d-flex justify-content-center'>
//     <div className='d-flex justify-content-center w-100'>
//       <DayPicker
//         //configuration du calendrier en Francais
//         locale={fr}
//         // selection 1j ou pls
//         // mode='single'
//         mode='multtiple'
//         required
//         selected={selectedDay}
//         onSelect={setSelectedDay}
//         footer={footer}
//       />
//     </div>
//   </div>
// );
