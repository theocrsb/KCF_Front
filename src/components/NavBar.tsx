import logo from '../images/favicon.png';
import logooffi from '../images/logo.jpg';
import { NavLink } from 'react-router-dom';
import { ToastContext } from '../context/toast-context';
import { useContext } from 'react';

const NavBar = () => {
  // Lien avec le toast context
  const { onToastChange } = useContext(ToastContext);
  const { messageToast } = useContext(ToastContext);
  const { colorToast } = useContext(ToastContext);
  //

  // mettre affichage conditionnel pour les roles.

  const handleDeco = () => {
    localStorage.removeItem('accessToken');
    onToastChange(true);
    messageToast('Vous êtes déconnecté');
    colorToast('danger');
  };
  return (
    <nav
      className='navbar sticky-top navbar-expand-lg navbar-dark bg-dark shadow'
      style={{ opacity: '90%' }}
    >
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
                <div className='nav-link'>Planning</div>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='profil/all/karateka' className='nav-link'>
                <div className='nav-link'>Profil</div>
              </NavLink>
            </li>
            {/* mettre affichage conditionnel pour admin et superadmin */}
            {/* admin */}
            <li className='nav-item'>
              <NavLink to='admin' className='nav-link'>
                <div className='nav-link'>Professeur</div>
              </NavLink>
            </li>
            {/* superadmin */}
            <li className='nav-item'>
              <NavLink to='superadmin' className='nav-link'>
                <div className='nav-link'>Administrateur</div>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='connect' className='nav-link'>
                <div className='nav-link'>Connexion</div>
              </NavLink>
            </li>
            {/* deconnexion */}
            <li className='nav-item'>
              <NavLink to='connect' className='nav-link'>
                {/* <div className='nav-link'> */}
                <button
                  className='btn btn-primary btnPerso'
                  style={{ margin: '0' }}
                  onClick={handleDeco}
                >
                  Déconnexion
                </button>
                {/* </div> */}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
