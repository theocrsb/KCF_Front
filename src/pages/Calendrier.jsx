import React, { useState } from 'react';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import './calendrier.css';

const Calendrier = () => {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today);

  const footer = selectedDay ? (
    <p>Vous avez choisi le {format(selectedDay, 'dd/MM/yyyy')}.</p>
  ) : (
    <p>Veuillez choisir un jour.</p>
  );
  return (
    <div className='d-flex justify-content-center'>
      <div className='d-flex justify-content-center'>
        <DayPicker
          mode='single'
          required
          selected={selectedDay}
          onSelect={setSelectedDay}
          footer={footer}
        />
      </div>
    </div>
  );
};

export default Calendrier;
