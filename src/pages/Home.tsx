import logo from '../images/logo.jpg';
import logoMick from '../images/logoMick.png';
import planning from '../images/p2.png';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const Home = () => {
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
                Adresse : 25 square du Roussillon 95470 FOSSES
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
          <button className='btn btn-primary btnDirection'>
            Nous rejoindre
          </button>
        </NavLink>
        {/* <button className='btn btn-primary btnPerso'>En savoir plus</button> */}
      </div>
      {/* calendrier fix + info */}
      {/* ordi */}
      {isBigScreen && (
        <div className='d-flex justify-content-center m-3 mt-5'>
          <img
            src={planning}
            alt='planning club karaté'
            style={{ width: '49%' }}
          />

          <div className='bg-success' style={{ width: '49%' }}>
            INFOS
          </div>
        </div>
      )}

      {isTabletOrMobile && (
        <div>
          <div className='d-flex justify-content-center m-3 mt-5'>
            <img
              src={planning}
              alt='planning club karaté'
              style={{ width: '80%' }}
            />
          </div>
          <div className='d-flex justify-content-center m-3'>
            <div className='bg-success' style={{ width: '80%' }}>
              INFOS
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
