import logo from '../images/favicon.png';
import logooffi from '../images/logo.jpg';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='navbar sticky-top navbar-expand-lg navbar-dark bg-dark shadow opacity-75'>
      <div className='container-fluid'>
        <div className='navbar-brand'>
          <NavLink to='/' className='nav-link'>
            <img src={logo} width={32} alt='logo de karate'></img> | Karaté Club
            Fosses
          </NavLink>
        </div>
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
                <div className='nav-link'>Acceuil</div>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='calendrier' className='nav-link'>
                <div className='nav-link'>Calendrier</div>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='connect' className='nav-link'>
                <div className='nav-link'>Se connecter</div>
              </NavLink>
            </li>
            {/* mettre affichage conditionnel pour admin */}
            <li className='nav-item'>
              <NavLink to='admin' className='nav-link'>
                <div className='nav-link'>Administrateur</div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
