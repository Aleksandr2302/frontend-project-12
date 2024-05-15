import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const a = 1;
const b = 2;
const sum = (a,b)=>{
  return a + b
}

console.log(sum);
const HomePage = () => {

  
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем наличие токена в localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // Если токен отсутствует, перенаправляем на страницу входа
      navigate('/login');
    }
  }, []); // Пустой массив зависимостей гарантирует, что эффект будет выполнен только при монтировании компонента

  return (
    <div className="Form">
      <p>HomePage</p>
    </div>
  );
};

export default HomePage;