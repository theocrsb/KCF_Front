import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContext } from '../context/toast-context';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/Auth-context';

import jwt_decode from 'jwt-decode';
import { PayloadToken } from '../interface/payloadToken.interface';

const NavBar = () => {
  // Lien avec le toast context
  const { onToastChange } = useContext(ToastContext);
  const { messageToast } = useContext(ToastContext);
  const { colorToast } = useContext(ToastContext);
  //
  const navigate = useNavigate();
  // const [tokenRole, setTokenRole] = useState<string>();
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
      navigate('/connect');
    }
  }, []);

  const handleDeco = () => {
    localStorage.removeItem('accessToken');
    onToastChange(true);
    messageToast('Vous êtes déconnecté');
    colorToast('success');
    //
    UpdateToken('');
    setRole('');
  };

  return (
    <nav
      className='navbar sticky-top navbar-expand-lg navbar-dark bg-dark shadow'
      style={{ opacity: '95%' }}
    >
      <div className='container-fluid'>
        <div className='navbar-brand'>
          <NavLink to='/' className='nav-link'>
            <img
              src={process.env.PUBLIC_URL + '/assets/kimono.svg'}
              width={32}
              alt='logo de karate'
            />{' '}
            | Karaté Club Fosses
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
                <div
                  className='nav-link'
                  data-bs-toggle='collapse'
                  data-bs-target='#navbarSupportedContent'
                  style={{ color: 'white' }}
                >
                  Accueil
                </div>
              </NavLink>
            </li>

            {/* --------------------------- user ou admin ou superadmin connecté --------------------------- */}
            {(role === 'admin' || role === 'superadmin' || role === 'user') && (
              <li className='nav-item'>
                <NavLink to='calendrier' className='nav-link'>
                  <div
                    className='nav-link'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarSupportedContent'
                    style={{ color: 'white' }}
                  >
                    Planning
                  </div>
                </NavLink>
              </li>
            )}
            {/* --------------------------- user ou admin ou superadmin connecté --------------------------- */}
            {(role === 'admin' || role === 'superadmin' || role === 'user') && (
              <li className='nav-item'>
                <NavLink to='profil/update' className='nav-link'>
                  <div
                    className='nav-link'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarSupportedContent'
                    style={{ color: 'white' }}
                  >
                    Profil
                  </div>
                </NavLink>
              </li>
            )}
            {/* --------------------------- admin ou superadmin connecté --------------------------- */}
            {(role === 'admin' || role === 'superadmin') && (
              <li className='nav-item'>
                <NavLink to='admin/cours' className='nav-link'>
                  <div
                    className='nav-link'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarSupportedContent'
                    style={{ color: 'white' }}
                  >
                    Professeur
                  </div>
                </NavLink>
              </li>
            )}
            {/* --------------------------- superadmin connecté --------------------------- */}
            {role === 'superadmin' && (
              <li className='nav-item'>
                <NavLink to='superadmin' className='nav-link'>
                  <div
                    className='nav-link'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarSupportedContent'
                    style={{ color: 'white' }}
                  >
                    Administrateur
                  </div>
                </NavLink>
              </li>
            )}
            {/* --------------------------- setSavedToken mis à jour dans le connect --------------------------- */}
            {savedToken ? (
              <li className='nav-item'>
                <NavLink to='connect' className='nav-link'>
                  <button
                    className='btn btn-primary btnPerso'
                    style={{ margin: '0', color: 'white' }}
                    onClick={handleDeco}
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarSupportedContent'
                  >
                    Déconnexion
                  </button>
                </NavLink>
              </li>
            ) : (
              <li className='nav-item'>
                <NavLink to='connect' className='nav-link'>
                  <div
                    className='nav-link'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarSupportedContent'
                    style={{ color: 'white' }}
                  >
                    Connexion
                  </div>
                </NavLink>
              </li>
            )}
            {/* --------------------------- setSavedToken mis à jour dans le handleDeco --------------------------- */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
