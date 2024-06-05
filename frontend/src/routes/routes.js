const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  getChannels: () => [apiPath, 'channels'].join('/'),
};
