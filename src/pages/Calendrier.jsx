import React, { useEffect, useState } from 'react';
import 'react-day-picker/dist/style.css';
import { addDays, format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import './calendrier.css';
import fr from 'date-fns/locale/fr';
import axios from 'axios';

const Calendrier = () => {
  const today = new Date();
  const todayJour = today.getDay();
  const todayMois = today.getMonth();
  const todayAnnee = today.getFullYear();
  const pastMonth = new Date(todayAnnee, todayMois, todayJour);
  const [allCours, SetAllCours] = useState();
  const [selectedDay, setSelectedDay] = useState(today);
  console.log('allCours', allCours);

  // Requete pour afficher les cours select
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/cours/', {
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
      });
  }, []);
  // Fin requete get

  const footer = selectedDay ? (
    <p>Vous avez choisi le {format(selectedDay, 'dd/MM/yyyy')}.</p>
  ) : (
    <p>Veuillez choisir un jour.</p>
  );

  return (
    <div className='d-flex justify-content-around p-3'>
      <div className='align-self-center'>
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
      <div>les cartes</div>
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
