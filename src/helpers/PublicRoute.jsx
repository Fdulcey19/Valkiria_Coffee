/**
 * Guarda inversa: páginas solo para visitantes (login).
 * Si ya hay sesión, redirige al panel o a la ruta que se había pedido antes del login.
 */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import SessionCheck from "./SessionCheck";
import { safeReturnPath } from "./returnPath";

function PublicRoute() {
  const { loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) return <SessionCheck />;

  if (isAuthenticated) {
    return <Navigate to={safeReturnPath(location.state?.from)} replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
