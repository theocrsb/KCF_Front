import React, { useState } from 'react';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import './calendrier.css';
//Import fullcalendar
import FullCalendar from '@fullcalendar/react';

const Calendrier = () => {
  const events = [
    {
      title: 'Cours de mathématiques',
      start: '2022-03-01T10:00:00',
      end: '2022-03-01T12:00:00',
    },
    {
      title: 'Cours de physique',
      start: '2022-03-15T14:00:00',
      end: '2022-03-15T16:00:00',
    },
  ];
  // const today = new Date();
  // const [selectedDay, setSelectedDay] = useState(today);

  // const footer = selectedDay ? (
  //   <p>Vous avez choisi le {format(selectedDay, 'dd/MM/yyyy')}.</p>
  // ) : (
  //   <p>Veuillez choisir un jour.</p>
  // );
  const handleEventClick = () => {
    console.log('coucou');
  };
  return (
    <div>
      <FullCalendar
      // id='your-custom-ID'
      // header={{
      //   left: 'prev,next today',
      //   center: 'title',
      //   right: 'month,agendaWeek,agendaDay',
      // }}
      // defaultDate={'2022-03-12'}
      // navLinks={true}
      // events={events}
      // eventClick={(event) => {
      //   // Function to handle event click
      //   handleEventClick(event);
      // }}
      />
    </div>
  );
};

export default Calendrier;
