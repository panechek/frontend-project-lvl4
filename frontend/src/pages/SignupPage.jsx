import React from 'react';

const SignupPage = () => {
  console.log('ok');
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
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            Неверное имя пользователя или пароль
                                            </Form.Control.Feedback>
                                            </FloatingLabel>
                                    </Form.Group>
                                    <Button type="submit" className='w-100 mb-3 btn btn-outline-primary' variant="outline-primary">Войти</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
      </div>
  );
};

export default SignupPage;
