/* eslint-disable react/react-in-jsx-scope */
import { useTranslation } from 'react-i18next';
import notFound from '../images/404.PNG';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">
            {t('chat.header')}
          </a>
        </div>
      </nav>
      <div className="text-center">
        <img alt="Страница не найдена" className="img-fluid w-25" src={notFound} />
        <h1 className="h4 text-muted">{t('info.pageNotFound')}</h1>
        <p className="text-muted">
          {t('info.butYouCan')}
          <a href="/">
            {' '}
            {t('info.toMainPage')}
            {' '}
          </a>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
