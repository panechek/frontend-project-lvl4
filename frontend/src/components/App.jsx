// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import LoginPage from './LoginPage.jsx';
import Home from './HomePage.jsx';
import Navbar from './Navbar.jsx';
import AuthContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(true);
  const logIn = () => {
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  useEffect(() => {
    const takeAuth = () => {
      const userId = JSON.parse(localStorage.getItem('userId'));
      if (userId && userId.token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      console.log(loggedIn);
    };
    return () => takeAuth();
  }, []);
  return (
    <AuthContext.Provider value={{
      loggedIn,
      logIn,
      logOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const NoMatch = () => {
  const location = useLocation();
  return (
    <div>
      <h3>
      No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
};

const App = () => (
    <AuthProvider>
      <div className='d-flex flex-column h-100'>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={(
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          )}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
      </div>
      <div className='Toastify'></div>
    </AuthProvider>
);

export default App;
