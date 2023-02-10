import logo from '../images/logo.jpg';
import logoMick from '../images/logoMick.png';
import planning from '../images/p2.png';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useContext, useEffect } from 'react';
import { ToastContext } from '../context/toast-context';
import { AuthContext } from '../context/Auth-context';
import { PayloadToken } from '../App';
import jwt_decode from 'jwt-decode';

const Home = () => {
  const {
    savedToken,
    UpdateToken,
    tokenExpirationFunction,
    tokenExpired,
    role,
    setRole,
  } = useContext(AuthContext);

  useEffect(() => {
    UpdateToken(savedToken);
    tokenExpirationFunction(savedToken);
    console.log('voici le resultat pour savedToken', savedToken);
    if (savedToken) {
      const decoded: PayloadToken = jwt_decode(savedToken);
      console.log('le payload', decoded.role.label);
      // setTokenRole(decoded.role.label);
      console.log("etat d'expiration token dans la navbar", tokenExpired);
    }
    if (tokenExpired === 'token expiré') {
      //  navigate('/connect');
      setRole('');
      UpdateToken('');
    }
  }, []);
  const isBigScreen = useMediaQuery({ query: '(min-width: 700.1px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 700px)' });

  return (
    <div style={{ minHeight: '100vh' }}>
      <div className='d-flex flex-wrap justify-content-around m-3 border border-light rounded shadow-lg p-3 mb-5 bgCard'>
        <div className='m-3'>
          <img
            className='img-responsive'
            src={logo}
            style={{ width: '15rem' }}
            alt={'logo du club de karaté club de Fosses'}
          />
        </div>
        <div className='align-self-center m-3'>
          <div className='card ' style={{ width: '15rem' }}>
            <div
              className='card-header text-center -3'
              style={{ fontWeight: 'bold' }}
            >
              Information
            </div>
            <ul className='list-group list-group-flush text-center'>
              <li className='list-group-item'>Responsable : M. Niazul MIAH</li>
              <li className='list-group-item'>
                Adresse : Avenue de la Haute Grève 95470 FOSSES
              </li>
              <li className='list-group-item'>
                Kata | Kumite | Baby Karaté | Cardio Training 100% Girls
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Fin partie logo + info principal */}
      <div className='d-flex flex-wrap justify-content-center m-3'>
        <NavLink to='connect' className='nav-link'>
          <button className='btn btn-primary btnDirection mt-1'>
            Nous rejoindre
          </button>
        </NavLink>
        <NavLink to='contact' className='nav-link'>
          <button className='btn btn-primary btnPerso mt-1'>
            Nous contacter
          </button>
        </NavLink>
      </div>
      {/* calendrier fix + info */}
      {/* ordi */}
      {isBigScreen && (
        <div>
          <div className='d-flex justify-content-center m-3 mt-5'>
            <img
              src={planning}
              alt='planning club karaté'
              style={{ width: '672px' }}
            />
          </div>
          <div className='d-flex justify-content-center m-3'>
            {/* <p>info</p> */}
          </div>
        </div>
      )}

      {isTabletOrMobile && (
        <div>
          <div className='d-flex justify-content-center m-3 mt-5'>
            <img
              src={planning}
              alt='planning club karaté'
              style={{ width: '90%' }}
            />
          </div>
          <div className='d-flex justify-content-center m-3'>
            {/* <p>info</p> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
