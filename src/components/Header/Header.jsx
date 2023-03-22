import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ setToken }) => {
  const onLogout = () => {
    console.info('Logging out, clearing token...');
    googleLogout();
    setToken(null);
  };

  return (
    <header className='navbar'>
      <a href='/' className='logo'>
        Weather App
      </a>
      <div className='nav-links'>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            setToken(credentialResponse.credential);
          }}
          onError={() => {
            console.error('Login Failed');
          }}
          useOneTap
        />
        <Button colorScheme='blue' variant='outline' onClick={onLogout}>
          Sign Out
        </Button>
      </div>
    </header>
  );
};

Header.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Header;
