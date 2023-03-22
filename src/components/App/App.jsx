import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { ChakraProvider } from '@chakra-ui/react';

import { useLocalStorageState } from '../../utils/useLocalStorageState';
import Weather from '../Weather/Weather';
import Header from '../Header/Header';
import './App.css';

function App() {
  const [user, setUser] = useState({});
  const [token, setToken] = useLocalStorageState('token');

  useEffect(() => {
    if (token && token !== '') {
      setUser(jwt_decode(token));
    } else {
      setUser({});
    }
  }, [token, setUser]);

  const isLoggedIn = (user && user.email_verified) || false;
  return (
    <ChakraProvider>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}>
        <div className='App'>
          <Header setToken={setToken} />
          {isLoggedIn && <Weather />}
          {!isLoggedIn && (
            <div className='please-login'>
              <h2>Please login to access weather data</h2>
            </div>
          )}
        </div>
      </GoogleOAuthProvider>
    </ChakraProvider>
  );
}

export default App;
