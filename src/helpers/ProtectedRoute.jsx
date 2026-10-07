/**
 * Guarda de sesión: solo deja pasar a usuarios autenticados.
 * Sin sesión redirige a /login recordando la ruta pedida para volver tras el login
 * (salvo tras un cierre de sesión voluntario).
 */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { LoadingScreen } from "../componentes/ui/StatusScreen";

function ProtectedRoute() {
  const { loading, isAuthenticated, signedOut } = useAuth();
  const location = useLocation();

  // Mientras se consulta la sesión inicial no se decide nada (evita parpadeos y falsos redirects).
  if (loading) return <LoadingScreen text="Verificando sesión…" />;

  if (!isAuthenticated) {
    // Tras un cierre de sesión voluntario no se recuerda la página (la siguiente persona puede ser otro usuario).
    return <Navigate to="/login" replace state={signedOut ? undefined : { from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
