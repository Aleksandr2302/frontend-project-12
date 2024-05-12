import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import hexletImage from '../images/hexlet-image.jpg';
import axios from 'axios';
import routes from '../routes/routes.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { selectUser, selectIsAuthenticated } from '../slices/authSlice.js';


const ValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Обязательное поле'),
  password: Yup.string()
    .required('Обязательное поле'),
});
console.log('localStorage',localStorage)
const handleSubmit = async (values, setShowError, navigate) => {
  console.log('send request')
  try {
    // Отправка данных формы на сервер
    const response = await axios.post(routes.loginPath(), {
      username: values.username,
      password: values.password
    });
    // Получение токена из ответа сервера
    const { token } = response.data;
    console.log('token', token)
    // Сохранение токена в локальном хранилище
    localStorage.setItem('token', token);
    console.log('localStorage',localStorage)
    console.log('token',token)
    const getTokenInLocalStorage = localStorage.getItem('token');
    // Перенаправление на другую страницу
    if (!getTokenInLocalStorage) {
      navigate('/login');
    }
  } catch {
    setShowError(true);
  }
};


const LoginPage = () => {
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema:ValidationSchema,
    onSubmit: (values) => handleSubmit(values, setShowError, navigate),
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
          <div className="col-12 col-md-6"> {/* Изменено на col-md-6 */}
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src= {hexletImage} className="rounded-circle" alt="Войти"></img>
                </div>
                <div className="col-12 col-md-6"> {/* Добавлен div для формы */}
                <Form onSubmit={() => handleSubmit(formik.values, setShowError, navigate)}>
                    <h1 className="text-center mb-4">Войти</h1>
                    <Form.Group className="mb-3">
                    <Form.Label>Ваш Ник</Form.Label>
                      <Form.Control type="text"
                        placeholder="Ваш ник"
                        id="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username} />
                    </Form.Group>
  
                    <Form.Group className="mb-3" >
                      <Form.Label>Пароль</Form.Label>
                      <Form.Control type="password" /* Изменено на password */
                        placeholder='Пароль'
                        id="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password} />
                        {showError && (
                      <div className="invalid-feedback" style={{ display: 'block', color: 'red' }}>The username or password is incorrect</div>
                      )}
                    </Form.Group>
  
                    <Button type="submit">
                      Войти
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
