import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/Home.jsx';
import LoginPage from './components/Login.jsx';
import NotFoundPage from './components/NotFound.jsx';
import { Provider } from 'react-redux';
import store from '../src/slices/configureStore.js'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
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
}

export default App;
