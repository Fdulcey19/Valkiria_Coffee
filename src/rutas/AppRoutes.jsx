import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/LoginRegister";
import Sidebar from "../componentes/Sidebar";
import Home from "../pages/Home";
import NuevoFuturo from "../pages/NuevoFuturo";
import ValkiriaShare from "../pages/ValkiriaShare";
import NuevoFuturoShare from "../pages/NuevoFuturoShare";
import Configuracion from "../pages/Configuracion";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "../helpers/ProtectedRoute";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          </Route>

            <Route path="/dash" element={<Sidebar />}>
              <Route index element={<Home />} />
              <Route path="nuevo" element={<NuevoFuturo />} />
              <Route path="share" element={<ValkiriaShare />} />
              <Route path="nuevo/share" element={<NuevoFuturoShare />} />
              <Route path="Configuracion" element={<Configuracion />} />
            </Route>
          {/* Ruta para manejar 404 Not Found */}
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
