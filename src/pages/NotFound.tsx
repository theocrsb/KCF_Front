import React from 'react';
import { useMediaQuery } from 'react-responsive';

const NotFound = () => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 700.1px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 700px)' });
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        flexDirection: 'column',
      }}
    >
      <p
        style={{ fontSize: '1.5rem' }}
        className='font-weight-bold text-uppercase'
      >
        erreur 404 : Page introuvable ...
      </p>
      {isBigScreen && (
        <img
          src={process.env.PUBLIC_URL + '/assets/karatekaDraw.svg'}
          alt='karateka'
          width={150}
          className='text-center'
        />
      )}
      {isTabletOrMobile && (
        <img
          src={process.env.PUBLIC_URL + '/assets/karatekaDraw.svg'}
          alt='karateka'
          width={100}
          className='text-center'
          style={{ marginBottom: '50%' }}
        />
      )}
    </div>
  );
};

export default NotFound;
