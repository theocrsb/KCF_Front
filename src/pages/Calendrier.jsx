import React, { useState } from 'react';
import 'react-day-picker/dist/style.css';
import { addDays, format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import './calendrier.css';
import fr from 'date-fns/locale/fr';

const Calendrier = () => {
  const today = new Date();
  const todayJour = today.getDay();
  const todayMois = today.getMonth();
  const todayAnnee = today.getFullYear();
  const pastMonth = new Date(todayAnnee, todayMois, todayJour);

  const defaultSelected = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  };
  const [range, setRange] = useState(defaultSelected);

  let footer = <p>Veuillez choisir au moins un jour.</p>;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, 'PPP')}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, 'PPP')}–{format(range.to, 'PPP')}
        </p>
      );
    }
  }

  return (
    <DayPicker
      //configuration du calendrier en Francais
      locale={fr}
      mode='range'
      max={7}
      defaultMonth={todayMois}
      selected={range}
      footer={footer}
      onSelect={setRange}
    />
  );
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
};

export default Calendrier;
