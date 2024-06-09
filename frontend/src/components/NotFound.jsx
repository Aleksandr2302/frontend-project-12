/* eslint-disable react/react-in-jsx-scope */
import notFound from '../images/404.PNG';

const NotFoundPage = () => (
  <div className="d-flex flex-column h-100">
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
      </div>
    </nav>
    <div className="text-center">
      <img alt="Страница не найдена" className="img-fluid w-25" src={notFound} />
      <h1 className="h4 text-muted">Страница не найдена</h1>
      <p className="text-muted">
        Но вы можете перейти
        <a href="/">на главную страницу</a>
      </p>
    </div>
  </div>
);

export default NotFoundPage;
