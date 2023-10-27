import React, { useState, useEffect } from 'react';
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
import { PrivateRoute } from './contexts/AuthContext.jsx';

import NotFoundPage from './pages/NotFoundPage.jsx';

const App = () => (
    <div className="d-flex flex-column h-100">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    <ToastContainer />
     </div>
);

export default App;
