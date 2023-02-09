// import { EyeOutlined, UserOutlined } from '@ant-design/icons';
// import { Avatar, Card, Col, Row } from 'antd';
// import React, { useContext, useEffect, useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { instanceAxios } from '../axios/instance-axios';
// import { ToastContext } from '../context/toast-context';
// import { Karateka } from './Calendrier';

// const AllKarateka = () => {
//   const { Meta } = Card;
//   const navigate = useNavigate();
//   // Lien avec le toast context
//   const { onToastChange } = useContext(ToastContext);
//   const { messageToast } = useContext(ToastContext);
//   const { colorToast } = useContext(ToastContext);
//   //
//   const [allKarateka, SetAllKarateka] = useState<Karateka[]>();

//   useEffect(() => {
//     instanceAxios
//       .get<Karateka[]>(`/karatekas`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//         },
//       })
//       .then((response) => {
//         //console.log(response, 'response');
//         SetAllKarateka(response.data);
//       })
//       .catch((error) => {
//         //console.log('error', error);
//       });
//   }, []);

//   //console.log(allKarateka, 'karatekassss');
//   return (
//     <div style={{ minHeight: '100vh' }}>
//       <div
//         style={{
//           backgroundColor: 'grey',
//           padding: '10px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           flexDirection: 'row',
//           flexWrap: 'wrap',
//         }}
//       >
//         {/* debut card */}
//         {allKarateka?.map((x) => (
//           <div key={x.id}>
//             <NavLink to={x.id} style={{ }}>
//               <Card
//                 hoverable
//                 style={{
//                   width: 240,
//                   margin: '10px',
//                   height: '200px',
//                   maxWidth: '300px',
//                   minWidth: '300px',
//                 }}
//               >
//                 <div
//                   style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <Avatar
//                     shape='square'
//                     size={64}
//                     icon={<UserOutlined />}
//                     style={{ paddingBottom: '10px' }}
//                   />
//                 </div>
//                 <Meta
//                   style={{ textAlign: 'center', paddingTop: '10px' }}
//                   title={`${x.prenom} ${x.nom}`}
//                   description={`cliquez ici pour accéder aux cours de ${x.prenom}`}
//                 />
//               </Card>
//             </NavLink>
//           </div>
//         ))}
//         {/* fin card */}
//       </div>
//     </div>
//   );
// };

// export default AllKarateka;
import React from 'react';

const AllKarateka = () => {
  return <div>ATTENTE</div>;
};

export default AllKarateka;
