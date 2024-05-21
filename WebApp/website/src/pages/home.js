import logo from '../logo.png';
import './styles/home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="Home">
      <div className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
      </div>
    </div>
  );
}

export default Home;