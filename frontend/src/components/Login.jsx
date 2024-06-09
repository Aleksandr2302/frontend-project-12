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
import {
  selectUser, selectIsAuthenticated, setToken, getToken, setUser,
} from '../slices/authSlice';
import routes from '../routes/routes';
import hexletImage from '../images/hexlet-image.jpg';

const ValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Обязательное поле'),
  password: Yup.string()
    .required('Обязательное поле'),
});
// console.log('localStorage',localStorage);

const handleSubmit = async (values, setShowError, navigate, dispatch) => {
  console.log('send request');
  try {
    // Отправка данных формы на сервер
    const response = await axios.post(routes.loginPath(), {
      username: values.username,
      password: values.password,
    });
    // Получение токена из ответа сервера
    const { token } = response.data;
    dispatch(setToken(token));
    // dispatch(setUser(username.value));
    dispatch(setUser(values.username));
    console.log('token', token);
    // Сохранение токена в локальном хранилище
    localStorage.setItem('token', token);
    console.log('localStorage', localStorage);
    console.log('token', token);
    // const getTokenInLocalStorage = localStorage.getItem('token');
    // Перенаправление на другую страницу
    const getTokenInLocalStorage = localStorage.getItem('token'); // Перемещение сюда
    if (getTokenInLocalStorage && getTokenInLocalStorage.length > 0) {
      console.log('Есть токен!');
      setShowError(false);
      navigate('/');
    } else {
      console.log('НЕТ токен!');
      setShowError(true);
      navigate('/login');
    }
  } catch (e) { // Добавление catch с обработкой ошибки
    console.log(e); // Вывод ошибки в консоль
    setShowError(true); // Показ ошибки
  }
};

const LoginPage = () => {
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector(getToken);
  console.log('tokenRedux', token);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => handleSubmit(values, setShowError, navigate, dispatch),
  });
  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">Hexlet Chat</a>
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
                  <img src={hexletImage} className="rounded-circle" alt="Войти" />
                </div>
                <div className="col-12 col-md-6">
                  {' '}
                  {/* Добавлен div для формы */}
                  <Form onSubmit={formik.handleSubmit}>
                    <h1 className="text-center mb-4">Войти</h1>
                    <Form.Group className="mb-3">
                      <Form.Label>Ваш Ник</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ваш ник"
                        autoComplete="username"
                        id="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Пароль</Form.Label>
                      <Form.Control
                        type="password" /* Изменено на password */
                        placeholder="Пароль"
                        id="password"
                        autoComplete="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      {showError && (
                      <div className="invalid-feedback" style={{ display: 'block', color: 'red' }}>Неверные имя пользователя или пароль</div>
                      )}
                    </Form.Group>

                    <Button type="submit">
                      Войти
                    </Button>

                    <br />
                    <br />
                    <br />
                    <Button type="submit" onClick={() => localStorage.clear()}>
                      clean Storage
                    </Button>

                  </Form>
                </div>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>Нет аккаунта? </span>
                  <a href="/signup">Регистрация</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
