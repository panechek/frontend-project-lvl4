import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import showToastify from '../utils/showToastify.js';

import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';
import avatarImg from '../assets/avatar.jpg';

const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFAiled] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().required(t('forms.require')),
      password: yup.string().required(t('forms.require')),
    }),
    onSubmit: async (values) => {
      setAuthFAiled(false);
      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
        // connectSocket();
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) {
          setAuthFAiled(true);
          inputRef.current.select();
          return;
        }
        inputRef.current.select();
        showToastify(t('errorLoading'), false);
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className='row justify-content-center align-content-center h-100'>
        <div className='col-12 col-md-8 col-xxl-6'>
          <div className='card shadow-sm'>
            <div className='card-body row p-5'>
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={avatarImg} className='rounded-circle' alt="Войти" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className='test-center mb-4'>{t('forms.login')}</h1>
                  <Form.Group>
                    <FloatingLabel
                      htmlFor="username" label="Ваш ник">
                                    <Form.Control
                                    className='mb-3'
                                        onChange={formik.handleChange}
                                        value={formik.values.username}
                                        placeholder="Ваш ник"
                                        name="username"
                                        id="username"
                                        isInvalid={authFailed}
                                        required
                                        ref={inputRef}
                                    />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group>
                                <FloatingLabel
                                    htmlFor="password"
                                    label="Пароль"
                                    >
                                    <Form.Control
                                      className='mb-4'
                                      type="password"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        placeholder="Пароль"
                                        name="password"
                                        id="password"
                                        autoComplete="current-password"
                                        isInvalid={authFailed}
                                        required
                                    />
                                <Form.Control.Feedback type="invalid" tooltip>
                                  {t('forms.wrongData')}
                                    </Form.Control.Feedback>
                                    </FloatingLabel>
                            </Form.Group>
                            <Button type="submit" className='w-100 mb-3 btn btn-outline-primary' variant="outline-primary">{t('forms.login')}</Button>
                        </Form>
                    </div>
                    <div className='card-footer p-4'>
                        <div className="text-center">
                            <span>
                            {t('forms.noLogin')} <a href="/signup">{t('forms.signup')}</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
  );
};

export default LoginPage;
