import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Redireciona para a página de login se não houver token
    return <Navigate to="/" />;
  }

  // Renderiza o conteúdo protegido se o token estiver presente
  return <Outlet />;
};

export default ProtectedRoute;
