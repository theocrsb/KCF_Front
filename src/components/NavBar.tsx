import logo from '../images/favicon.png';
import '../index.css';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className='navbar sticky-top navbar-expand-lg navbar-dark bg-dark shadow opacity-75'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          <NavLink to='/' className='nav-link'>
            <img src={logo} width={32} alt='logo de karate'></img> | Karaté Club
            Fosses
          </NavLink>
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <NavLink to='/' end className='nav-link'>
                Acceuil
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='calendrier' className='nav-link'>
                Calendrier
              </NavLink>
            </li>
          </ul>
          {/* btn droite */}

          <button className='btn btn-outline-success button' type='submit'>
            Se connecter
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
