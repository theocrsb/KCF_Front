// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Navigation, Pagination } from 'swiper';
// import { SwiperSlide } from 'swiper/react';
// import { instanceAxios } from '../axios/instance-axios';
// import { Karateka } from './Calendrier';

// const CoursByKarateka = () => {
//   const paramsId = useParams();
//   console.log(paramsId, 'paramsID');
//   const [oneKarateka, setOneKarateka] = useState<Karateka>();

//   useEffect(() => {
//     instanceAxios
//       .get<Karateka>(`/karatekas/${paramsId.id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//         },
//       })
//       .then((response) => {
//         console.log(response, 'response');
//         setOneKarateka(response.data);
//       })
//       .catch((error) => {
//         console.log('error', error);
//       });
//   }, [paramsId]);

//   return (
//     // <div style={{ paddingBottom: '30px', borderRadius: '0px 0px 10px 10px' }}>
//     //   <Swiper
//     //     slidesPerView={2}
//     //     spaceBetween={0}
//     //     slidesPerGroup={2}
//     //     loop={true}
//     //     loopFillGroupWithBlank={true}
//     //     pagination={{
//     //       clickable: true,
//     //     }}
//     //     navigation={true}
//     //     modules={[Pagination, Navigation]}
//     //     className='mySwiper'
//     //   >
//     //     {/* MAP du tableau des prochains jours */}
//     //     {    <div
//     //         style={{ paddingBottom: '30px', borderRadius: '0px 0px 10px 10px' }}
//     //       >
//     //         <Swiper
//     //           slidesPerView={2}
//     //           spaceBetween={0}
//     //           slidesPerGroup={2}
//     //           loop={true}
//     //           loopFillGroupWithBlank={true}
//     //           pagination={{
//     //             clickable: true,
//     //           }}
//     //           navigation={true}
//     //           modules={[Pagination, Navigation]}
//     //           className='mySwiper'
//     //         >
//     //           {/* MAP du tableau des prochains jours */}
//     //           {oneKarateka.map((x, i) => (
//     //             <SwiperSlide key={x.id}>
//     //               <div className='card text-center'>
//     //                 <div className='card-header'>
//     //                   Cours de {x.type} | Sensei : {x.sensei}
//     //                 </div>
//     //                 <div className='card-body'>
//     //                   {/* <p className='card-text'>{x.note}</p> */}
//     //                   <NavLink to={x.id}>
//     //                     <button
//     //                       className='btn btn-primary btnDirection btn-sm'
//     //                       value={x.id}
//     //                     >
//     //                       S'inscrire
//     //                     </button>
//     //                   </NavLink>
//     //                 </div>
//     //                 <div
//     //                   className='card-footer'
//     //                   style={{
//     //                     fontSize: '0.9rem',
//     //                     fontWeight: 'bolder',
//     //                     color: 'black',
//     //                   }}
//     //                 >
//     //                   {new Date(x.heureDebut).getHours()}h
//     //                   {new Date(x.heureDebut).getMinutes()} /{' '}
//     //                   {new Date(x.heureFin).getHours()}h
//     //                   {new Date(x.heureFin).getMinutes()} le{' '}
//     //                   {new Date(x.date).toLocaleDateString('fr')}
//     //                 </div>
//     //               </div>
//     //             </SwiperSlide>
//     //           ))}{' '}
//     //         </Swiper>
//     //       </div>?.map((x, i) => (
//     //       <SwiperSlide key={x.id}>
//     //         <div className='card text-center'>
//     //           <div className='card-header'>
//     //             Cours de {x.type} | Sensei : {x.sensei}
//     //           </div>
//     //           <div className='card-body'>
//     //             {/* <p className='card-text'>{x.note}</p> */}
//     //             <NavLink to={x.id}>
//     //               <button
//     //                 className='btn btn-primary btnDirection btn-sm'
//     //                 value={x.id}
//     //               >
//     //                 S'inscrire
//     //               </button>
//     //             </NavLink>
//     //           </div>
//     //           <div
//     //             className='card-footer'
//     //             style={{
//     //               fontSize: '0.9rem',
//     //               fontWeight: 'bolder',
//     //               color: 'black',
//     //             }}
//     //           >
//     //             {new Date(x.heureDebut).getHours()}h
//     //             {new Date(x.heureDebut).getMinutes()} /{' '}
//     //             {new Date(x.heureFin).getHours()}h
//     //             {new Date(x.heureFin).getMinutes()} le{' '}
//     //             {new Date(x.date).toLocaleDateString('fr')}
//     //           </div>
//     //         </div>
//     //       </SwiperSlide>
//     //     ))}{' '}
//     //   </Swiper>
//     // </div>
//     <div>coucou</div>
//   );
// };

// export default CoursByKarateka;
import React from 'react';

const CoursByKarateka = () => {
  return <div>ATTENTE</div>;
};

export default CoursByKarateka;
