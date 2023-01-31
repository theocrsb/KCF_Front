import React, { useEffect } from 'react';
import { instanceAxios } from '../axios/instance-axios';
import { User } from './Calendrier';

const SuperAdmin = () => {
  // test requete uniquement superadmin
  useEffect(() => {
    instanceAxios
      .get<User>('/roles/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ minHeight: '100vh' }}>
      <p>superadmin</p>
    </div>
  );
};

export default SuperAdmin;
