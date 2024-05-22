import logo from '../logo.png';
import './styles/welcome.css';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="Welcome">
      <div className="Welcome-header">
        <img src={logo} className="Welcome-logo" alt="logo" />
        <div className="Welcome-title">
          <h2 className='header'>
            Welcome Researchers!
          </h2>
          <p className='text'>
            Please Login to Continue.
          </p>
        </div>
        <div className="Welcome-button">
          <Link to="/login">
            <button type="button" className='Welcomes-button'>
              <p className='button-text'>
                Login
              </p>
            </button>
          </Link>
          <div className='sign-up-text'>
            <p>
              Don't have an account?
            </p>
            <Link to="/register" className='register'>
              <p>
                Register
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;