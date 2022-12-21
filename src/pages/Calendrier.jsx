import React, { useState } from 'react';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import './Calendrier.css';

const Calendrier = () => {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today);

  const footer = selectedDay ? (
    <p>You selected {format(selectedDay, 'PPP')}.</p>
  ) : (
    <p>Please pick a day.</p>
  );
  return (
    <div className='d-flex justify-content-center'>
      <div className='card w-75 mt-4 calendar shadow-lg p-3 mb-5 rounded'>
        <div className='cardbody'>
          <h5 className='card-title text-center m-4'>
            Cliquez sur le jour que vous souhaitez pour afficher les cours.
          </h5>
          <div className='d-flex justify-content-center'>
            <DayPicker
              mode='single'
              required
              selected={selectedDay}
              onSelect={setSelectedDay}
              footer={footer}
            />
          </div>
          <p className='card-text text-center mb-2'>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Calendrier;
