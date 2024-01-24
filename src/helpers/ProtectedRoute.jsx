// ProtectedRoute.jsx

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    // Muestra el mensaje de carga mientras la autenticación se está verificando
    return <div className="loading"><h1>Loading...</h1></div>;
  }

  // Si no está cargando y el usuario no está autenticado, redirige a la página de inicio de sesión
  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si no está cargando y el usuario está autenticado, renderiza el contenido protegido
  return <Outlet />;
}

export default ProtectedRoute;
