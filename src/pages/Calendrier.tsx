// import './calendrier.css';
import React, { useContext, useEffect, useState } from 'react';
import 'react-day-picker/dist/style.css';
import { addDays, format, lightFormat } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import fr from 'date-fns/locale/fr';
import axios from 'axios';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import LogoMicka from '../images/logoMickRetouch.png';
import Modal from 'react-bootstrap/Modal';
import { MdOutlineSwipe } from 'react-icons/md';
// import required modules
import { Pagination, Navigation, EffectCards } from 'swiper';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ToastContext } from '../context/toast-context';
import { Popover } from 'react-bootstrap';
import { instanceAxios } from '../axios/instance-axios';

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
  note: string;
}

export interface User {
  id: string;
  email: string;
  member: boolean;
  role: Role;
}

export interface Role {
  id: string;
  label: string;
}

const Calendrier = () => {
  const today = new Date();
  const navigate = useNavigate();
  const isBigScreen = useMediaQuery({ query: '(min-width: 750.1px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 750px)' });
  const [allCours, SetAllCours] = useState<Cours[]>();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(today);
  const [coursAffiche, setCoursAffiche] = useState<Cours[] | undefined>([]);
  const [coursAfficheTop, setCoursAfficheTop] = useState<Cours[] | undefined>(
    []
  );

  // Lien avec le toast context
  const { onToastChange } = useContext(ToastContext);
  const { messageToast } = useContext(ToastContext);
  const { colorToast } = useContext(ToastContext);
  //

  /////////////////////////////////////////////// FIN USESTATE ///////////////////////////////////////////////

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
    instanceAxios
      .get<Cours[]>(`/cours/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        console.log('Get All Cours', response);
        SetAllCours(response.data);
      })
      .catch((error) => {
        console.log('Get All Cours Error', error);
        if (error.response.data.statusCode === 401) {
          navigate('/connect', { replace: true });
          onToastChange(true);
          messageToast('Session expirée. Veuillez vous reconnecter');
          colorToast('danger');
        }
      });
  }, []);
  //  }, [selectedDay]);
  // Fin requete get

  /////////////////////////////////////////////// AFFICHAGE JOURS SELECT ///////////////////////////////////////////////

  // const footer = selectedDay ? (
  //   <p>Vous avez choisi le {selectedDay.toLocaleDateString('fr')}.</p>
  // ) : (
  //   <p>Veuillez choisir un jour.</p>
  // );

  console.log('coursAffiche', coursAffiche);

  /////////////////////////////////////////////// AFFICHAGE DES 10 PROCHAINS COURS ///////////////////////////////////////////////

  let dateAjd = Date.now();
  // console.log(dateAjd);
  //1 jour = 86400000 millisecondes
  let dateAjdPlus1 = dateAjd + 86400000;
  // console.log(new Date(dateAjdPlus1));
  let dateAjdPlus2 = dateAjdPlus1 + 86400000;
  let dateAjdPlus3 = dateAjdPlus2 + 86400000;
  let dateAjdPlus4 = dateAjdPlus3 + 86400000;
  let dateAjdPlus5 = dateAjdPlus4 + 86400000;

  const tabDate = [
    new Date(dateAjd).toLocaleDateString('fr'),
    new Date(dateAjdPlus1).toLocaleDateString('fr'),
    new Date(dateAjdPlus2).toLocaleDateString('fr'),
    new Date(dateAjdPlus3).toLocaleDateString('fr'),
    new Date(dateAjdPlus4).toLocaleDateString('fr'),
    new Date(dateAjdPlus5).toLocaleDateString('fr'),
  ];

  console.log('coursAfficheTop', coursAfficheTop);

  // Affichage des cours proposer en fonction des jours
  useEffect(() => {
    if (allCours) {
      let eventsArrayTop: Cours[] = [];

      for (let pas = 0; pas < allCours.length; pas++) {
        let dateCoursFormater = new Date(allCours[pas].date).toLocaleDateString(
          'fr'
        );
        // console.log(dateCoursFormater, 'dateCoursFormater');

        // tabDate boucle for pour recuperer chaque element
        for (let i = 0; i < tabDate.length; i++) {
          if (dateCoursFormater === tabDate[i]) {
            eventsArrayTop.push(allCours[pas]);
          }
        }
      }
      // fin boucle FOR

      if (eventsArrayTop.length > 0) {
        setCoursAfficheTop(eventsArrayTop);
      } else {
        setCoursAfficheTop([]);
      }
    }
  }, [allCours]);
  /////////////////////////////////////////////// VERIFICATION TOKEN ///////////////////////////////////////////////

  /////////////////////////////////////////////// RETURN ///////////////////////////////////////////////
  return (
    <div style={{ minHeight: '100vh' }}>
      <h3
        style={{
          paddingLeft: '5%',
          paddingTop: '10px',
          paddingBottom: '10px',
        }}
      >
        Cours des 5 prochains jours :
      </h3>

      {/* ------------------ SWIPPER ORDI ------------------ */}

      {coursAfficheTop?.length !== 0 ? (
        isBigScreen && (
          <div
            style={{ paddingBottom: '30px', borderRadius: '0px 0px 10px 10px' }}
          >
            <Swiper
              slidesPerView={2}
              spaceBetween={0}
              slidesPerGroup={2}
              loop={true}
              loopFillGroupWithBlank={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className='mySwiper'
            >
              {/* MAP du tableau des prochains jours */}
              {/* <ul> */}
              {coursAfficheTop?.map((x, i) => (
                // <li key={`coursAfficheTop-${x.id}`}>
                <SwiperSlide key={`coursAfficheTop-${x.id}`}>
                  <div
                    className='card text-center'
                    style={{ marginBottom: '15px' }}
                  >
                    <div className='card-header'>
                      Cours de {x.type} | Sensei : {x.sensei}
                    </div>
                    <div className='card-body'>
                      {/* <p className='card-text'>{x.note}</p> */}
                      <NavLink to={x.id}>
                        <button
                          className='btn btn-primary btnDirection btn-sm'
                          value={x.id}
                        >
                          S'inscrire
                        </button>
                      </NavLink>
                    </div>
                    <div
                      className='card-footer'
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 'bolder',
                        color: 'black',
                      }}
                    >
                      {new Date(x.heureDebut).getHours()}h
                      {new Date(x.heureDebut)
                        .getMinutes()
                        .toString()
                        .padStart(2, '0')}{' '}
                      / {new Date(x.heureFin).getHours()}h
                      {new Date(x.heureFin)
                        .getMinutes()
                        .toString()
                        .padStart(2, '0')}{' '}
                      le {new Date(x.date).toLocaleDateString('fr')}
                    </div>
                  </div>
                </SwiperSlide>
                // </li>
              ))}
              {/* </ul> */}
            </Swiper>
          </div>
        )
      ) : (
        <div
          className='text-center p-3'
          style={{
            fontSize: '1.3rem',
            backgroundColor: '#212529',
            color: 'white',
          }}
        >
          Aucun cours n'est planifié pour le moment.
        </div>
      )}

      {/* ------------------ SWIPPER MOBILE ------------------ */}
      {coursAfficheTop?.length !== 0 ? (
        isTabletOrMobile && (
          <div
            style={{ paddingBottom: '30px', borderRadius: '0px 0px 10px 10px' }}
          >
            <p className='text-center'>
              <MdOutlineSwipe /> faites glisser les cours pour acceder aux
              prochains cours <MdOutlineSwipe />
            </p>
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards]}
              loop={true}
              className='mySwiper'
            >
              {/* MAP du tableau des prochains jours */}
              {/* <ul> */}
              {coursAfficheTop?.map((x, i) => (
                // <li key={`coursAfficheTop-${x.id}`}>
                <SwiperSlide key={`coursAfficheTop-${x.id}`}>
                  <div className='card text-center'>
                    <div className='card-header'>
                      Cours de {x.type} | Sensei : {x.sensei}
                    </div>
                    <div className='card-body'>
                      {/* <p className='card-text'>{x.note}</p> */}
                      <NavLink to={x.id}>
                        <button
                          className='btn btn-primary btnDirection btn-sm'
                          value={x.id}
                        >
                          S'inscrire
                        </button>
                      </NavLink>
                    </div>
                    <div
                      className='card-footer'
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 'bolder',
                        color: 'black',
                      }}
                    >
                      {new Date(x.heureDebut).getHours()}h
                      {new Date(x.heureDebut)
                        .getMinutes()
                        .toString()
                        .padStart(2, '0')}{' '}
                      / {new Date(x.heureFin).getHours()}h
                      {new Date(x.heureFin)
                        .getMinutes()
                        .toString()
                        .padStart(2, '0')}{' '}
                      le {new Date(x.date).toLocaleDateString('fr')}
                    </div>
                  </div>
                </SwiperSlide>
                // </li>
              ))}
              {/* </ul> */}
            </Swiper>
          </div>
        )
      ) : (
        <div></div>
      )}

      {/* ------------------ ORDI ------------------ */}
      {isBigScreen && (
        <>
          <h3
            style={{
              backgroundColor: 'rgba(88, 91, 94, 0.1)',
              marginBottom: '0',
              paddingLeft: '5%',
              paddingTop: '10px',
            }}
            className=''
          >
            Calendrier des cours :
          </h3>

          <div
            className='d-flex justify-content-around flex-wrap mb-0 pb-4'
            style={{
              backgroundColor: 'rgba(88, 91, 94, 0.1)',
            }}
          >
            {/* Affichage Calendrier */}

            <div className='align-self-start mt-5'>
              <DayPicker
                //configuration du calendrier en Francais
                locale={fr}
                mode='single'
                required
                selected={selectedDay}
                onSelect={setSelectedDay}
                // footer={footer}
              />
            </div>

            {/* Affichage cours ordi */}

            <div
              style={
                {
                  // height: '400px',
                  // width: '400px',
                }
              }
              className='overflow-auto mt-5 bg-white p-4 rounded'
            >
              {coursAffiche !== undefined && coursAffiche.length > 0 ? (
                coursAffiche?.map((x, i) => (
                  <div
                    key={`coursAffiche-${x.id}`}
                    className='card text-center mb-3'
                    style={{
                      width: '350px',
                    }}
                  >
                    <div
                      className='card-header'
                      // style={{ width: '300px' }}
                    >
                      Cours de {x.type} | Sensei : {x.sensei}
                    </div>
                    <div className='card-body'>
                      {/* <p className='card-text'>{x.note}</p> */}
                      <NavLink to={x.id}>
                        <button
                          className='btn btn-primary btnDirection btn-sm'
                          value={x.id}
                        >
                          S'inscrire
                        </button>
                      </NavLink>
                      {/* modal */}
                      {/* <div className='pt-2'> */}
                    </div>
                    <div
                      className='card-footer'
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 'bolder',
                        color: 'black',
                      }}
                    >
                      {new Date(x.heureDebut).getHours()}h
                      {new Date(x.heureDebut)
                        .getMinutes()
                        .toString()
                        .padStart(2, '0')}{' '}
                      / {new Date(x.heureFin).getHours()}h
                      {new Date(x.heureFin)
                        .getMinutes()
                        .toString()
                        .padStart(2, '0')}{' '}
                      le {new Date(x.date).toLocaleDateString('fr')}
                    </div>
                  </div>
                ))
              ) : (
                // Si pas de cours a afficher :

                <div className='card d-flex' style={{ width: '18rem' }}>
                  <img
                    src={LogoMicka}
                    className='card-img-top mx-auto d-block'
                    alt='karateka dessiné'
                    style={{
                      paddingTop: '20px',
                      width: '30%',
                      display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  />
                  <div className='card-body'>
                    <h5
                      className='card-title'
                      style={{
                        fontSize: '0.8rem',
                        textAlign: 'center',
                        fontWeight: 'bolder',
                      }}
                    >
                      Aucun cours pour le :{' '}
                      {selectedDay?.toLocaleDateString('fr')}
                    </h5>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* ------------------ MOBILE ------------------ */}
      {isTabletOrMobile && (
        <>
          <h3
            style={{
              backgroundColor: 'rgba(88, 91, 94, 0.1)',
              marginBottom: '0',
              paddingLeft: '5%',
              paddingTop: '10px',
            }}
            className=''
          >
            Calendrier des cours :
          </h3>

          <div
            className='d-flex justify-content-around flex-wrap mb-0 pb-4'
            style={{
              backgroundColor: 'rgba(88, 91, 94, 0.1)',
            }}
          >
            {/* Affichage Calendrier */}

            <div className='align-self-start mt-5'>
              <DayPicker
                //configuration du calendrier en Francais
                locale={fr}
                mode='single'
                required
                selected={selectedDay}
                onSelect={setSelectedDay}
                // footer={footer}
              />
            </div>

            {/* Affichage cours ordi */}

            <div
              style={{
                height: '400px',
              }}
              className='overflow-auto mt-5 bg-white p-4 rounded'
            >
              {coursAffiche !== undefined && coursAffiche.length > 0 ? (
                coursAffiche?.map((x, i) => (
                  <div
                    key={`coursAffiche-${x.id}`}
                    className='card text-center mb-3'
                  >
                    <div
                      className='card-header'
                      // style={{ width: '300px' }}
                    >
                      Cours de {x.type} | Sensei : {x.sensei}
                    </div>
                    <div className='card-body'>
                      {/* <p className='card-text'>{x.note}</p> */}
                      <NavLink to={x.id}>
                        <button
                          className='btn btn-primary btnDirection btn-sm'
                          value={x.id}
                        >
                          S'inscrire
                        </button>
                      </NavLink>
                      {/* modal */}
                      {/* <div className='pt-2'> */}
                    </div>
                    <div
                      className='card-footer'
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 'bolder',
                        color: 'black',
                      }}
                    >
                      {new Date(x.heureDebut).getHours()}h
                      {new Date(x.heureDebut)
                        .getMinutes()
                        .toString()
                        .padStart(2, '0')}{' '}
                      / {new Date(x.heureFin).getHours()}h
                      {new Date(x.heureFin)
                        .getMinutes()
                        .toString()
                        .padStart(2, '0')}{' '}
                      le {new Date(x.date).toLocaleDateString('fr')}
                    </div>
                  </div>
                ))
              ) : (
                // Si pas de cours a afficher :
                <div className='card d-flex' style={{ width: '18rem' }}>
                  <img
                    src={LogoMicka}
                    className='card-img-top mx-auto d-block'
                    alt='karateka dessiné'
                    style={{
                      paddingTop: '20px',
                      width: '30%',
                      display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  />
                  <div className='card-body'>
                    <h5
                      className='card-title'
                      style={{
                        fontSize: '0.8rem',
                        textAlign: 'center',
                        fontWeight: 'bolder',
                      }}
                    >
                      Aucun cours pour le :{' '}
                      {selectedDay?.toLocaleDateString('fr')}
                    </h5>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {/* modal */}
    </div>
  );
};

export default Calendrier;
