import React from 'react';
import { useState } from 'react';
import Calendar from 'antd/es/calendar';
import frFR from 'antd/es/locale/fr_FR';
import ConfigProvider from 'antd/es/config-provider';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import locale from 'antd/locale/fr_FR';
import Badge, { BadgeProps } from 'antd/es/badge';

const Calendrier = () => {
  const [date, setDate] = useState(new Date());

  const myLocal = {
    ...frFR,
    dateFormat: 'DD/MM/YYYY',
  };
  //Trouver comment gerer le jour pour l'affichage
  const dateCellRender = () => {
    const valueCalendar = {
      date: '18-01-2023',
      type: 'warning',
      content: 'This is warning event.',
    };
    return (
      <Badge status={'success' as BadgeProps['status']} text={'cours kata'} />
    );
  };
  return (
    <div
      className='d-flex justify-content-center '
      // style={{ backgroundColor: 'grey' }}
    >
      <div className='d-flex justify-content-center w-75'>
        <ConfigProvider locale={locale}>
          {/* dateCellRender : Remplis une valeurs dans le jours */}
          <Calendar
            style={{ padding: '7.5%', borderRadius: '15px' }}
            dateCellRender={dateCellRender}
            defaultValue={dayjs('17-01-2023', 'DD-MM-YYYY')}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Calendrier;
