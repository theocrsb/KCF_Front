import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const footer = () => {
  const handleClickInsta = () => {
    window.open(
      'https://www.instagram.com/karate.club.fosses/?hl=fr',
      '_blank'
    );
  };

  const handleClickFacebook = () => {
    window.open('https://www.facebook.com/kcf.shotokan', '_blank');
  };
  return (
    <div>
      <div style={{ padding: '10px', opacity: '95%' }} className='bg-dark'>
        <ul className='p-0'>
          {/* <li className='list-group-item p-2'>
            <NavLink to='/contact' end className='nav-link'>
              <div
                style={{ color: 'white' }}
                className='nav-link text-center pt-3'
              >
                Nous contacter
              </div>
            </NavLink>
          </li> */}
          <li>
            <a
              style={{ color: 'white' }}
              className='nav-link text-center p-2'
              onClick={handleClickInsta}
              href={'/'}
            >
              <InstagramOutlined /> Instagram
            </a>
          </li>
          <li>
            <a
              style={{ color: 'white' }}
              className='nav-link text-center p-2'
              onClick={handleClickFacebook}
              href={'/'}
            >
              <FacebookOutlined /> Facebook
            </a>
          </li>
          <li>
            <p
              style={{ color: 'white', margin: '0' }}
              className='nav-link text-center pt-3'
            >
              Adresse : Avenue de la Haute Grève 95470 FOSSES
            </p>
          </li>
          {/* <li>
                <p
                  style={{ color: 'white', margin: '0' }}
                  className='nav-link text-center pt-3'
                >
                  Email : karateclubfosses.contact@gmail.com
                </p>
              </li> */}
        </ul>
      </div>
    </div>
  );
};

export default footer;
