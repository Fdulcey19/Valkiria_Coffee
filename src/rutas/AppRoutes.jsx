import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/LoginRegister";
import Sidebar from "../componentes/Sidebar";
import Home from "../pages/Home";
import NuevoFuturo from "../pages/NuevoFuturo";
import ValkiriaShare from "../pages/ValkiriaShare";
import NuevoFuturoShare from "../pages/NuevoFuturoShare";
import UsersPage from "../pages/UsersPage";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import LegalPage from "../pages/LegalPage";
import { termsDocument } from "../content/terms";
import { privacyDocument } from "../content/privacy";
import PublicRoute from "../helpers/PublicRoute";
import RoleRoute from "../helpers/RoleRoute";
import { ROLES } from "../config/roles";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "../helpers/ProtectedRoute";
import NotFound from "../pages/NotFound";
import NavConfiguracion from "../componentes/NavConfiguracion";
function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Documentos legales: públicos (se leen con o sin sesión) */}
          <Route path="/terminos" element={<LegalPage build={termsDocument} />} />
          <Route path="/privacidad" element={<LegalPage build={privacyDocument} />} />
          {/* Enlace del correo de recuperación: abre con o sin sesión (el token es de un solo uso) */}
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* Solo visitantes: con sesión activa redirige al panel */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Requiere sesión */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dash" element={<Sidebar />}>
              <Route index element={<Home />} />
              <Route path="nuevo" element={<NuevoFuturo />} />
              <Route path="share" element={<ValkiriaShare />} />
              <Route path="nuevoshare" element={<NuevoFuturoShare />} />
              {/* Solo administradores */}
              <Route element={<RoleRoute roles={[ROLES.ADMIN]} />}>
                <Route path="usuarios" element={<UsersPage />} />
              </Route>
              {/* Configuración: una sola ruta; la pestaña va en ?tab= (ver NavConfiguracion) */}
              <Route path="configuracion" element={<NavConfiguracion />} />
              {/* Direcciones antiguas: se conservan como redirecciones para no romper enlaces guardados */}
              <Route path="configuracion/valkiria" element={<Navigate to="/dash/configuracion" replace />} />
              <Route path="configuracion/nuevo" element={<Navigate to="/dash/configuracion?tab=nuevo" replace />} />
              <Route path="configuracion/nuevofuturo" element={<Navigate to="/dash/configuracion?tab=nuevo" replace />} />
              <Route path="valkiriau" element={<Navigate to="/dash/configuracion" replace />} />
              <Route path="nuevou" element={<Navigate to="/dash/configuracion?tab=nuevo" replace />} />
            </Route>
          </Route>

          {/* Ruta para manejar 404 Not Found fuera de las rutas protegidas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
