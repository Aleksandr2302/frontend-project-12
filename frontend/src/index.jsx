import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, ErrorBoundary } from '@rollbar/react';
import './index.css';
import App from './App';
import rollbarConfig from './rollbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
);
