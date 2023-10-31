import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import './scss/app.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import Home from './pages/HomePage.jsx';
import Navbar from './components/Navbar.jsx';
import { useAuth } from './contexts/AuthContext.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  console.log(auth.loggedIn);
  return auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />;
};

const App = () => (
  <Router>
    <div className="d-flex flex-column h-100">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          )}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      <ToastContainer />
    </div>
  </Router>
);

export default App;
