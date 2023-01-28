import React, { useEffect, useState } from 'react';
import 'react-day-picker/dist/style.css';
import { addDays, format, lightFormat } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import './calendrier.css';
import fr from 'date-fns/locale/fr';
import axios from 'axios';
import { paste } from '@testing-library/user-event/dist/paste';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import LogoMicka from '../images/logoMickRetouch.png';
import Modal from 'react-bootstrap/Modal';
import { MdOutlineSwipe } from 'react-icons/md';
// import required modules
import {
  Pagination,
  Navigation,
  Mousewheel,
  EffectCards,
  EffectCube,
} from 'swiper';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {
  LeftSquareOutlined,
  RightSquareOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
} from '@ant-design/icons';

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

  const isBigScreen = useMediaQuery({ query: '(min-width: 700.1px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 700px)' });
  const [allCours, SetAllCours] = useState<Cours[]>();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(today);
  const [coursAffiche, setCoursAffiche] = useState<Cours[] | undefined>([]);
  const [coursAfficheTop, setCoursAfficheTop] = useState<Cours[] | undefined>(
    []
  );
  const [oneCours, SetOneCOurs] = useState<Cours>();

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
    axios
      .get(`http://localhost:8080/api/cours/`, {
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

  /////////////////////////////////////////////// AFFICHAGE JOURS SELECT ///////////////////////////////////////////////

  const footer = selectedDay ? (
    <p>Vous avez choisi le {selectedDay.toLocaleDateString('fr')}.</p>
  ) : (
    <p>Veuillez choisir un jour.</p>
  );

  console.log('coursAffiche', coursAffiche);

  /////////////////////////////////////////////// MODAL ///////////////////////////////////////////////

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const showModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    setIsOpen(true);
    console.log('get les karataka du cours');
    axios
      .get(`http://localhost:8080/api/cours/${e.currentTarget.value}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        SetOneCOurs(response.data);
      })
      .catch((error) => {
        // console.log('Get All Cours Error', error);
      });
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  // console.log(oneCours, 'karateka avant map');

  /////////////////////////////////////////////// AFFICHAGE DES 10 PROCHAINS COURS ///////////////////////////////////////////////

  let dateAjd = Date.now();
  // console.log(dateAjd);
  //1 jour = 86400000 millisecondes
  let dateAjdPlus1 = dateAjd + 86400000;
  console.log(new Date(dateAjdPlus1));
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
        console.log(dateCoursFormater, 'dateCoursFormater');

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
  /////////////////////////////////////////////// RETURN ///////////////////////////////////////////////
  return (
    <div style={{ minHeight: '600px' }}>
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
      {isBigScreen && (
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
            {coursAfficheTop?.map((x, i) => (
              <SwiperSlide key={x.id}>
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
                    {/* modal */}
                    {/* <div className='pt-2'> */}
                    <button
                      onClick={showModal}
                      className='btn btn-primary btnPerso btn-sm'
                      value={x.id}
                    >
                      Participants
                    </button>

                    <Modal show={isOpen} onHide={hideModal}>
                      <Modal.Header>
                        <Modal.Title>
                          Liste des personnes inscrites au cours :
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <ul>
                          {oneCours?.karateka.map((x, i) => (
                            <li
                              key={'swipper ordi karateka' + i}
                              style={{ listStyleType: 'none' }}
                            >
                              {x.prenom} {x.nom}
                            </li>
                          ))}
                        </ul>
                      </Modal.Body>
                      <Modal.Footer>
                        <button
                          onClick={hideModal}
                          className='btn btn-primary btnPerso'
                        >
                          Fermer
                        </button>
                      </Modal.Footer>
                    </Modal>
                    {/* </div> */}
                    {/* fin modal */}
                  </div>
                  <div
                    className='card-footer text-muted'
                    style={{ fontSize: '0.7rem' }}
                  >
                    {new Date(x.heureDebut).getHours()}H
                    {new Date(x.heureDebut).getMinutes()} /{' '}
                    {new Date(x.heureFin).getHours()}H
                    {new Date(x.heureFin).getMinutes()} le{' '}
                    {new Date(x.date).toLocaleDateString('fr')}
                  </div>
                </div>
              </SwiperSlide>
            ))}{' '}
          </Swiper>
        </div>
      )}

      {/* ------------------ SWIPPER MOBILE ------------------ */}
      {isTabletOrMobile && (
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
            className='mySwiper'
          >
            {/* MAP du tableau des prochains jours */}
            {coursAfficheTop?.map((x, i) => (
              <SwiperSlide key={x.id}>
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
                    {/* modal */}
                    {/* <div className='pt-2'> */}
                    <button
                      onClick={showModal}
                      className='btn btn-primary btnPerso btn-sm'
                      value={x.id}
                    >
                      Participants
                    </button>

                    <Modal show={isOpen} onHide={hideModal}>
                      <Modal.Header>
                        <Modal.Title>
                          Liste des personnes inscrites au cours :
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <ul>
                          {oneCours?.karateka.map((x, i) => (
                            <li
                              key={'swipper mobile karateka' + i}
                              style={{ listStyleType: 'none' }}
                            >
                              {x.prenom} {x.nom}
                            </li>
                          ))}
                        </ul>
                      </Modal.Body>
                      <Modal.Footer>
                        <button
                          onClick={hideModal}
                          className='btn btn-primary btnPerso'
                        >
                          Fermer
                        </button>
                      </Modal.Footer>
                    </Modal>
                    {/* </div> */}
                    {/* fin modal */}
                  </div>
                  <div
                    className='card-footer text-muted'
                    style={{ fontSize: '0.7rem' }}
                  >
                    {new Date(x.heureDebut).getHours()}H
                    {new Date(x.heureDebut).getMinutes()} /{' '}
                    {new Date(x.heureFin).getHours()}H
                    {new Date(x.heureFin).getMinutes()} le{' '}
                    {new Date(x.date).toLocaleDateString('fr')}
                  </div>
                </div>
              </SwiperSlide>
            ))}{' '}
          </Swiper>
        </div>
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
                footer={footer}
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
                    key={'calendrier ordi' + i}
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
                      <button
                        onClick={showModal}
                        className='btn btn-primary btnPerso btn-sm'
                        value={x.id}
                      >
                        Participants
                      </button>

                      <Modal show={isOpen} onHide={hideModal}>
                        <Modal.Header>
                          <Modal.Title>
                            Liste des personnes inscrites au cours :
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <ul>
                            {oneCours?.karateka.map((x, i) => (
                              <li
                                key={'calendrier ordi karateka' + i}
                                style={{ listStyleType: 'none' }}
                              >
                                {x.prenom} {x.nom}
                              </li>
                            ))}
                          </ul>
                        </Modal.Body>
                        <Modal.Footer>
                          <button
                            onClick={hideModal}
                            className='btn btn-primary btnPerso'
                          >
                            Fermer
                          </button>
                        </Modal.Footer>
                      </Modal>
                      {/* </div> */}
                      {/* fin modal */}
                    </div>
                    <div
                      className='card-footer text-muted'
                      style={{ fontSize: '0.7rem' }}
                    >
                      {new Date(x.heureDebut).getHours()}H
                      {new Date(x.heureDebut).getMinutes()} /{' '}
                      {new Date(x.heureFin).getHours()}H
                      {new Date(x.heureFin).getMinutes()} le{' '}
                      {new Date(x.date).toLocaleDateString('fr')}
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
                footer={footer}
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
                    key={'calendrier mobile' + i}
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
                      <button
                        onClick={showModal}
                        className='btn btn-primary btnPerso btn-sm'
                        value={x.id}
                      >
                        Participants
                      </button>

                      <Modal show={isOpen} onHide={hideModal}>
                        <Modal.Header>
                          <Modal.Title>
                            Liste des personnes inscrites au cours :
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <ul>
                            {oneCours?.karateka.map((x, i) => (
                              <li
                                key={'calendrier mobile karateka' + i}
                                style={{ listStyleType: 'none' }}
                              >
                                {x.prenom} {x.nom}
                              </li>
                            ))}
                          </ul>
                        </Modal.Body>
                        <Modal.Footer>
                          <button
                            onClick={hideModal}
                            className='btn btn-primary btnPerso'
                          >
                            Fermer
                          </button>
                        </Modal.Footer>
                      </Modal>
                      {/* </div> */}
                      {/* fin modal */}
                    </div>
                    <div
                      className='card-footer text-muted'
                      style={{ fontSize: '0.7rem' }}
                    >
                      {new Date(x.heureDebut).getHours()}H
                      {new Date(x.heureDebut).getMinutes()} /{' '}
                      {new Date(x.heureFin).getHours()}H
                      {new Date(x.heureFin).getMinutes()} le{' '}
                      {new Date(x.date).toLocaleDateString('fr')}
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
        </>
      )}
      {/* modal */}
    </div>
  );
};

export default Calendrier;
