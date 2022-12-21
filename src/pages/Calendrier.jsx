import React, { useState } from 'react';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';

const Calendrier = () => {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today);

  const footer = selectedDay ? (
    <p>You selected {format(selectedDay, 'PPP')}.</p>
  ) : (
    <p>Please pick a day.</p>
  );
  return (
    <div>
      <h1> Calendrier</h1>
      <div>
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
