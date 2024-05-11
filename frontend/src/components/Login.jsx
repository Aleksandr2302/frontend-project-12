import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import hexletImage from '../images/hexlet-image.jpg';

const ValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Обязательное поле'),
  password: Yup.string()
    .required('Обязательное поле'),
});

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema:ValidationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
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
                  <Form onSubmit={formik.handleSubmit} >
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
