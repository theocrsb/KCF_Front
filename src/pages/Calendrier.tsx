import React from 'react';
import { useState } from 'react';
import Calendar from 'antd/es/calendar';
import frFR from 'antd/es/locale/fr_FR';
import ConfigProvider from 'antd/es/config-provider';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import locale from 'antd/locale/fr_FR';
import Badge, { BadgeProps } from 'antd/es/badge';
import { Dayjs } from 'dayjs';

export interface Cours {
  id: string;
  sensei: string;
  date: string;
  heureDebut: string;
  heureFin: string;
  note: string;
  // user: User
}

const Calendrier = () => {
  const [dateSelect, setDateSelect] = useState<string>('');

  //Lors d'un click sur une date du Calendar
  const handleSelect = (select: Dayjs) => {
    console.log(select.format('DD-MM-YYYY'));
    setDateSelect(select.format('DD-MM-YYYY'));
  };

  // affichage ou nom d'un event selon la date
  // const getListData = (value: Dayjs) => {
  //   //ajout date en brut (futur bdd)
  //   const dateBdd = new Date('2023-01-21');

  //   let listData;
  //   switch (value.daysInMonth()) {
  //     case 2023 - 0 - 21:
  //       listData = [
  //         { type: 'warning', content: 'This is warning event.' },
  //         { type: 'success', content: 'This is usual event.' },
  //       ];
  //       break;
  //     // case 10:
  //     //   listData = [
  //     //     { type: 'warning', content: 'This is warning event.' },
  //     //     { type: 'success', content: 'This is usual event.' },
  //     //     { type: 'error', content: 'This is error event.' },
  //     //   ];
  //     //   break;
  //     // case 15:
  //     //   listData = [
  //     //     { type: 'warning', content: 'This is warning event' },
  //     //     { type: 'success', content: 'This is very long usual event。。....' },
  //     //     { type: 'error', content: 'This is error event 1.' },
  //     //     { type: 'error', content: 'This is error event 2.' },
  //     //     { type: 'error', content: 'This is error event 3.' },
  //     //     { type: 'error', content: 'This is error event 4.' },
  //     //   ];
  //     //   break;
  //     // default:
  //   }
  //   return listData || [];
  // };
  // //

  // //Affichage des cours dans le Calendar
  // const dateCellRender = (value: Dayjs) => {
  //   //Exemple lors d'un get d'un cours
  //   // const valueCalendar: Cours[] = [
  //   //   {
  //   //     id: '01234',
  //   //     date: '19-01-2023',
  //   //     sensei: 'string',
  //   //     heureDebut: 'string',
  //   //     heureFin: 'string',
  //   //     note: 'string',
  //   //     // type: 'warning',
  //   //     // content: 'BABY KARATE',
  //   //   },
  //   // ];

  //   const listData = getListData(value);

  // return (
  //   <ul className='events'>
  //     {listData.map((item) => (
  //       <li key={item.content}>
  //         <Badge
  //           status={item.type as BadgeProps['status']}
  //           text={item.content}
  //         />
  //       </li>
  //     ))}
  //   </ul>
  // );

  const events = [
    { date: '2023-01-01', name: 'Karaté kata' },
    { date: '2023-01-03', name: 'Karaté combat' },
    { date: '2023-01-05', name: 'Karaté BABY' },
  ];

  const dateFullCellRender = (value: Dayjs) => {
    const date = value.format('YYYY-MM-DD');
    const event = events.find((e) => e.date === date);
    if (event) {
      return (
        <div>
          {value.date()}
          <div>{event.name}</div>
        </div>
      );
    } else {
      return <div>{value.date()}</div>;
    }
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
            dateFullCellRender={dateFullCellRender}
            onSelect={handleSelect}
            defaultValue={dayjs('17-01-2023', 'DD-MM-YYYY')}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Calendrier;
