/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  selectUser, selectIsAuthenticated, setToken, getToken, setUser, setAuthorization,
} from '../slices/authSlice';
import routes from '../routes/routes';
import hexletImageRegistration from '../images/registration.PNG';
import {
  setShowSignUpPage,
} from '../slices/signUp';

const SignUp = () => {
  const { t } = useTranslation();
  const [userNameError, setUserNameError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (userName, password) => {
    console.log(userName, password);
    try {
      const response = await axios.post('/api/v1/signup', { username: userName, password });
      console.log('response signUp', response);

      if (response.data) {
        const { token } = response.data;
        dispatch(setUser(userName));
        if (localStorage.getItem('token')) {
          localStorage.removeItem('token');
        }
        localStorage.setItem('token', token);
        dispatch(setToken(token));
        dispatch(setAuthorization());
        setUserNameError(false);
        const getTokenInLocalStorage = localStorage.getItem('token'); // Перемещение сюда
        if (getTokenInLocalStorage && getTokenInLocalStorage.length > 0) {
          console.log('Есть токен!');
          navigate('/');
        } else {
          console.log('НЕТ токен!');
        }
      }
    } catch (e) {
      if (e.response.status === 409) {
        setUserNameError(true);
      }
      console.log(e);
    }
  };

  const ValidationSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('validation.min'))
      .min(3, t('validation.min'))
      .max(20, t('validation.max')),
    password: Yup.string()
      .required(t('validation.reqiured'))
      .min(6, t('validation.minPassword')),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], t('validation.passwordSame'))
      .required(t('validation.reqiured')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      console.log(values.username, values.password, values.passwordConfirmation);
      handleSubmit(values.username, values.password);
    },

  });
  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/login">{t('chat.header')}</a>
        </div>
      </nav>

      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-6">
            {' '}
            {/* Изменено на col-md-6 */}
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src={hexletImageRegistration} className="rounded-circle" alt="Регистрация" />
                </div>
                <div className="col-12 col-md-6">
                  {' '}
                  {/* Добавлен div для формы */}
                  <Form onSubmit={formik.handleSubmit}>
                    <h1 className="text-center mb-4">{t('interfaces.registration')}</h1>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder={t('info.username')}
                        autoComplete="username"
                        id="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        isInvalid={formik.touched.username
                           && (!!formik.errors.username || userNameError)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        type="password"
                        placeholder={t('info.password2')}
                        name="password"
                        id="password"
                        autoComplete="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        isInvalid={formik.touched.password
                          && (!!formik.errors.password || userNameError)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        type="password"
                        name="passwordConfirmation"
                        placeholder={t('info.passwordConfirmation')}
                        id="passwordConfirmation"
                        autoComplete="new-password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.passwordConfirmation}
                        isInvalid={formik.touched.passwordConfirmation
                          && (!!formik.errors.passwordConfirmation || userNameError)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.passwordConfirmation}

                      </Form.Control.Feedback>
                    </Form.Group>

                    {userNameError && (
                      <div className="mb-3" style={{ color: 'red' }}>
                        {t('warnings.sameUser')}
                      </div>
                    )}

                    <Button type="submit">
                      {t('interfaces.signup')}
                    </Button>
                  </Form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
