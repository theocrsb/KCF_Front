import logo from '../images/favicon.png';
import logooffi from '../images/logo.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContext } from '../context/toast-context';
import { useContext, useEffect, useState } from 'react';
import { instanceAxios } from '../axios/instance-axios';
import { Role } from '../pages/Calendrier';
import axios from 'axios';
import { AuthContext } from '../context/Auth-context';

const NavBar = () => {
  // lien authcontext
  const navigate = useNavigate();
  const [tokenRole, setTokenRole] = useState<string>();
  const { savedToken, UpdateToken, TokenExpirationFunction, tokenExpired } =
    useContext(AuthContext);
  //
  // Lien avec le toast context
  const { onToastChange } = useContext(ToastContext);
  const { messageToast } = useContext(ToastContext);
  const { colorToast } = useContext(ToastContext);
  //
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };
  const [label, setLabel] = useState<string>('');
  const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // mettre affichage conditionnel pour les roles.

  const handleDeco = () => {
    localStorage.removeItem('accessToken');
    onToastChange(true);
    messageToast('Vous êtes déconnecté');
    colorToast('danger');
    //
    setIsLoggedIn(false);
    setCount(count + 1);
  };
  // faire remonter props en fonction de si le user est co
  useEffect(() => {
    setCount(count + 1);

    axios
      .get('http://localhost:8080/api/roles/my/role', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        // console.log(response.data.label, 'dans le useEffect');
        setLabel(response.data.label);
        setIsLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        setIsLoading(false);
      });
  }, []);

  // return (
  return isLoading ? (
    <div>Chargement...</div>
  ) : (
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
            {/* --------------------------- debut LI --------------------------- */}
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
            {(label === 'admin' || label === 'superadmin') && (
              <li className='nav-item'>
                <NavLink to='admin' className='nav-link'>
                  <div className='nav-link'>Professeur</div>
                </NavLink>
              </li>
            )}
            {/* superadmin */}
            {(label === 'admin' || label === 'superadmin') && (
              <li className='nav-item'>
                <NavLink to='superadmin' className='nav-link'>
                  <div className='nav-link'>Administrateur</div>
                </NavLink>
              </li>
            )}
            {/* <li className='nav-item'>
              <NavLink to='connect' className='nav-link'>
                <div className='nav-link'>Connexion</div>
              </NavLink>
            </li> */}
            {/* deconnexion */}
            {!isLoggedIn === true ? (
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
            ) : (
              <li className='nav-item'>
                <NavLink to='connect' className='nav-link'>
                  <div className='nav-link'>Connexion</div>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
