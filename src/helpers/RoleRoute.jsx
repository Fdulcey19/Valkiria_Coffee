/**
 * Guarda de rol: dentro de una ruta ya autenticada, solo deja pasar a los roles indicados.
 * Uso: <Route element={<RoleRoute roles={[ROLES.ADMIN]} />}> …rutas… </Route>
 * Si el rol no corresponde muestra la página 404 (como si la ruta no existiera) sin cambiar la URL.
 */
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import NotFound from "../pages/NotFound";

function RoleRoute({ roles }) {
  const { user } = useAuth();
  return user && roles.includes(user.role) ? <Outlet /> : <NotFound />;
}

RoleRoute.propTypes = { roles: PropTypes.arrayOf(PropTypes.string).isRequired };

export default RoleRoute;
