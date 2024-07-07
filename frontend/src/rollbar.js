import Rollbar from 'rollbar';

const rollbarConfig = {
  accessToken: '56698cfeaf964f739721fc35aaa2475f', // Убедитесь, что используете правильный токен
  environment: 'development',
};

const rollbar = new Rollbar(rollbarConfig);

export default rollbar;
