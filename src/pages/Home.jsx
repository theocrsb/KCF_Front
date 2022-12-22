import logo from '../images/logo.jpg';
import logoMick from '../images/logoMick.png';
import planning from '../images/planning.png';
import './home.css';

const Home = () => {
  return (
    <div>
      <div className='d-flex justify-content-center mt-3'>
        <img className='img-responsive' src={logo} style={{ width: '35%' }} />
      </div>
    </div>
  );
};

export default Home;
