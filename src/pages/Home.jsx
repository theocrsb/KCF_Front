import logo from '../images/logo.jpg';
import './Home.css';

const Home = () => {
  return (
    <div className='bg-grey d-flex justify-content-center'>
      {/* Card Acceuil */}
      <div
        className='card mt-5 w-25 shadow p-3 mb-5 bg-white rounded'
        style={{ width: '18rem' }}
      >
        <img className='card-img-top p-3' src={logo} alt='Card cap' />
        <div className='card-body'>
          {/* <h5 className='card-title'>Card title</h5> */}
          <p className='card-text'>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>Cras justo odio</li>
          <li className='list-group-item'>Dapibus ac facilisis in</li>
          <li className='list-group-item'>Vestibulum at eros</li>
        </ul>
        <div className='card-body d-flex justify-content-around'>
          <button type='button' class='btn btn-secondary button'>
            Se connecter
          </button>
          <button type='button' class='btn btn-secondary button'>
            S'inscrire
          </button>
        </div>
      </div>
      {/* Card Acceuil */}
    </div>
  );
};

export default Home;
