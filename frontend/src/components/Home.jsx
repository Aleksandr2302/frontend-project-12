import { useLocation, useNavigate } from 'react-router-dom';


  
const HomePage = () => {
  const navigate = useNavigate();

  // if (!localStorage.token) {
  //   navigate('/login');
  //   return null; // Предотвращает рендеринг компонента в случае перенаправления
  // }

  return (
    <div className="Form">
      <p>HomePage</p>
    </div>
  );
};
export default HomePage;