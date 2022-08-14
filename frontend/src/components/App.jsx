// import logo from './logo.svg';
import React, { useState } from 'react';
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
import Home from './Home.jsx';
import Navbar from './Navbar.jsx';
import AuthContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
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

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : <Button as={Link} to="/login" state={{ from: location }}>Log in</Button>
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
  </AuthProvider>
);

export default App;
