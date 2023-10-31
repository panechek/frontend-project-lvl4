import React from 'react';
import { Button, Form } from 'react-bootstrap';

import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext.jsx';
import routes from '../routes.js';
import avatarImg from '../assets/avatar_signup.jpg';

const SignupPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFAiled] = React.useState(false);
  const inputRef = React.useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string()
        .min(3, t('forms.newLogin'))
        .max(20, t('forms.newLogin'))
        .required(t('forms.require')),
      password: yup.string()
        .min(6, t('forms.min6'))
        .required(t('forms.require')),
      confirmPassword: yup.string()
        .required(t('forms.require'))
        .oneOf([yup.ref('password'), null], t('forms.matchPassword')),
    }),
    onSubmit: async (values) => {
      setAuthFAiled(false);
      try {
        const res = await axios.post(routes.signupPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (err) {
        if (err.response.status === 409) {
          console.log('ok');
          setAuthFAiled(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });
  const { errors, touched } = formik;
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={avatarImg} className="rounded-circle" alt="Регистрация" />
              </div>
              <Form
                onSubmit={formik.handleSubmit}
                className="w-50"
              >
                <h1 className="text-center mb-4">{t('forms.signup')}</h1>
                <Form.Floating className="mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder="От 3 до 20 символов"
                    autoComplete="username"
                    name="username"
                    id="username"
                    isInvalid={(errors.username && touched.username)
                      || authFailed}
                    required
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">{t('forms.username')}</Form.Label>
                  {(errors.username && touched.username) || authFailed
                    ? (
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.username || t('forms.loginHasBeen')}
                      </Form.Control.Feedback>
                    )
                    : null}
                </Form.Floating>
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder={t('forms.min6')}
                    aria-describedby="passwordHelpBlock"
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    isInvalid={errors.password && touched.password}
                    required
                  />
                  <Form.Label htmlFor="password">{t('forms.password')}</Form.Label>
                  {errors.password && touched.password && (
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.password}
                    </Form.Control.Feedback>
                  )}
                </Form.Floating>
                <Form.Floating className="mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    placeholder={t('forms.matchPassword')}
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="new-password"
                    isInvalid={
                      errors.confirmPassword
                      && touched.confirmPassword
                    }
                    required
                  />
                  <Form.Label htmlFor="confirmPassword">{t('forms.toMatchPassword')}</Form.Label>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  )}
                </Form.Floating>
                <Button
                  type="submit"
                  className="w-100"
                  variant="outline-primary"
                >
                  {t('forms.toSignUp')}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
