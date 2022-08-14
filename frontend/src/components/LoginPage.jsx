import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFAiled] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().required('Заполните это поле'),
      password: yup.string().required('Заполните это поле'),
    }),
    onSubmit: async (values) => {
      setAuthFAiled(false);
      console.log(values);
      try {
        const res = await axios.post(routes.loginPath(), values);
        console.log('ok');
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFAiled(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className='row justify-content-center align-content-center h-100'>
        <div className='col-12 col-md-8 col-xxl-6'>
          <div className='card-body row p-5'>
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src="../assets/avatar.jpg" className='rounded-circle' alt="Войти" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className='test-center mb-4'>Войти</h1>
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
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">
                                    Неверное имя пользователя или пароль
                                    </Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit" className='w-100 mb-3 btn btn-outline-primary' variant="outline-primary">Войти</Button>
                        </Form>
                    </div>
                    <div className='card-footer p-4'>
                        <div className="text-center">
                            <span>
                                Нет аккаунта?
                            </span>
                            <a href="/signup">Регистрация</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default LoginPage;
