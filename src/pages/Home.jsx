import logo from '../images/logo.jpg';
import logoMick from '../images/logoMick.png';
import planning from '../images/planning.png';

const Home = () => {
  return (
    <div>
      <div className='d-flex flex-wrap justify-content-around m-3  border border-light rounded shadow-lg p-3 mb-5 bgCard'>
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
      <div className='d-flex flex-wrap justify-content-around m-3'>
        <button className='btn btn-primary btnPerso'>Nous rejoindre</button>
        <button className='btn btn-primary btnPerso'>En savoir plus</button>
      </div>
    </div>
  );
};

export default Home;
