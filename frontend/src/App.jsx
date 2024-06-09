/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import HomePage from './components/Home';
import LoginPage from './components/Login';
import NotFoundPage from './components/NotFound';
import store from './slices/configureStore';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <div className="App">
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Provider>
  </div>
);

export default App;
